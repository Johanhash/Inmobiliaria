const express = require('express');
const router = express.Router();
const documentsController = require('../controllers/documentsController');
const upload = require('../middleware/upload');
const { authenticate } = require('../middleware/auth');

// Rutas de documentos
router.get('/', authenticate, documentsController.getAllDocuments);
router.post('/', authenticate, upload.single('document'), documentsController.uploadDocument);
router.delete('/:id', authenticate, documentsController.deleteDocument);

module.exports = router;
