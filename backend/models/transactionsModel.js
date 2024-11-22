const db = require('./db');

const Transactions = {
    getAll: (filters, callback) => {
        let query = 'SELECT t.id, t.transaction_type, t.amount, t.date, p.address, u.name AS agent ' +
                    'FROM transactions t ' +
                    'JOIN properties p ON t.property_id = p.id ' +
                    'JOIN users u ON t.agent_id = u.id';
        const params = [];

        if (filters) {
            if (filters.date) {
                query += ' WHERE t.date = ?';
                params.push(filters.date);
            }
            if (filters.type) {
                query += filters.date ? ' AND' : ' WHERE';
                query += ' t.transaction_type = ?';
                params.push(filters.type);
            }
        }

        db.query(query, params, callback);
    },
    create: (data, callback) => {
        const query = `
            INSERT INTO transactions (property_id, client_id, agent_id, transaction_type, amount, date)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
    
        const params = [
            data.property_id,
            data.client_id,
            data.agent_id,
            data.transaction_type,
            data.amount,
            data.date,
        ];
    
        db.query(query, params, (err, result) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                return callback(err, null);
            }
    
            callback(null, result);
        });
    },
    
    getDetailsById: (id, callback) => {
        const query = `
            SELECT 
                t.id, t.transaction_type, t.amount, t.date, 
                p.address, p.type AS property_type, 
                u.name AS agent_name, u.email AS agent_email 
            FROM transactions t
            JOIN properties p ON t.property_id = p.id
            JOIN users u ON t.agent_id = u.id
            WHERE t.id = ?`;
        db.query(query, [id], callback);
    },
};

module.exports = Transactions;
