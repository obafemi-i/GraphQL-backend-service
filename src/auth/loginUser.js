const { UserInputError } = require('apollo-server');
const bcrypt = require('bcryptjs');

const { validateInput } = require('../utils/validate');
const User = require('../models/User');
const generateToken = require('../utils/jwt');

const loginUser = async (username, password) => {
  const { valid, errors } = validateInput(username, password);

  if (!valid) {
    throw new UserInputError('Errors', { errors });
  }

  const user = await User.findOne({ username });
  if (!user) {
    errors.general = 'User not found';
    throw new UserInputError('User not found', { errors });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    errors.general = 'Wrong credentials';
    throw new UserInputError('Wrong credentials', { errors });
  }

  const token = generateToken(user);

  return {
    ...user.doc,
    id: user._id,
    username: user.username,
    token,
  };
};

module.exports = loginUser;
