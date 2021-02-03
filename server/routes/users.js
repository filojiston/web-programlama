const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', (req, res) => {
  userController.getAll().then(users => {
    res.json(users);
  });
});

router.delete('/', (req, res) => {
  userController.drop().then(message => {
    res.json(message);
  }).catch(error => {
    res.status(500);
    res.json(error);
  });
});

router.put('/', (req, res) => {
  userController.updateUser(req.body).then(user => {
    res.json(user);
  }).catch(error => {
    res.status(error.statusCode);
    res.json(error);
  });
});

router.get('/:username', (req, res) => {
  userController.getOne(req.params).then(user => {
    res.json(user);
  }).catch(error => {
    res.status(error.statusCode);
    res.json(error);
  });
});

module.exports = router;