const express = require('express');
const router = express.Router();

const signUpController = require('../controllers/signUpController');

router.get('/', (req, res) => {
  signUpController.getAll().then(users => {
    res.json(users);
  });
});

router.post('/', (req, res) => {
  signUpController.createUser(req.body).then(user => {
    res.json(user);
  }).catch(error => {
    res.status(error.statusCode);
    res.json(error);
  });
});

// TODO remove this method
router.delete('/', (req, res) => {
  signUpController.drop().then(message => {
    res.json(message);
  }).catch(error => {
    res.status(500);
    res.json(error);
  });
})

module.exports = router;