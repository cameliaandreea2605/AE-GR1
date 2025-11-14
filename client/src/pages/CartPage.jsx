import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-2/3">
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Your Shopping Bag</h1>
                        {cart.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-xl text-gray-500 mb-4">Your bag is empty.</p>
                                <Link to="/products" className="text-lg font-medium text-indigo-600 hover:text-indigo-500">
                                    Continue Shopping &rarr;
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex items-start bg-white p-6 rounded-lg shadow-sm">
                                        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-6" />
                                        <div className="flex-grow">
                                            <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                                            <p className="text-gray-600">${item.price.toFixed(2)}</p>
                                            <div className="flex items-center mt-2">
                                                <button onClick={() => decreaseQuantity(item.id)} className="text-gray-500 hover:text-gray-700 transition-colors px-2 py-1 border rounded-l-md">-</button>
                                                <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
                                                <button onClick={() => increaseQuantity(item.id)} className="text-gray-500 hover:text-gray-700 transition-colors px-2 py-1 border rounded-r-md">+</button>
                                            </div>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="lg:w-1/3 lg:ml-8 mt-12 lg:mt-0">
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping estimate</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="border-t border-gray-200 my-4"></div>
                                <div className="flex justify-between text-xl font-bold text-gray-900">
                                    <span>Order total</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                            <button className="w-full bg-gray-900 text-white py-3 rounded-lg mt-8 hover:bg-gray-800 transition-colors font-semibold">
                                Checkout
                            </button>
                            {cart.length > 0 && (
                                <button onClick={clearCart} className="w-full text-center text-gray-500 mt-4 hover:text-red-500 transition-colors">
                                    Clear Bag
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;


