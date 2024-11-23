const Users = require('../models/usersModel');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { email, password } = req.body;

    Users.findByEmail(email, (err, user) => {
        if (err) {
            console.error('Error al buscar usuario:', err);
            return res.status(500).json({ message: 'Error en el servidor.' });
        }
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        // Generar el token incluyendo el `id`, `role` y `name` del usuario
        const token = jwt.sign(
            { id: user.id, role: user.role, name: user.name },
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
// Nuevo endpoint para obtener el perfil del usuario actual
exports.getUserProfile = (req, res) => {
    const userId = req.user.id; // Extraído del middleware de autenticación

    Users.findById(userId, (err, user) => {
        if (err) return res.status(500).json({ error: 'Error al obtener el perfil del usuario.' });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

        res.json(user); // Devuelve la información del usuario
    });
};
