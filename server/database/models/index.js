const User = require('./User');
const Product = require('./Product');
const Cart = require('./Cart');

// Associations
User.hasMany(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Cart, { foreignKey: 'productId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

module.exports = { User, Product, Cart };