const db = require('./db');

const Properties = {
    getById: (id, callback) => {
        const query = 'SELECT * FROM properties WHERE id = ?';
        db.query(query, [id], callback);
    },
    getAll: callback => {
        const query = 'SELECT * FROM properties WHERE status = "Disponible"';
        db.query(query, callback);
    },
    getFiltered: (filters, callback) => {
        const { location, priceMin, priceMax, type, bedrooms, bathrooms, parking_spaces } = filters;
        let query = 'SELECT * FROM properties WHERE status = "Disponible"';
        const params = [];

        if (location) {
            query += ' AND address LIKE ?';
            params.push(`%${location}%`);
        }
        if (priceMin) {
            query += ' AND price >= ?';
            params.push(priceMin);
        }
        if (priceMax) {
            query += ' AND price <= ?';
            params.push(priceMax);
        }
        if (type) {
            query += ' AND type = ?';
            params.push(type);
        }
        if (bedrooms) {
            query += ' AND bedrooms >= ?';
            params.push(bedrooms);
        }
        if (bathrooms) {
            query += ' AND bathrooms >= ?';
            params.push(bathrooms);
        }
        if (parking_spaces) {
            query += ' AND parking_spaces >= ?';
            params.push(parking_spaces);
        }

        db.query(query, params, callback);
    },
    create: (data, callback) => {
        const query = 'INSERT INTO properties SET ?';
        db.query(query, data, callback);
    },
    update: (id, data, callback) => {
        const query = 'UPDATE properties SET ? WHERE id = ?';
        db.query(query, [data, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM properties WHERE id = ?';
        db.query(query, [id], callback);
    },
};

module.exports = Properties;
