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
        <div className="flex flex-col gap-6 p-6">
            {cart.map(({ id, image, title, price, quantity }) => (
                <div key={id} className="flex items-center justify-between border rounded p-4 gap-4">
                    <img src={image} alt={title} className="w-24 h-24 object-contain flex-shrink-0" />

                    <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-sm font-semibold">{title}</h3>
                        <p className="text-red-500 font-bold">${Math.floor(price)}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={() => handleDesc(id)} className="text-xl border px-2 rounded">-</button>
                        <span className="w-6 text-center">{quantity}</span>
                        <button onClick={() => handleInc(id)} className="text-xl border px-2 rounded">+</button>
                    </div>

                    <div className="ml-4">
                        <h3 className="text-gray-800 font-semibold">${Math.floor(Math.floor(price) * quantity)}</h3>
                    </div>
                    <div className="ml-4">
                        <button onClick={() => handleDelete(id)} className="bg-red-500 text-white px-3 py-1 rounded">Remove</button>
                    </div>
                </div>
            ))}

            <div className="flex flex-col items-end border-t pt-4">
                <h2 className="text-xl font-semibold mb-2">Total: ${Math.floor(total)}</h2>
                <Link to='/address'><button className="bg-red-500 text-white px-6 py-2 rounded">Place Order</button></Link>
            </div>
        </div>

    ) : (
        <div className="text-center p-6">
            <h1 className="text-lg">Cart is Empty</h1>
            <Link to="/">
                <button className="mt-3 bg-red-500 text-white px-3 py-1 rounded">Browse Products</button>
            </Link>
        </div>
    );
};

export default Cart;
