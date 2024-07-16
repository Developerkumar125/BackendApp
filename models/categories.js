'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../Db');
const Subcategory = require('./subcategories');

const Category = sequelize.define('Categories', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    subcategory_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Subcategory,
            key: 'id'
        },
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 10]  // Ensures the length is between 3 and 10 characters
        }
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
    updatedAt: 'updated_at'
});

// Establish the association
Subcategory.hasMany(Category, { foreignKey: 'subcategory_id' });
Category.belongsTo(Subcategory, { foreignKey: 'subcategory_id' });

module.exports = Category;
