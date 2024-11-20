const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');
const { authenticate } = require('../middleware/auth');

// Rutas para clientes
router.get('/', authenticate, clientsController.getAllClients);
router.post('/', authenticate, clientsController.createClient);
router.post('/associate', authenticate, clientsController.associateWithProperty);
router.delete('/:id', authenticate, clientsController.deleteClient);

module.exports = router;
