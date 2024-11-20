const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');
const { authenticate } = require('../middleware/auth');

router.get('/sales/pdf', authenticate, reportsController.generateSalesPDF);
router.get('/sales/excel', authenticate, reportsController.generateSalesExcel);

module.exports = router;
