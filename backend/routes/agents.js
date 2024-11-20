const express = require('express');
const router = express.Router();
const agentsController = require('../controllers/agentsController');
const { authenticate } = require('../middleware/auth');

// Rutas para agentes
router.get('/', authenticate, agentsController.getAllAgents);
router.post('/', authenticate, agentsController.createAgent);
router.put('/:id', authenticate, agentsController.updateAgent);
router.delete('/:id', authenticate, agentsController.deleteAgent);

module.exports = router;
