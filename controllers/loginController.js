'use strict';

const Admin = require('../models/admin');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.Adminlogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password, "password", "username");

        // Search for the admin by username and password
        const admin = await Admin.findOne({ where: { username, password } });

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        const token = admin.generateAuthToken();
        admin.accesstoken = token;
        await admin.save();

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.userlogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // Generate the JWT token
        const token = user.generateAuthToken();
        user.accesstoken = token;
        await user.save();

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
