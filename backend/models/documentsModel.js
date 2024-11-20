const db = require('./db');

const Documents = {
    getAll: callback => {
        const query = 'SELECT * FROM documents';
        db.query(query, callback);
    },
    create: (data, callback) => {
        const query = 'INSERT INTO documents (name, type, path, associated_id) VALUES (?, ?, ?, ?)';
        db.query(query, [data.name, data.type, data.path, data.associated_id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM documents WHERE id = ?';
        db.query(query, [id], callback);
    },
};

module.exports = Documents;
