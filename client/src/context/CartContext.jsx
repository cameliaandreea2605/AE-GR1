import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axiosAuth from '../axios/axiosAuth';

export const CartContext = createContext();

const getGuestCartFromLocalStorage = () => {
    try {
        const guestCart = localStorage.getItem('guestCart');
        return guestCart ? JSON.parse(guestCart) : [];
    } catch (error) {
        console.error('Error parsing guest cart from localStorage:', error);
        return [];
    }
};

const saveGuestCartToLocalStorage = (guestCart) => {
    try {
        localStorage.setItem('guestCart', JSON.stringify(guestCart));
    } catch (error) {
        console.error('Error saving guest cart to localStorage:', error);
    }
};

export const CartProvider = ({ children }) => {
    const [userCart, setUserCart] = useState([]);
    const [guestCart, setGuestCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const { loggedIn } = useSelector((state) => state.user);

    // Load guest cart from localStorage on initial mount if not logged in
    useEffect(() => {
        if (!loggedIn) {
            setGuestCart(getGuestCartFromLocalStorage());
        }
    }, [loggedIn]);

    const fetchUserCart = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosAuth.get('/cart');
            setUserCart(response.data.data.map(item => ({ ...item.Product, quantity: item.quantity, cartItemId: item.id })));
        } catch (error) {
            console.error('Error fetching user cart:', error);
            setUserCart([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (loggedIn) {
            fetchUserCart();
            // Clear guest cart when user logs in
            saveGuestCartToLocalStorage([]);
            setGuestCart([]);
        } else {
            setUserCart([]);
            setLoading(false);
            // Load guest cart when user logs out or is not logged in
            setGuestCart(getGuestCartFromLocalStorage());
        }
    }, [loggedIn, fetchUserCart]);

    const addToCart = async (product, quantity = 1) => {
        if (loggedIn) {
            try {
                const response = await axiosAuth.post('/cart', { productId: product.id, quantity });
                fetchUserCart();
                return response.data;
            } catch (error) {
                console.error('Error adding to user cart:', error);
                throw error;
            }
        } else {
            // Guest cart logic
            const existingItemIndex = guestCart.findIndex(item => item.id === product.id);
            let updatedGuestCart;

            if (existingItemIndex > -1) {
                updatedGuestCart = [...guestCart];
                updatedGuestCart[existingItemIndex].quantity += quantity;
            } else {
                updatedGuestCart = [...guestCart, { ...product, quantity }];
            }
            setGuestCart(updatedGuestCart);
            saveGuestCartToLocalStorage(updatedGuestCart);
            return { success: true, message: 'Product added to guest cart successfully', data: updatedGuestCart };
        }
    };

    const increaseQuantity = async (productId) => {
        if (loggedIn) {
            try {
                const existingProduct = userCart.find((item) => item.id === productId);
                if (existingProduct) {
                    await axiosAuth.put(`/cart/${productId}`, { quantity: existingProduct.quantity + 1 });
                    fetchUserCart();
                }
            } catch (error) {
                console.error('Error increasing quantity in user cart:', error);
                throw error;
            }
        } else {
            // Guest cart logic
            const existingItemIndex = guestCart.findIndex(item => item.id === productId);
            if (existingItemIndex > -1) {
                const updatedGuestCart = [...guestCart];
                updatedGuestCart[existingItemIndex].quantity += 1;
                setGuestCart(updatedGuestCart);
                saveGuestCartToLocalStorage(updatedGuestCart);
            }
        }
    };

    const decreaseQuantity = async (productId) => {
        if (loggedIn) {
            try {
                const existingProduct = userCart.find((item) => item.id === productId);
                if (existingProduct && existingProduct.quantity > 1) {
                    await axiosAuth.put(`/cart/${productId}`, { quantity: existingProduct.quantity - 1 });
                    fetchUserCart();
                } else if (existingProduct && existingProduct.quantity === 1) {
                    await removeFromCart(productId);
                }
            } catch (error) {
                console.error('Error decreasing quantity in user cart:', error);
                throw error;
            }
        } else {
            // Guest cart logic
            const existingItemIndex = guestCart.findIndex(item => item.id === productId);
            if (existingItemIndex > -1) {
                const updatedGuestCart = [...guestCart];
                if (updatedGuestCart[existingItemIndex].quantity > 1) {
                    updatedGuestCart[existingItemIndex].quantity -= 1;
                    setGuestCart(updatedGuestCart);
                    saveGuestCartToLocalStorage(updatedGuestCart);
                } else {
                    // If quantity becomes 0, remove from guest cart
                    const filteredGuestCart = guestCart.filter(item => item.id !== productId);
                    setGuestCart(filteredGuestCart);
                    saveGuestCartToLocalStorage(filteredGuestCart);
                }
            }
        }
    };

    const removeFromCart = async (productId) => {
        if (loggedIn) {
            try {
                await axiosAuth.delete(`/cart/${productId}`);
                fetchUserCart();
            } catch (error) {
                console.error('Error removing from user cart:', error);
                throw error;
            }
        } else {
            // Guest cart logic
            const updatedGuestCart = guestCart.filter(item => item.id !== productId);
            setGuestCart(updatedGuestCart);
            saveGuestCartToLocalStorage(updatedGuestCart);
        }
    };

    const clearCart = async () => {
        if (loggedIn) {
            try {
                await axiosAuth.delete('/cart');
                fetchUserCart();
            } catch (error) {
                console.error('Error clearing user cart:', error);
                throw error;
            }
        } else {
            // Guest cart logic
            setGuestCart([]);
            saveGuestCartToLocalStorage([]);
        }
    };

    const displayCart = loggedIn ? userCart : guestCart;

    return (
        <CartContext.Provider value={{ cart: displayCart, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, loading }}>
            {children}
        </CartContext.Provider>
    );
};
