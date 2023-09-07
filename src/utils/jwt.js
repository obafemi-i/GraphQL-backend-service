const jwt = require('jsonwebtoken');

const config = require('../config/config');

const secret_key = config.secretKey;

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    secret_key,
    { expiresIn: '1h' },
  );
};

module.exports = generateToken;
