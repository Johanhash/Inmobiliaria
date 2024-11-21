const db = require('./db'); // Importa la conexión a la base de datos

const Properties = {
    // Método para obtener todas las propiedades
    getAll: callback => {
        const query = 'SELECT * FROM properties WHERE status = "Disponible"';
        db.query(query, callback);
    },

    // NUEVO MÉTODO: Obtener propiedades con filtros
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
};    

module.exports = Properties; // Exporta el modelo para que pueda ser usado en otros archivos

