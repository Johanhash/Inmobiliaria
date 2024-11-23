const db = require('./db');

const Properties = {
    getAll: callback => {
        const query = 'SELECT * FROM properties WHERE status = "Disponible"';
        db.query(query, callback);
    },

    getFiltered: (filters, callback) => {
        const { location, priceMin, priceMax, type } = filters;
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

        db.query(query, params, callback);
    },

    create: (data, callback) => {
        const query = `
            INSERT INTO properties 
            (address, price, type, description, bedrooms, bathrooms, parking_spaces, size, features, image_paths, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "Disponible")
        `;
        const params = [
            data.address,
            data.price,
            data.type,
            data.description,
            data.bedrooms,
            data.bathrooms,
            data.parking_spaces,
            data.size,
            data.features || null,
            JSON.stringify(data.image_paths || []),
        ];
        db.query(query, params, callback);
    },

    update: (id, data, callback) => {
        const query = `
            UPDATE properties 
            SET address = ?, price = ?, type = ?, description = ?, status = ?, 
                bedrooms = ?, bathrooms = ?, parking_spaces = ?, size = ?, features = ?, image_paths = ? 
            WHERE id = ?
        `;
        const params = [
            data.address,
            data.price,
            data.type,
            data.description,
            data.status,
            data.bedrooms,
            data.bathrooms,
            data.parking_spaces,
            data.size,
            data.features || null,
            JSON.stringify(data.image_paths || []),
            id,
        ];
        db.query(query, params, callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM properties WHERE id = ?';
        db.query(query, [id], callback);
    },
};

module.exports = Properties;


