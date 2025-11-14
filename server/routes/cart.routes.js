const express = require('express');
const { verifyToken } = require('../utils/token.js');
const { User, Product, Cart } = require('../database/models');

const router = express.Router();

// Get user's cart
router.get('/', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const cart = await Cart.findAll({
            where: { userId },
            include: [{ model: Product }]
        });
        res.status(200).json({ success: true, message: 'Cart retrieved successfully', data: cart });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving cart', data: error.message });
    }
});

// Add product to cart or update quantity if already exists
router.post('/', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const { productId, quantity } = req.body;

        if (!productId || !quantity || quantity <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid product ID or quantity', data: {} });
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found', data: {} });
        }

        let cartItem = await Cart.findOne({
            where: { userId, productId }
        });

        let newQuantity;
        if (cartItem) {
            newQuantity = cartItem.quantity + quantity;
        } else {
            newQuantity = quantity;
        }

        if (newQuantity > product.stock) {
            return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}. Available: ${product.stock}`, data: {} });
        }

        if (cartItem) {
            cartItem.quantity = newQuantity;
            await cartItem.save();
        } else {
            cartItem = await Cart.create({ userId, productId, quantity: newQuantity });
        }

        res.status(200).json({ success: true, message: 'Product added to cart successfully', data: cartItem });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding product to cart', data: error.message });
    }
});

// Update product quantity in cart
router.put('/:productId', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const { productId } = req.params;
        const { quantity } = req.body;

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found', data: {} });
        }

        if (quantity > product.stock) {
            return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}. Available: ${product.stock}`, data: {} });
        }

        const cartItem = await Cart.findOne({
            where: { userId, productId }
        });

        if (!cartItem) {
            return res.status(404).json({ success: false, message: 'Product not found in cart', data: {} });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.status(200).json({ success: true, message: 'Cart item quantity updated successfully', data: cartItem });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating cart item quantity', data: error.message });
    }
});

// Remove product from cart
router.delete('/:productId', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const { productId } = req.params;

        const cartItem = await Cart.findOne({
            where: { userId, productId }
        });

        if (!cartItem) {
            return res.status(404).json({ success: false, message: 'Product not found in cart', data: {} });
        }

        await cartItem.destroy();

        res.status(200).json({ success: true, message: 'Product removed from cart successfully', data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error removing product from cart', data: error.message });
    }
});

// Clear the entire cart
router.delete('/', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;

        await Cart.destroy({
            where: { userId }
        });

        res.status(200).json({ success: true, message: 'Cart cleared successfully', data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error clearing cart', data: error.message });
    }
});

module.exports = router;