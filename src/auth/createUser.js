const bcrypt = require('bcryptjs');
const { UserInputError } = require('apollo-server');

const User = require('../models/User');
const { validateInput } = require('../utils/validate');
const generateToken = require('../utils/jwt');

const createUser = async (username, password) => {
  const { valid, errors } = validateInput(username, password);

  if (!valid) {
    throw new UserInputError('Errors', { errors });
  }

  const user = await User.findOne({ username });
  if (user) {
    throw new UserInputError('Username is taken', {
      errors: {
        username: 'This username already exists',
      },
    });
  }

  password = await bcrypt.hash(password, 12);

  const newUser = new User({
    username,
    password,
  });

  const res = await newUser.save();

  const token = generateToken(res);

  return {
    ...res.doc,
    id: res._id,
    username: res.username,
    token,
  };
};

module.exports = createUser;
