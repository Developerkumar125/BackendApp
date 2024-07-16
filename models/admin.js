'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../Db');
const jwt = require('jsonwebtoken');

const Admin = sequelize.define('Admin', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        // type: DataTypes.STRING,
        // allowNull: false,
        // primaryKey: true,
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
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    accesstoken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Admin.prototype.generateAuthToken = function () {
    const token = jwt.sign({ username: this.username }, 'your_jwt_secret', { expiresIn: '1hr' });
    return token;
};

module.exports = Admin;
