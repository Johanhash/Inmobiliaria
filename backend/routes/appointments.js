const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointmentsController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

// Rutas para citas
router.get('/', authenticate, authorize(['Admin', 'Agent']), appointmentsController.getAllAppointments); // Admin y agentes
router.post('/', authenticate, authorize(['Admin', 'Agent']), appointmentsController.createAppointment); // Admin y agentes
router.put('/:id', authenticate, authorize(['Admin', 'Agent']), appointmentsController.updateAppointmentStatus); // Admin y agentes
router.delete('/:id', authenticate, authorize(['Admin']), appointmentsController.deleteAppointment); // Solo administradores

module.exports = router;

