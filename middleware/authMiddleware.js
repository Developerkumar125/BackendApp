'use strict';

const jwt = require('jsonwebtoken');
const Admin = require('../models/admin'); 
const User = require('../models/user');

const AdminauthMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const decoded = jwt.verify(token, 'your_jwt_secret');
        const admin = await Admin.findOne({ where: { username: decoded.username, accesstoken: token } });

        if (!admin) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.admin = admin;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};

const userAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const decoded = jwt.verify(token, 'your_jwt_secret');
        const user = await User.findOne({ where: { email: decoded.email, accesstoken: token } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};

const combinedAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const decoded = jwt.verify(token, 'your_jwt_secret');

        let admin = null;
        let user = null;

        if (decoded.username) {
            // Admin token
            admin = await Admin.findOne({ where: { username: decoded.username, accesstoken: token } });
        }

        if (decoded.email) {
            // User token
            user = await User.findOne({ where: { email: decoded.email, accesstoken: token } });
        }

        if (admin) {
            req.admin = admin;
            next();
        } else if (user) {
            req.user = user;
            next();
        } else {
            return res.status(401).json({ error: 'Invalid token' });
        }
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};

module.exports = { AdminauthMiddleware, userAuthMiddleware, combinedAuthMiddleware };
