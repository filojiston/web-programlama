const db = require('../db/connection');
const schema = require('../models/userModel');

const users = db.get('users');

function getAll() {
  return users.find();
}

async function getOne(user) {
  const ourUser = await users.findOne({username: user.username});
  if (ourUser !== null) {
    return ourUser;
  } else {
    return Promise.reject({
      message: 'the user was not found.',
      statusCode: 404
    });
  }
}

async function updateUser(user) {
  const validationResult = schema.validate(user);
  if (validationResult.error == null) {
    const hasUser = await users.findOne({username: user.username}) !== null;
    if (hasUser) {
      // const ourUser = await users.findOne({username: user.username});
      return users.update({username: user.username}, { $set: {boughtLifts: user.boughtLifts}});
    } else {
      return Promise.reject({
        message: 'the user was not found.',
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

function drop() {
  return users.drop();
}

module.exports = {
  getAll,
  updateUser,
  getOne,
  drop,
}