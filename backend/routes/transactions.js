const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');
const { authenticate } = require('../middleware/auth');

// Rutas de transacciones
router.get('/', authenticate, transactionsController.getAllTransactions);
router.get('/:id/contract', authenticate, transactionsController.generateContract);
router.post('/', authenticate, transactionsController.createTransaction);

module.exports = router;

