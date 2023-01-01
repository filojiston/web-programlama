const monk = require('monk');
const connectionString = 'localhost/web-programlama-lab';
const db = monk(connectionString);

module.exports = db;