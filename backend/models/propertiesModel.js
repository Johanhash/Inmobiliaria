const db = require('./db');

const Properties = {
    getAll: callback => {
        const query = 'SELECT * FROM properties';
        db.query(query, callback);
    },
    create: (data, callback) => {
        const query = 'INSERT INTO properties (address, price, type, description) VALUES (?, ?, ?, ?)';
        db.query(query, [data.address, data.price, data.type, data.description], callback);
    },
};

module.exports = Properties;
