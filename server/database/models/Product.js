const { sequelize } = require('../server');
const { DataTypes } = require('sequelize');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Product name cannot be empty'
      },
      len: {
        args: [3, 255],
        msg: 'Product name must be between 3 and 255 characters'
      }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: {
        args: [0],
        msg: 'Price cannot be negative'
      },
      isNumeric: {
        msg: 'Price must be a number'
      }
    }
  },
  category: {
    type: DataTypes.ENUM('Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Food', 'Other'),
    allowNull: false,
    validate: {
      isIn: {
        args: [['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Food', 'Other']],
        msg: 'Category must be one of the predefined values'
      }
    }
  },
  image: {
    // store image URL or path
    type: DataTypes.STRING,
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: {
        args: [0],
        msg: 'Stock cannot be negative'
      },
      isInt: {
        msg: 'Stock must be an integer'
      }
    }
  },
}, {
  tableName: 'products',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Product;