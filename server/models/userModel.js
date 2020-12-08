const Joi = require('joi');

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(40).required(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(8).max(16).required(),
  boughtLifts: Joi.array(),
});

module.exports = schema;