const Agents = require('../models/agentsModel');

exports.getAllAgents = (req, res) => {
    Agents.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.createAgent = (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const data = { name, email, password };

    Agents.create(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Agente registrado con éxito.', agentId: result.insertId });
    });
};

exports.updateAgent = (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const data = { name, email, password };

    Agents.update(id, data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Agente actualizado con éxito.' });
    });
};

exports.deleteAgent = (req, res) => {
    const { id } = req.params;

    Agents.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Agente eliminado con éxito.' });
    });
};
