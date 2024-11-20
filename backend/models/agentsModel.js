const db = require('./db');

const Agents = {
    getAll: callback => {
        const query = 'SELECT id, name, email FROM users WHERE role = "Agent"';
        db.query(query, callback);
    },
    create: (data, callback) => {
        const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, "Agent")';
        db.query(query, [data.name, data.email, data.password], callback);
    },
    update: (id, data, callback) => {
        const query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ? AND role = "Agent"';
        db.query(query, [data.name, data.email, data.password, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM users WHERE id = ? AND role = "Agent"';
        db.query(query, [id], callback);
    },
};

module.exports = Agents;
