const db = require('./db');

const Users = {
    // Obtener todos los agentes
    getAgents: callback => {
        const query = 'SELECT id, name FROM users WHERE role = "Agente"';
        db.query(query, callback);
    },

    // Crear un nuevo usuario
    create: (data, callback) => {
        const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(query, [data.name, data.email, data.password, data.role], callback);
    },

    // Buscar un usuario por correo electrónico
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    // NUEVO: Buscar un usuario por ID
    findById: (id, callback) => {
        const query = 'SELECT id, name, email, role FROM users WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]); // Devuelve el primer resultado si existe
        });
    },

    // Actualizar un usuario
    update: (id, data, callback) => {
        const query = 'UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?';
        db.query(query, [data.name, data.email, data.password, data.role, id], callback);
    },

    // Eliminar un usuario
    delete: (id, callback) => {
        const query = 'DELETE FROM users WHERE id = ?';
        db.query(query, [id], callback);
    },
};

module.exports = Users;
