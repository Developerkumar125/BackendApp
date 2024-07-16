// 'use strict';

// const { DataTypes } = require('sequelize');
// const sequelize = require('../Db');


// const order = sequelize.define('order', {
//     category_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     subcategory_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     product_name: {
//         type: DataTypes.STRING(10), 
//         allowNull: false,
//     },
//     quantity: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         validate: {
//             min: 0,
//             max: 9,
//         },
//     },
//     Item: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//     },
//     address: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     phone_number: {
//         type: DataTypes.STRING, 
//         allowNull: false,
//     },
//     images: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//     },
//     coupon_id: {
//         type: DataTypes.STRING,
//     },
//     description: {
//         type: DataTypes.STRING(30), // Limiting to 30 characters as per your requirement
//         allowNull: false,
//         validate: {
//             len: [20, 30],
//         },
//     },
//     user_id: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
// }, {
//     timestamps: true,
//     createdAt: 'created_at',
//     updatedAt: 'updated_at'
// });

// module.exports = order;
