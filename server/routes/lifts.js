const express = require('express');
const router = express.Router();

const liftController = require('../controllers/liftController');

router.get('/', (req, res) => {
  liftController.getLifts().then(lifts => {
    res.json(lifts);
  });
});

router.post('/', (req, res) => {
  liftController.addLift(req.body).then(message => {
    res.json(message);
  }).catch(error => {
    res.status(error.statusCode);
    res.json(error);
  });
});

router.put('/', (req, res) => {
  liftController.updateLift(req.body).then(message => {
    res.json(message);
  }).catch(error => {
    res.status(error.statusCode);
    res.json(error);
  });
});

router.delete('/', (req, res) => {
  liftController.deleteLift(req.body).then(message => {
    res.json(message);
  }).catch(error => {
    res.status(error.statusCode);
    res.json(error);
  });
});

module.exports = router;