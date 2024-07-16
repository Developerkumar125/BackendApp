'use strict';

const Admin = require('../models/admin');

exports.getAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.username);
        if (admin) {
            res.json(admin);
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createAdmin = async (req, res) => {
    try {
        const newAdmin = await Admin.create(req.body);
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        const [updated] = await Admin.update(req.body, { where: { username: req.params.username } });
        if (updated) {
            const updatedAdmin = await Admin.findByPk(req.params.username);
            res.status(200).json(updatedAdmin);
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        const deleted = await Admin.destroy({ where: { username: req.params.username } });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
