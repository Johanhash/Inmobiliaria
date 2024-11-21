const express = require('express');
const router = express.Router();
const propertiesController = require('../controllers/propertiesController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

// Rutas para propiedades
router.get('/', propertiesController.getAllProperties); // Ruta pública para obtener todas las propiedades
router.post('/filter', propertiesController.getFilteredProperties); // Ruta para buscar propiedades con filtros
router.post('/', authenticate, authorize(['Admin']), propertiesController.createProperty); // Solo para administradores
router.put('/:id', authenticate, authorize(['Admin']), propertiesController.updateProperty); // Solo para administradores
router.delete('/:id', authenticate, authorize(['Admin']), propertiesController.deleteProperty); // Solo para administradores

module.exports = router;


