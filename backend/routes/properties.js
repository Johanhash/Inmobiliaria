const express = require('express');
const router = express.Router();
const propertiesController = require('../controllers/propertiesController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

// Rutas para propiedades
router.get('/', authenticate, propertiesController.getAllProperties); // Acceso general
router.post('/', authenticate, authorize(['Admin']), propertiesController.createProperty); // Solo administradores
router.put('/:id', authenticate, authorize(['Admin']), propertiesController.updateProperty); // Solo administradores
router.delete('/:id', authenticate, authorize(['Admin']), propertiesController.deleteProperty); // Solo administradores

module.exports = router;

