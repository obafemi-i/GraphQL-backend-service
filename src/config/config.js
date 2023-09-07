const Joi = require('joi');
require('dotenv/config');

const envVarsSchema = Joi.object()
  .keys({
    SECRET_KEY: Joi.string().required(),
    MONGODB: Joi.string().required(),
    PORT: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  secretKey: envVars.SECRET_KEY,
  mongodb: envVars.MONGODB,
  port: envVars.PORT,
};

module.exports = config;
