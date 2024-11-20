const db = require('./db');

const Logs = {
    create: (userId, action, callback) => {
        const query = 'INSERT INTO user_logs (user_id, action) VALUES (?, ?)';
        db.query(query, [userId, action], callback);
    },
};

module.exports = Logs;
