
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Header from "./Components/Header";
import About from "./Components/NavComponents/About";
import Products from "./Components/NavComponents/Products";
import Login from './Components/NavComponents/Login'
import Cart from './Components/NavComponents/Cart'
import Home from './Components/NavComponents/Home'
import Footer from "./Components/Footer";
import Signup from "./Components/Signup";
import ProductDisplay from "./Components/ProductDisplay";


import './styles/footer.css'
import './styles/about.scss'
import './styles/header.css'
import './styles/navigationbar1.css'
import './styles/icon.css'
import './styles/products.scss'
import './styles/login.scss'
import './styles/signup.scss'
import './styles/productdisplay.scss'
import './styles/mediaquery.scss'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/products" element={<Products />}/>
          <Route path="/products/:productId/:title" element={<ProductDisplay />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/sankethcc/pro1" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
