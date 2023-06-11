
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Header from "./Components/Header";
import Products from "./Components/NavComponents/Products";
import Login from './Components/NavComponents/Login'
import Cart from './Components/NavComponents/Cart'
import Home from './Components/NavComponents/Home'
import Footer from "./Components/Footer";
import Signup from "./Components/Signup";


import './styles/footer.css'
import './styles/button.css'
import './styles/header.css'
import './styles/navigationbar1.css'
import './styles/icon.css'
import './styles/products.scss'
import './styles/login.scss'
import './styles/signup.scss'
import './styles/mediaquery.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Home />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
