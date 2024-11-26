const Properties = require('../models/propertiesModel');
const Transactions = require('../models/transactionsModel');
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');

exports.getFilteredProperties = (req, res) => {
    const filters = req.body;
    Properties.getFiltered(filters, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener propiedades filtradas.' });
        }
        res.json(results);
    });
};

// Otras declaraciones y código del controlador

// Generar reporte de ventas en PDF
exports.generateSalesPDF = async (req, res) => {
    Transactions.getAll(null, (err, transactions) => {
        if (err) return res.status(500).json({ error: err.message });

        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="reporte_ventas.pdf"');

        doc.fontSize(16).text('Reporte de Ventas y Alquileres', { align: 'center' });
        doc.moveDown();

        transactions.forEach(transaction => {
            doc.fontSize(12).text(`Propiedad: ${transaction.address}`);
            doc.text(`Agente: ${transaction.agent}`);
            doc.text(`Tipo: ${transaction.transaction_type}`);
            doc.text(`Monto: ${transaction.amount}`);
            doc.text(`Fecha: ${transaction.date}`);
            doc.moveDown();
        });

        doc.end();
        doc.pipe(res);
    });
};

// Generar reporte de ventas en Excel
exports.generateSalesExcel = async (req, res) => {
    Transactions.getAll(null, async (err, transactions) => {
        if (err) return res.status(500).json({ error: err.message });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Reporte de Ventas');

        worksheet.columns = [
            { header: 'Propiedad', key: 'address', width: 30 },
            { header: 'Agente', key: 'agent', width: 30 },
            { header: 'Tipo', key: 'transaction_type', width: 15 },
            { header: 'Monto', key: 'amount', width: 15 },
            { header: 'Fecha', key: 'date', width: 15 },
        ];

        transactions.forEach(transaction => {
            worksheet.addRow(transaction);
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="reporte_ventas.xlsx"');
        await workbook.xlsx.write(res);
        res.end();
    });
};
