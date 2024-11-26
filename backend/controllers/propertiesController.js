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

exports.getPropertyById = (req, res) => {
    const { id } = req.params;

    Properties.getById(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Propiedad no encontrada.' });
        res.json(result[0]);
    });
};


exports.getAllProperties = (req, res) => {
    Properties.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'No hay propiedades disponibles.' });

        // Convertir `image_paths` de JSON string a array
        const updatedResults = results.map(property => ({
            ...property,
            image_paths: property.image_paths ? JSON.parse(property.image_paths) : [], // Convertir JSON a array
        }));

        res.json(updatedResults);
    });
};



exports.getFilteredProperties = (req, res) => {
    const filters = req.body;
    Properties.getFiltered(filters, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener propiedades filtradas.' });
        }
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

exports.updateProperty = [
    upload.array('images'), // Middleware para manejar múltiples imágenes
    (req, res) => {
        const { id } = req.params;
        const {
            address, price, type, description, bedrooms, bathrooms, parking_spaces, size, features, status
        } = req.body;

        const image_paths = req.files ? req.files.map(file => `/uploads/${file.filename}`) : null;

        if (!address || !price || !type || !bedrooms || !bathrooms || !parking_spaces || !size || !status) {
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
            status,
            image_paths,
        };

        Properties.update(id, data, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Propiedad no encontrada.' });
            }

            res.json({ message: 'Propiedad actualizada con éxito.' });
        });
    },
];


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
