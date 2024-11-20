const Transactions = require('../models/transactionsModel');

exports.getAllTransactions = (req, res) => {
    Transactions.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.createTransaction = (req, res) => {
    const data = req.body;
    Transactions.create(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Transaction recorded!', transactionId: result.insertId });
    });
};
