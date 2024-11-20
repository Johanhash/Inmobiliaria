const Transactions = require('../models/transactionsModel');
const PDFDocument = require('pdfkit');

exports.generateContract = (req, res) => {
    const { id } = req.params;

    Transactions.getDetailsById(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Transacción no encontrada.' });

        const transaction = result[0];

        // Crear el documento PDF
        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=contrato_${transaction.id}.pdf`);

        // Generar contenido del contrato
        doc.fontSize(16).text('Contrato de Transacción', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Propiedad: ${transaction.address}`);
        doc.text(`Tipo de Propiedad: ${transaction.property_type}`);
        doc.text(`Tipo de Transacción: ${transaction.transaction_type}`);
        doc.text(`Monto: ${transaction.amount}`);
        doc.text(`Fecha: ${transaction.date}`);
        doc.moveDown();
        doc.text(`Agente Inmobiliario: ${transaction.agent_name}`);
        doc.text(`Correo Electrónico: ${transaction.agent_email}`);
        doc.moveDown();
        doc.text('Condiciones del contrato:');
        doc.text('1. Este contrato es legalmente vinculante.');
        doc.text('2. Ambas partes acuerdan cumplir con las condiciones estipuladas.');
        doc.text('3. Los datos proporcionados son correctos.');
        doc.end();
        doc.pipe(res);
    });
};


exports.getAllTransactions = (req, res) => {
    const filters = {
        date: req.query.date,
        type: req.query.type,
    };

    Transactions.getAll(filters, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.createTransaction = (req, res) => {
    const { property_id, agent_id, transaction_type, amount, date } = req.body;

    if (!property_id || !agent_id || !transaction_type || !amount || !date) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const data = { property_id, agent_id, transaction_type, amount, date };

    Transactions.create(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Transacción registrada con éxito.', transactionId: result.insertId });
    });
};

