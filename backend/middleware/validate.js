exports.validateProperty = (req, res, next) => {
    const { address, price, type, description } = req.body;

    if (!address || typeof address !== 'string') {
        return res.status(400).json({ message: 'Dirección inválida.' });
    }

    if (!price || typeof price !== 'number') {
        return res.status(400).json({ message: 'Precio inválido.' });
    }

    if (!['Casa', 'Departamento', 'Terreno'].includes(type)) {
        return res.status(400).json({ message: 'Tipo de propiedad inválido.' });
    }

    if (!description || typeof description !== 'string') {
        return res.status(400).json({ message: 'Descripción inválida.' });
    }

    next();
};

exports.validateUser = (req, res, next) => {
    const { name, email, password, role } = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ message: 'Nombre inválido.' });
    }

    if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return res.status(400).json({ message: 'Correo electrónico inválido.' });
    }

    if (!password || password.length < 6) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres.' });
    }

    if (!['Admin', 'Agent'].includes(role)) {
        return res.status(400).json({ message: 'Rol inválido.' });
    }

    next();
};
