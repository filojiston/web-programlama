const db = require('../db/connection');
const schema = require('../models/userModel');

const users = db.get('users');

async function login(user) {
  const searchUser = await users.findOne({username: user.username});
  if (!searchUser) {
    return Promise.reject({
      message: "username or password incorrect.",
      statusCode: 401
    });
  } else {
    const isPasswordCorrect = searchUser.password === user.password;
    if (!isPasswordCorrect) {
      return Promise.reject({
        message: "username or password incorrect.",
        statusCode: 401
      });
    }
  }

  return Promise.resolve({
    message: 'you successfully logged in!',
    statusCode: 200
  });
}

module.exports = {
  login
}