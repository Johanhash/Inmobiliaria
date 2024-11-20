const db = require('./db');

const Clients = {
    getAll: callback => {
        const query = 'SELECT * FROM clients';
        db.query(query, callback);
    },
    create: (data, callback) => {
        const query = 'INSERT INTO clients (name, email, phone, comments) VALUES (?, ?, ?, ?)';
        db.query(query, [data.name, data.email, data.phone, data.comments], callback);
    },
    associateWithProperty: (data, callback) => {
        const query = 'INSERT INTO client_property (client_id, property_id) VALUES (?, ?)';
        db.query(query, [data.client_id, data.property_id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM clients WHERE id = ?';
        db.query(query, [id], callback);
    },
};

module.exports = Clients;
