const db = require('./db');

const Users = {
    getAgents: callback => {
        const query = 'SELECT id, name FROM users WHERE role = "Agente"';
        db.query(query, callback);
    },
    create: (data, callback) => {
        const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(query, [data.name, data.email, data.password, data.role], callback);
    },
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },
    update: (id, data, callback) => {
        const query = 'UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?';
        db.query(query, [data.name, data.email, data.password, data.role, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM users WHERE id = ?';
        db.query(query, [id], callback);
    },
};

module.exports = Users;
