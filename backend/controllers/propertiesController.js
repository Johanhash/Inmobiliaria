const Properties = require('../models/propertiesModel');
const Logs = require('../models/logsModel');

exports.getAllProperties = (req, res) => {
    Properties.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.createProperty = (req, res) => {
    const { address, price, type, description } = req.body;

    if (!address || !price || !type) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const data = { address, price, type, description };

    Properties.create(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({ message: 'Propiedad registrada con éxito.' });
    });
};



exports.updateProperty = (req, res) => {
    const { id } = req.params;
    const { address, price, type, description, status } = req.body;

    if (!id || !address || !price || !type || !status) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const data = { address, price, type, description, status };

    Properties.update(id, data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        // Registrar actividad
        Logs.create(req.user.id, `Actualizó la propiedad: ${id}`, (err) => {
            if (err) console.error('Error al registrar actividad:', err);
        });

        res.json({ message: 'Propiedad actualizada con éxito.' });
    });
};


exports.deleteProperty = (req, res) => {
    const { id } = req.params;
    Properties.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Propiedad eliminada.' });
    });
};

