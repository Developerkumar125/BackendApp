'use strict';

const Product = require('../models/products');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { category_id, subcategory_id, product_name, quantity, coupon_id, description , price } = req.body;
        const images = req.files ? req.files.map(file => file.buffer.toString('base64')) : [];

        const newProduct = await Product.create({
            category_id,
            subcategory_id,
            product_name,
            quantity,
            price,
            images,
            coupon_id,
            description
        });

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateProduct = async (req, res) => {
    try {
        const { category_id, subcategory_id, product_name, quantity, coupon_id, description } = req.body;
        const images = req.files ? req.files.map(file => file.buffer.toString('base64')) : [];
        const [updated] = await Product.update({
            category_id,
            subcategory_id,
            product_name,
            quantity,
            images,
            coupon_id,
            description
        }, { where: { id: req.params.id } });

        if (updated) {
            const updatedProduct = await Product.findByPk(req.params.id);
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
