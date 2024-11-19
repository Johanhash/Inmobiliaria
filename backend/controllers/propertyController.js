const db = require('../config/db');

exports.getProperties = async (req, res) => {
    try {
        const [properties] = await db.execute('SELECT * FROM properties');
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching properties' });
    }
};

exports.createProperty = async (req, res) => {
    const { address, price, type, features, images, status } = req.body;

    try {
        const [result] = await db.execute(
            'INSERT INTO properties (address, price, type, features, images, status) VALUES (?, ?, ?, ?, ?, ?)',
            [address, price, type, features, images, status]
        );
        res.status(201).json({ message: 'Property created successfully', propertyId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Error creating property' });
    }
};

exports.updateProperty = async (req, res) => {
    const { id } = req.params;
    const { address, price, type, features, images, status } = req.body;

    try {
        await db.execute(
            'UPDATE properties SET address = ?, price = ?, type = ?, features = ?, images = ?, status = ? WHERE id = ?',
            [address, price, type, features, images, status, id]
        );
        res.json({ message: 'Property updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating property' });
    }
};

exports.deleteProperty = async (req, res) => {
    const { id } = req.params;

    try {
        await db.execute('DELETE FROM properties WHERE id = ?', [id]);
        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting property' });
    }
};
