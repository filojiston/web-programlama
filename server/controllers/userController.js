const db = require('../db/connection');
const schema = require('../models/userModel');

const users = db.get('users');

function getAll() {
  return users.find();
}

// TODO remove this method
function drop() {
  return users.drop();
}

module.exports = {
  getAll,
  drop
}