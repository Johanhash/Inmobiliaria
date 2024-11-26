const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

// Inicializa las configuraciones
dotenv.config();

const app = express();

// Middlewares
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas y otros middlewares
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar CORS (opcional, si es necesario)
const cors = require('cors');
app.use(cors());

// Configurar la carpeta del frontend como contenido estático
app.use(express.static(path.join(__dirname, '../frontend')));

// Definir la ruta principal para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Importar rutas
const reportsRoutes = require('./routes/reports');
const agentsRoutes = require('./routes/agents');
const documentsRoutes = require('./routes/documents');
const clientsRoutes = require('./routes/clients');
const appointmentsRoutes = require('./routes/appointments');
const propertiesRoutes = require('./routes/properties');
const usersRoutes = require('./routes/users');
const transactionsRoutes = require('./routes/transactions');

// Definir las rutas principales
app.use('/api/reports', reportsRoutes);
app.use('/api/agents', agentsRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/properties', propertiesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/transactions', transactionsRoutes);

// Nuevo endpoint para registro combinado de cliente y transacción
const transactionsController = require('./controllers/transactionsController');
app.post('/api/transactions/with-client', transactionsController.createTransactionWithClient);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
