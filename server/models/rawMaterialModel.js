const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.number().integer().required(),
  leadTime: Joi.string().required()
});

module.exports = schema;