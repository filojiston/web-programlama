const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().integer().required(),
  consumerPrice: Joi.number().integer().required(),
  rawMaterials: Joi.object().required(),
  soldDate: Joi.string(),
  soldPrice: Joi.number().integer(),
  maintenanceDate: Joi.string(),
});

module.exports = schema;