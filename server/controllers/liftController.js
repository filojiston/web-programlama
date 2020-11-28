const db = require('../db/connection');
const schema = require('../models/liftModel');

const lifts = db.get('lifts');

function getLifts() {
  return lifts.find();
}

async function addLift(lift) {
  const validationResult = schema.validate(lift);
  if (validationResult.error == null) {
    const isNameUnique = await lifts.findOne({name: lift.name}) === null;
    if (isNameUnique) {
      return lifts.insert(lift);
    } else {
      return Promise.reject({
        message: 'this lift is already in our database.',
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

async function updateLift(lift) {
  const validationResult = schema.validate(lift);
  if (validationResult.error == null) {
    const hasLift = await lifts.findOne({name: lift.name}) !== null;
    if (hasLift) {
      return lifts.update({name: lift.name}, { $set: {price: lift.price, rawMaterials: lift.rawMaterials}});
    } else {
      return Promise.reject({
        message: 'the lift was not found.',
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

async function deleteLift(lift) {
  const hasLift = await lifts.findOne({name: lift.name}) !== null;
  if (hasLift) {
    return lifts.remove({name: lift.name});
  } else {
    return Promise.reject({
      message: 'the lift was not found.',
      statusCode: 404
    });
  }
}

module.exports = {
  getLifts,
  addLift,
  updateLift,
  deleteLift,
};