const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Inicializa las configuraciones
dotenv.config();
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importar rutas
const propertiesRoutes = require('./routes/properties');
const usersRoutes = require('./routes/users');
const transactionsRoutes = require('./routes/transactions');

// Definir las rutas principales
app.use('/api/properties', propertiesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/transactions', transactionsRoutes);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
