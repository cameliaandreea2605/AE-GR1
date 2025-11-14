const { DataTypes } = require('sequelize');
const { sequelize } = require('../server'); // Corrected import

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // This is a reference to the Users table
            key: 'id',
        },
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Products', // This is a reference to the Products table
            key: 'id',
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    timestamps: true, // This will add createdAt and updatedAt fields
});

module.exports = Cart;