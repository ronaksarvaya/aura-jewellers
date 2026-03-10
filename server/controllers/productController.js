const Product = require('../models/Product');

const getProducts = async (req, res) => {
    try {
        const { gender } = req.query;

        let query = {};
        if (gender) {
            query.gender = new RegExp(`^${gender}$`, 'i');
        }

        const products = await Product.find(query);
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getProducts
};
