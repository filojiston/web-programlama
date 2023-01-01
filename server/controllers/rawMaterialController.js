const db = require('../db/connection');
const schema = require('../models/rawMaterialModel');

const materials = db.get('materials');

function getMaterials() {
  return materials.find();
}

async function addMaterial(material) {
  const validationResult = schema.validate(material);
  if (validationResult.error == null) {
    const isNameUnique = await materials.findOne({name: material.name}) === null;
    if (isNameUnique) {
      return materials.insert(material);
    } else {
      return Promise.reject({
        message: 'this material is already in our database.',
        statusCode: 409
      });
    }
  } else {
    return Promise.reject({
      message: "Invalid input.",
      statusCode: 401,
    });
  }
}

async function updateMaterial(material) {
  const validationResult = schema.validate(material);
  if (validationResult.error == null) {
    const hasMaterial = await materials.findOne({name: material.name}) !== null;
    if (hasMaterial) {
      const ourMaterial = await materials.findOne({name: material.name});
      return materials.update({name: material.name}, { $set: {quantity: +ourMaterial.quantity + +material.quantity, leadTime: material.leadTime, criticalQuantity: +material.criticalQuantity}});
    } else {
      return Promise.reject({
        message: 'the material was not found.',
        statusCode: 404
      });
    }
  } else {
    return Promise.reject({
      message: "Invalid input.",
      statusCode: 401,
    });
  }
}

async function deleteMaterial(material) {
  const hasMaterial = await materials.findOne({name: material.name}) !== null;
  if (hasMaterial) {
    return materials.remove({name: material.name});
  } else {
    return Promise.reject({
      message: 'the material was not found.',
      statusCode: 404
    });
  }
}

module.exports = {
  getMaterials,
  addMaterial,
  updateMaterial,
  deleteMaterial,
};