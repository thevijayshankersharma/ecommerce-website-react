import React, { useContext, useState } from 'react';
import { x } from '../App';
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    let [login, setLogin] = useState(false);

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
        <div className="fixed top-0 left-0 w-full flex justify-around items-center bg-red-500 p-2 z-50">
            <Link to="/">
                <img src="https://e7.pngegg.com/pngimages/480/581/png-clipart-logo-e-commerce-digital-marketing-brand-trade-ecommerce-text-service.png" alt="logo" className="h-10 w-auto" />
            </Link>
            <Link to='/men'>MEN</Link>
            <Link to='/women'>WOMEN</Link>
            <Link to='/jewelery'>JEWELERY</Link>
            <Link to='/eletronics'>ELECTRONICS</Link>
            <div onClick={() => { setLogin(!login)}}><FaUserCircle />
                {login &&
                        <div className='absolute bg-green-300'>
                            <p>Username: John</p>
                            <p>Email: john@gmail.com</p>
                        </div>
                }
            </div>
            <Link to="/cart" className="text-white font-semibold">
                Cart <sup className="bg-white text-red-500 rounded-full px-2 py-0.5 text-xs">{cart.length}</sup>
            </Link>
        </div>
    );
};

export default Navbar;
