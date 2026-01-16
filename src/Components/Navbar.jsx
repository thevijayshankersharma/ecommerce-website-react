import React, { useContext, useState } from 'react';
import { x } from '../App';
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/redstore_logo.png';

const Navbar = () => {
    let [login, setLogin] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const { cart } = useContext(x);
    let location = useLocation();

    if (
        location.pathname === '/address' ||
        location.pathname === '/addnewaddress' ||
        location.pathname.startsWith('/updateaddress')
    ) {
        return null;
    }
    return (
        <nav className="fixed top-0 left-0 w-full bg-white p-4 z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center relative">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="RedStore Logo" className="h-10 w-auto" />
                    <span className="text-2xl font-bold text-gray-800">RedStore</span>
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-700 text-2xl focus:outline-none hover:scale-110 transition-transform"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-6 items-center text-gray-600 font-semibold">
                    <Link to='/men' className="hover:text-red-500 transition-colors">MEN</Link>
                    <Link to='/women' className="hover:text-red-500 transition-colors">WOMEN</Link>
                    <Link to='/jewelery' className="hover:text-red-500 transition-colors">JEWELERY</Link>
                    <Link to='/eletronics' className="hover:text-red-500 transition-colors">ELECTRONICS</Link>

                    <div className="relative cursor-pointer hover:scale-110 transition-transform text-gray-700" onClick={() => setLogin(!login)}>
                        <FaUserCircle className="text-2xl" />
                        {login && (
                            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl p-3 z-50 border border-gray-100">
                                <p className="font-bold border-b border-gray-300 pb-1 mb-1">Signed in as</p>
                                <p className="text-sm font-semibold">John Doe</p>
                                <p className="text-xs text-gray-500">john@gmail.com</p>
                            </div>
                        )}
                    </div>

                    <Link to="/cart" className="relative hover:text-red-500 transition-colors text-gray-700">
                        Cart
                        {cart.length > 0 && <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs font-bold shadow-md">{cart.length}</span>}
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <div className="md:hidden flex flex-col items-center bg-white text-gray-700 font-semibold py-4 space-y-4 shadow-inner mt-2 rounded-b-lg border-t border-gray-100">
                    <Link to='/men' onClick={() => setMenuOpen(false)} className="hover:text-red-500 transition-colors">MEN</Link>
                    <Link to='/women' onClick={() => setMenuOpen(false)} className="hover:text-red-500 transition-colors">WOMEN</Link>
                    <Link to='/jewelery' onClick={() => setMenuOpen(false)} className="hover:text-red-500 transition-colors">JEWELERY</Link>
                    <Link to='/eletronics' onClick={() => setMenuOpen(false)} className="hover:text-red-500 transition-colors">ELECTRONICS</Link>
                    <Link to="/cart" onClick={() => setMenuOpen(false)} className="hover:text-red-500 transition-colors">Cart ({cart.length})</Link>
                    <div className='flex flex-col items-center border-t border-gray-200 pt-2 w-full'>
                        <p className="text-sm">John Doe</p>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
