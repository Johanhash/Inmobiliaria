const express = require('express');
const router = express.Router();
const propertiesController = require('../controllers/propertiesController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

// Rutas para propiedades
router.get('/', propertiesController.getAllProperties);
router.post('/', authenticate, authorize(['Admin']), propertiesController.createProperty);
router.post('/filter', propertiesController.getFilteredProperties); // Filtrar propiedades
router.get('/:id', propertiesController.getPropertyById); // Obtener propiedad por ID
router.put('/:id', authenticate, authorize(['Admin']), propertiesController.updateProperty); // Actualizar propiedad (solo para administradores)
router.delete('/:id', authenticate, authorize(['Admin']), propertiesController.deleteProperty); // Eliminar propiedad (solo para administradores)

module.exports = router;
