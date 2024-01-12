
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Header from './Components/Header'
import About from "./Components/NavComponents/About";
import Products from './Components/NavComponents/Products'
import Login from './Components/NavComponents/Login'
import Cart from './Components/NavComponents/Cart'
import Signup from "./Components/Signup";
import ProductDisplay from './Components/ProductDisplay'
import Home from './Components/NavComponents/Home'
import Admin from "./Components/AdminPage/Admin";


import './styles/footer.css'
import './styles/about.scss'
import './styles/home.scss'
import './styles/header.scss'
import './styles/navigationbar1.css'
import './styles/icon.css'
import './styles/products.scss'
import './styles/login.scss'
import './styles/signup.scss'
import './styles/productdisplay.scss'
import './styles/loadingspinner.scss'
import './styles/card.scss'
import './styles/cart.scss'
import './styles/admin.scss'
import './styles/mediaquery.scss'
import HeaderAdmin from "./Components/AdminPage/HeaderAdmin";
import Dashboard from "./Components/AdminPage/Dashboard";
import ProductsView from "./Components/AdminPage/ProductsView";
import Orders from "./Components/AdminPage/Orders";



function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/"  element={<Header />}>
            <Route index element={<Home />} />
            <Route path="/products" element={<Products/>} />
            <Route path="/products/:productId/:title" element={<ProductDisplay />} />
            <Route path="/login" element={ <Login />} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/about" element={<About />} />
            <Route path='/signup' element={<Signup />} />
          </Route>
          <Route path='/admin' element={<HeaderAdmin />}>
            <Route index element={<Dashboard />} />
            <Route path="add-product" element={<Admin />} />
            <Route path="product" element={<ProductsView />} />
            <Route path="orders" element={<Orders />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
