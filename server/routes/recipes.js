const express = require('express');
const router = express.Router();

const rawMaterialController = require('../controllers/rawMaterialController');
const mailController = require('../controllers/mailController');

router.get('/', (req, res) => {
  rawMaterialController.getMaterials().then(materials => {
    res.json(materials);
  });
});

router.post('/', (req, res) => {
  rawMaterialController.addMaterial(req.body).then(message => {
    res.json(message);
  }).catch(error => {
    res.status(error.statusCode);
    res.json(error);
  });
});

router.put('/', (req, res) => {
  rawMaterialController.updateMaterial(req.body).then(message => {
    res.json(message);
  }).catch(error => {
    res.status(error.statusCode);
    res.json(error);
  });
});

router.put('/:name', (req, res) => {
  mailController.sendEmailForMaterial(req.params).then(message => {
    res.json(message);
  }).catch(error => {
    res.json(error);
  });
});

router.delete('/', (req, res) => {
  rawMaterialController.deleteMaterial(req.body).then(message => {
    res.json(message);
  }).catch(error => {
    res.status(error.statusCode);
    res.json(error);
  });
});

module.exports = router;