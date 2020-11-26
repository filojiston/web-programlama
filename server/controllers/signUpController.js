const db = require('../db/connection');
const schema = require('../models/userModel');

const users = db.get('users');

async function createUser(user) {
  const validationResult = schema.validate(user);
  if (validationResult.error == null) {
    const isUsernameUnique = await users.findOne({username: user.username}) === null;
    const isEmailUnique = await users.findOne({email: user.email}) === null;
    if (isUsernameUnique && isEmailUnique) {
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

function getAll() {
  return users.find();
}

// TODO remove this method
function drop() {
  return users.drop();
}

module.exports = {
  createUser,
  getAll,
  drop
}