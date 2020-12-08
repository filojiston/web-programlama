const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', (req, res) => {
  userController.getAll().then(users => {
    res.json(users);
  });
});

// TODO remove this method
router.delete('/', (req, res) => {
  userController.drop().then(message => {
    res.json(message);
  }).catch(error => {
    res.status(500);
    res.json(error);
  });
});

module.exports = router;