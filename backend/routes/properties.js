const express = require('express');
const router = express.Router();
const propertiesController = require('../controllers/propertiesController');

// Rutas
router.get('/', propertiesController.getAllProperties);
router.post('/', propertiesController.createProperty);

module.exports = router;
