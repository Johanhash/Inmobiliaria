exports.requireRole = role => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ message: `Acceso denegado. Se requiere el rol de ${role}.` });
    }
    next();
};
