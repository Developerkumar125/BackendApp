// models/user.js
'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../Db');
const Roles = require('./roles');
const jwt = require('jsonwebtoken');

const User = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstname: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Must be a valid email address",
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    confirm_password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone_number: {
        type: DataTypes.INTEGER, // Changed to INTEGER
        allowNull: true,
    },
    pincode: {
        type: DataTypes.INTEGER, // Changed to INTEGER
        allowNull: true,
    },
    role_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Roles,
            key: 'id'
        },
        allowNull: false,
        // defaultValue: 1 // Default role ID, if desired
    },
    accesstoken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

User.prototype.generateAuthToken = function () {
    const token = jwt.sign({ email: this.email, role_id: this.role_id }, 'your_jwt_secret', { expiresIn: '1hr' });
    return token;
};

User.belongsTo(Roles, { foreignKey: 'role_id' });
Roles.hasMany(User, { foreignKey: 'role_id' });

module.exports = User;
