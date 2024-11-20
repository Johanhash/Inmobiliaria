const Properties = require('../models/propertiesModel');

exports.getAllProperties = (req, res) => {
    Properties.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.createProperty = (req, res) => {
    const data = req.body;
    Properties.create(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Property created!', propertyId: result.insertId });
    });
};
