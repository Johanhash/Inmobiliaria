const db = require('./db');

const Transactions = {
    getAll: callback => {
        const query = 'SELECT * FROM transactions';
        db.query(query, callback);
    },
    create: (data, callback) => {
        const query = 'INSERT INTO transactions (property_id, user_id, transaction_type, amount) VALUES (?, ?, ?, ?)';
        db.query(query, [data.property_id, data.user_id, data.transaction_type, data.amount], callback);
    },
    update: (id, data, callback) => {
        const query = 'UPDATE transactions SET property_id = ?, user_id = ?, transaction_type = ?, amount = ? WHERE id = ?';
        db.query(query, [data.property_id, data.user_id, data.transaction_type, data.amount, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM transactions WHERE id = ?';
        db.query(query, [id], callback);
    },
};

module.exports = Transactions;
