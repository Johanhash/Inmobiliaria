const db = require('../models/db'); // Asegúrate de que la ruta sea correcta

exports.sendContactMessage = (req, res) => {
    const { name, email, comments } = req.body;

    console.log('Datos recibidos:', { name, email, comments });

    if (!name || !email || !comments) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    // Insertar los datos en la tabla `contacto`
    const query = 'INSERT INTO contacto (name, email, comments) VALUES (?, ?, ?)';
    db.query(query, [name, email, comments], (err, result) => {
        if (err) {
            console.error('Error al guardar el mensaje de contacto:', err);
            return res.status(500).json({ message: 'Error al guardar el mensaje de contacto.' });
        }

        res.status(200).json({ message: 'Mensaje enviado y guardado con éxito.' });
    });
};