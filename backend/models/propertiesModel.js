const db = require('./db');

const Properties = {
    getAll: callback => {
        const query = 'SELECT * FROM properties';
        db.query(query, callback);
    },
    create: (data, callback) => {
        const query = `
    INSERT INTO properties (address, price, type, description, status) 
    VALUES (?, ?, ?, ?, "Disponible")
`;
const params = [
    data.address || '',
    data.price || 0,
    data.type || '',
    data.description || '',
];
db.query(query, params, callback);

    
    },
    
    update: (id, data, callback) => {
        const query = `
            UPDATE properties 
            SET address = ?, price = ?, type = ?, description = ?, status = ? 
            WHERE id = ?`;
        const params = [data.address, data.price, data.type, data.description, data.status, id];
        db.query(query, params, callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM properties WHERE id = ?';
        db.query(query, [id], callback);
    },
};

module.exports = Properties;
