const Documents = require('../models/documentsModel');
const fs = require('fs');
const path = require('path');

exports.getAllDocuments = (req, res) => {
    Documents.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.uploadDocument = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se subió ningún archivo.' });
    }

    const data = {
        name: req.file.originalname,
        type: req.file.mimetype,
        path: req.file.path,
        associated_id: req.body.associated_id,
    };

    Documents.create(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Documento subido con éxito.', documentId: result.insertId });
    });
};

exports.deleteDocument = (req, res) => {
    const { id } = req.params;

    Documents.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        // Eliminar archivo del sistema de archivos
        fs.unlink(path.join(__dirname, '../uploads', req.body.filePath), err => {
            if (err) return res.status(500).json({ error: 'Error al eliminar el archivo físico.' });
            res.json({ message: 'Documento eliminado con éxito.' });
        });
    });
};
