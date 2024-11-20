const db = require('./db');

const Appointments = {
    getAll: callback => {
        const query = `
            SELECT a.id, a.date, a.time, a.status, 
                   c.name AS client_name, c.email AS client_email, 
                   p.address AS property_address, 
                   u.name AS agent_name, u.email AS agent_email
            FROM appointments a
            JOIN clients c ON a.client_id = c.id
            JOIN properties p ON a.property_id = p.id
            JOIN users u ON a.agent_id = u.id`;
        db.query(query, callback);
    },
    create: (data, callback) => {
        const query = `
            INSERT INTO appointments (client_id, property_id, agent_id, date, time, status) 
            VALUES (?, ?, ?, ?, ?, 'Pendiente')`;
        db.query(query, [data.client_id, data.property_id, data.agent_id, data.date, data.time], callback);
    },
    updateStatus: (id, status, callback) => {
        const query = 'UPDATE appointments SET status = ? WHERE id = ?';
        db.query(query, [status, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM appointments WHERE id = ?';
        db.query(query, [id], callback);
    },
};

module.exports = Appointments;
