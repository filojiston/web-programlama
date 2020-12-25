const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.number().integer().required(),
  leadTime: Joi.string().required(),
  criticalQuantity: Joi.number().integer().required(),
});

module.exports = schema;