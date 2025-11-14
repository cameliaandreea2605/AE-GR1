import React, { createContext, useState, useEffect } from 'react';
import axiosAuth from '../axios/axiosAuth';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const response = await axiosAuth.get('/cart');
            setCart(response.data.data.map(item => ({ ...item.Product, quantity: item.quantity, cartItemId: item.id })));
        } catch (error) {
            console.error('Error fetching cart:', error);
            setCart([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchCart();
        } else {
            setCart([]);
            setLoading(false);
        }
    }, []);

    const addToCart = async (product, quantity = 1) => {
        try {
            const response = await axiosAuth.post('/cart', { productId: product.id, quantity });
            fetchCart(); // Re-fetch cart to update state
            return response.data;
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    };

    const increaseQuantity = async (productId) => {
        try {
            const existingProduct = cart.find((item) => item.id === productId);
            if (existingProduct) {
                await axiosAuth.put(`/cart/${productId}`, { quantity: existingProduct.quantity + 1 });
                fetchCart();
            }
        } catch (error) {
            console.error('Error increasing quantity:', error);
            throw error;
        }
    };

    const decreaseQuantity = async (productId) => {
        try {
            const existingProduct = cart.find((item) => item.id === productId);
            if (existingProduct && existingProduct.quantity > 1) {
                await axiosAuth.put(`/cart/${productId}`, { quantity: existingProduct.quantity - 1 });
                fetchCart();
            } else if (existingProduct && existingProduct.quantity === 1) {
                await removeFromCart(productId);
            }
        } catch (error) {
            console.error('Error decreasing quantity:', error);
            throw error;
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await axiosAuth.delete(`/cart/${productId}`);
            fetchCart();
        } catch (error) {
            console.error('Error removing from cart:', error);
            throw error;
        }
    };

    const clearCart = async () => {
        try {
            await axiosAuth.delete('/cart');
            fetchCart();
        } catch (error) {
            console.error('Error clearing cart:', error);
            throw error;
        }
    };

    const logoutCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, loading, logoutCart }}>
            {children}
        </CartContext.Provider>
    );
};