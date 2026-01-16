import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Products from "./Components/Products"
import Product from "./Components/Product"
import { createContext, useState } from "react";
import Cart from "./Components/Cart";
import Address from "./Components/address/Address";
import AddNewAddress from "./Components/address/AddNewAddress";
import UpdateAddress from "./Components/address/UpdateAddress";
import CarouselComponent from "./Components/CarouselComponent";
import Men from "./Pages/Men";
import Women from "./Pages/Women";
import Jewelry from "./Pages/Jewelry";
import Electronics from "./Pages/Electronics";
import Payment from "./Components/Payment";
import Footer from "./Components/Footer";
import { Toaster } from 'react-hot-toast';

export let x = createContext();

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

// ... other imports

function App() {
  let [cart, setCart] = useState([]);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: 'ease-in-sine',
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <BrowserRouter>
        <x.Provider value={{ cart, setCart }}>
          <Navbar />
          <Toaster
            position="top-center"
            toastOptions={{
              className: '',
              style: {
                border: '1px solid #F3F4F6',
                padding: '16px',
                color: '#1F2937',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                borderRadius: '12px',
                fontFamily: 'var(--font-heading)',
                fontSize: '14px',
                fontWeight: '500',
              },
              success: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#FFF',
                },
                style: {
                  border: '1px solid #FECACA', // Light red border for success
                  background: '#FEF2F2', // Light red bg
                }
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#FFF',
                },
              },
            }}
          />
          <Routes>
            <Route path='/' element={<><CarouselComponent /><Products /></>} />
            <Route path='/cart' element={<Cart />} />
            <Route path="/address" element={<Address />} />
            <Route path="/addnewaddress" element={<AddNewAddress />} />
            <Route path="/updateaddress/:id" element={<UpdateAddress />} />
            <Route path='/products/:id' element={<Product />} />
            <Route path='/men' element={<Men />} />
            <Route path='/women' element={<Women />} />
            <Route path='/jewelery' element={<Jewelry />} />
            <Route path='/eletronics' element={<Electronics />} />
            <Route path='/payment' element={<Payment />} />
          </Routes>
          <Footer />
        </x.Provider>
      </BrowserRouter>
    </>
  )
}

export default App