'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../Db');
const Subcategory = require('./subcategories');
const Category = require('./categories');

const Product = sequelize.define('Products', { 
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    category_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    },
    subcategory_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Subcategory,
            key: 'id'
        },
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 40]
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 10
        }
    },
    price: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        validate: {
            min: 0
        }
    },
    images: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true
    },
    coupon_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [20, 30]
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
Category.hasMany(Subcategory, { foreignKey: 'category_id' });
Subcategory.belongsTo(Category, { foreignKey: 'category_id' });

Subcategory.hasMany(Product, { foreignKey: 'subcategory_id' });
Product.belongsTo(Subcategory, { foreignKey: 'subcategory_id' });

module.exports = Product; 
