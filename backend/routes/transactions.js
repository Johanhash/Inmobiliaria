const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');

// Rutas
router.get('/', transactionsController.getAllTransactions);
router.post('/', transactionsController.createTransaction);

module.exports = router;
