const db = require('../db/connection');
const schema = require('../models/userModel');

const users = db.get('users');

async function createUser(user) {
  const validationResult = schema.validate(user);
  if (validationResult.error == null) {
    const isUsernameUnique = await users.findOne({username: user.username}) === null;
    const isEmailUnique = await users.findOne({email: user.email}) === null;
    if (isUsernameUnique && isEmailUnique) {
      user.boughtLifts = [];
      return users.insert(user);
    } else {
      return Promise.reject({
        message: 'same username or email already registered.',
        statusCode: 409
      });
    }
  } else {
    return Promise.reject({
      message: validationResult.error.message,
      statusCode: 401
    });
  }
}

module.exports = {
  createUser,
}