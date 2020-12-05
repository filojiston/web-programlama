const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().integer().required(),
  consumerPrice: Joi.number().integer().required(),
  rawMaterials: Joi.array().required(),
});

module.exports = schema;