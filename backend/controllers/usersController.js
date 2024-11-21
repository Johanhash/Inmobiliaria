const Users = require('../models/usersModel');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { email, password } = req.body;
    Users.findByEmail(email, (err, user) => {
        if (err || !user || user.password !== password) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Inicio de sesión exitoso.', token });
    });
};

exports.getAllAgents = (req, res) => {
    Users.getAgents((err, results) => {
        if (err) {
            console.error('Error al obtener agentes:', err);
            return res.status(500).json({ error: 'Error al obtener agentes.' });
        }

        res.json(results);
    });
};