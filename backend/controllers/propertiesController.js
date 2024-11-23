const Properties = require('../models/propertiesModel');
const Logs = require('../models/logsModel');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

exports.getAllProperties = (req, res) => {
    Properties.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'No hay propiedades disponibles.' });
        res.json(results);
    });
};

exports.getFilteredProperties = (req, res) => {
    const filters = {
        location: req.body.location || null,
        priceMin: req.body.priceMin || null,
        priceMax: req.body.priceMax || null,
        type: req.body.type || null,
    };

    Properties.getFiltered(filters, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.createProperty = [
    upload.array('images'), // Middleware para subir múltiples imágenes
    (req, res) => {
        const { address, price, type, description, bedrooms, bathrooms, parking_spaces, size, features } = req.body;
        const image_paths = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

        if (!address || !price || !type || !bedrooms || !bathrooms || !parking_spaces || !size) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        const data = {
            address,
            price,
            type,
            description,
            bedrooms,
            bathrooms,
            parking_spaces,
            size,
            features,
            image_paths,
        };

        Properties.create(data, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            res.status(201).json({ message: 'Propiedad registrada con éxito.' });
        });
    },
];

exports.updateProperty = (req, res) => {
    const { id } = req.params;
    const { address, price, type, description, status, bedrooms, bathrooms, parking_spaces, size, features } = req.body;

    if (!id || !address || !price || !type || !status) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const data = {
        address,
        price,
        type,
        description: description || '',
        status,
        bedrooms,
        bathrooms,
        parking_spaces,
        size,
        features,
    };

    Properties.update(id, data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        Logs.create(req.user.id, `Actualizó la propiedad con ID: ${id}`, (err) => {
            if (err) console.error('Error al registrar actividad:', err);
        });

        res.json({ message: 'Propiedad actualizada con éxito.', affectedRows: result.affectedRows });
    });
};

exports.deleteProperty = (req, res) => {
    const { id } = req.params;

    Properties.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Propiedad no encontrada.' });
        }

        Logs.create(req.user.id, `Eliminó la propiedad con ID: ${id}`, (err) => {
            if (err) console.error('Error al registrar actividad:', err);
        });

        res.json({ message: 'Propiedad eliminada con éxito.' });
    });
};
