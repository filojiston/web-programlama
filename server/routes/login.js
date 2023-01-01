const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');

router.get('/', (req, res) => {
  res.send('Login page');
});

router.post('/', (req, res) => {
  loginController.login(req.body).then(message => {
    res.json(message);
  }).catch(error => {
    res.status(error.statusCode),
    res.json(error);
  });
});

module.exports = router;