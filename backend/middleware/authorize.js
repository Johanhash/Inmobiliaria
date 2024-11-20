module.exports = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role; // Asumimos que `req.user` contiene la información del usuario autenticado

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: 'Acceso denegado. No tienes permisos suficientes.' });
        }

        next();
    };
};
