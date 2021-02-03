const db = require('../db/connection');
const schema = require('../models/liftModel');

const lifts = db.get('lifts');
const soldLifts = db.get('soldLifts');

function getLifts() {
  return lifts.find();
}

async function addLift(lift) {
  const validationResult = schema.validate(lift);
  if (validationResult.error == null) {
    const isNameUnique = await lifts.findOne({name: lift.name}) === null;
    if (isNameUnique) {
      lift.price = +lift.price;
      lift.consumerPrice = +lift.consumerPrice;
      lift.maintenanceDate = +lift.maintenanceDate;
      lift.maintenancePrice = +lift.maintenancePrice;
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
      return lifts.update({name: lift.name}, { $set: {price: +lift.price, consumerPrice: +lift.consumerPrice, rawMaterials: lift.rawMaterials, maintenanceDate: +lift.maintenanceDate, maintenancePrice: +lift.maintenancePrice}});
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

function sellLift(lifts) {
  return soldLifts.insert(lifts);
}

function getSoldLifts() {
  return soldLifts.find();
}

function deleteSoldLifts() {
  return soldLifts.drop();
}

module.exports = {
  getLifts,
  addLift,
  updateLift,
  deleteLift,
  sellLift,
  getSoldLifts,
  deleteSoldLifts,
};