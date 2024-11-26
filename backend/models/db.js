const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        throw err;
    }
    console.log('Base de datos conectada.');
});

module.exports = db;