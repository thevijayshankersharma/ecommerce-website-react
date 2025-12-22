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

export let x = createContext();

function App() {
  let [cart, setCart] = useState([]);

  return (
    <>
      <BrowserRouter>
        <x.Provider value={{ cart, setCart }}>
          <Navbar />
          <Routes>
            <Route path='/' element={<><CarouselComponent /><Products /></>} />
            <Route path="/address" element={<Address />}/>
            <Route path="/addnewaddress" element={<AddNewAddress />}/>
            <Route path="/updateaddress/:id" element={<UpdateAddress />}/>
            <Route path='/products/:id' element={<Product />} />
            <Route path='/men' element={<Men />} />
            <Route path='/women' element={<Women />} />
            <Route path='/jewelery' element={<Jewelry />} />
            <Route path='/eletronics' element={<Electronics />} />
          </Routes>
        </x.Provider>
      </BrowserRouter>
    </>
  )
}

export default App