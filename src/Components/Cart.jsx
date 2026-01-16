import React, { useContext, useEffect, useState } from 'react';
import { x } from '../App';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, setCart } = useContext(x);
    let handleDelete = (id) => {
        setCart((data) => data.filter((ele) => ele.id !== id));
    }

    let handleInc = (id) => {
        let prods = [...cart];
        for (let i = 0; i < prods.length; i++) {
            if (prods[i].id === id) {
                prods[i] = { ...prods[i], quantity: prods[i].quantity + 1 };
            }

        }
        setCart(prods)
    }

    let handleDesc = (id) => {
        let prods = [...cart];
        for (let i = 0; i < prods.length; i++) {
            if (prods[i].id === id) {
                if (prods[i].quantity > 1) {
                    prods[i] = { ...prods[i], quantity: prods[i].quantity - 1 };
                    break;
                }
            }
        }
        setCart(prods)
    }

    const total = cart.reduce((sum, prod) => sum + Math.floor(prod.price) * prod.quantity, 0);

    return cart.length > 0 ? (
        <div className="container mx-auto p-6 mt-24 max-w-5xl">
            <h1 className="text-3xl font-heading font-bold mb-8 text-gray-800">Shopping Cart</h1>

            <div className="flex flex-col gap-6">
                {cart.map(({ id, image, title, price, quantity }) => (
                    <div key={id} className="flex flex-col sm:flex-row items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100 gap-6 transition hover:shadow-md">
                        {/* Image */}
                        <div className="w-24 h-24 shrink-0 bg-gray-50 rounded-lg flex items-center justify-center p-2">
                            <img src={image} alt={title} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>

                        {/* Details */}
                        <div className="flex-1 text-center sm:text-left">
                            <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">{title}</h3>
                            <p className="text-red-500 font-bold text-lg">${Math.floor(price)}</p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                            <button onClick={() => handleDesc(id)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition active:scale-95 text-gray-600">-</button>
                            <span className="w-8 text-center font-bold text-gray-800">{quantity}</span>
                            <button onClick={() => handleInc(id)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition active:scale-95 text-gray-600">+</button>
                        </div>

                        {/* Subtotal */}
                        <div className="w-24 text-center">
                            <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Subtotal</p>
                            <h4 className="text-lg font-bold text-gray-800">${Math.floor(Math.floor(price) * quantity)}</h4>
                        </div>

                        {/* Remove */}
                        <button onClick={() => handleDelete(id)} className="text-red-400 hover:text-red-600 font-medium text-sm transition px-3 py-1 hover:bg-red-50 rounded-lg">
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            {/* Total Section */}
            <div className="flex flex-col items-end mt-10 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between w-full max-w-xs mb-4">
                    <span className="text-gray-600 text-lg">Total Amount:</span>
                    <span className="text-2xl font-bold text-gray-900">${Math.floor(total)}</span>
                </div>
                <Link to='/address'>
                    <button className="bg-red-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-red-600 hover:shadow-red-500/30 transition transform hover:-translate-y-1 active:scale-95">
                        Proceed to Checkout
                    </button>
                </Link>
            </div>
        </div>
    ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 mt-16">
            <div className="bg-gray-50 p-6 rounded-full mb-6">
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" alt="Empty Cart" className="w-64 opacity-50 mix-blend-multiply" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-gray-800 mb-2">Your Cart is Empty</h1>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Explore our products and discover something you'll love!</p>
            <Link to="/">
                <button className="bg-red-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-red-600 hover:shadow-red-500/30 transition transform hover:-translate-y-1">
                    Start Shopping
                </button>
            </Link>
        </div>
    );
};

export default Cart;
