const Clients = require('../models/clientsModel');

exports.getAllClients = (req, res) => {
    Clients.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.createClient = (req, res) => {
    const { name, email, phone, comments } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const data = { name, email, phone, comments: comments || '' };

    Clients.create(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Cliente registrado con éxito.', clientId: result.insertId });
    });
};

exports.associateWithProperty = (req, res) => {
    const { client_id, property_id } = req.body;

    if (!client_id || !property_id) {
        return res.status(400).json({ message: 'ID de cliente y propiedad son obligatorios.' });
    }

    const data = { client_id, property_id };

    Clients.associateWithProperty(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Cliente asociado con la propiedad.' });
    });
};

exports.deleteClient = (req, res) => {
    const { id } = req.params;

    Clients.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Cliente eliminado con éxito.' });
    });
};
