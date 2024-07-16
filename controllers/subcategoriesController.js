'use strict';

// Import the Subcategory model
const Subcategory = require('../models/subcategories');


// Handler to get all subcategories
exports.getSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.findAll();
        res.json(subcategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Handler to get a specific subcategory by its ID
exports.getSubcategory = async (req, res) => {
    try {
        // Fetch the subcategory with the given ID from the database
        const subcategory = await Subcategory.findByPk(req.params.id);
        if (subcategory) {
            res.json(subcategory);
        } else {
            res.status(404).json({ error: 'Subcategory not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Handler to create a new subcategory
exports.createSubcategory = async (req, res) => {
    try {
        const newSubcategory = await Subcategory.create(req.body);
        res.status(201).json(newSubcategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Handler to update an existing subcategory by its ID
exports.updateSubcategory = async (req, res) => {
    try {
        // Update the subcategory with the given ID using the data from the request body
        const [updated] = await Subcategory.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedSubcategory = await Subcategory.findByPk(req.params.id);
            res.status(200).json(updatedSubcategory);
        } else {
            res.status(404).json({ error: 'Subcategory not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Handler to delete a subcategory by its ID
exports.deleteSubcategory = async (req, res) => {
    try {
        // Delete the subcategory with the given ID from the database
        const deleted = await Subcategory.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Subcategory not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
