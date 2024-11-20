const Users = require('../models/usersModel');

exports.register = (req, res) => {
    const userData = req.body;
    Users.create(userData, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User registered successfully!', userId: result.insertId });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    Users.findByEmail(email, (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user || user.password !== password)
            return res.status(401).json({ message: 'Invalid credentials!' });
        res.json({ message: 'Login successful!', user });
    });
};
