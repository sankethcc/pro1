
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
import './styles/mediaquery.scss'



function App() {
  const [cartProduct, setCartProduct] = useState([])
  const [toggleMenu, setToggleMenu] = useState(true)
  const [translate, setTranslate] = useState(100)
  const [lightBox, setLightBox] = useState('')
  let props = {
    toggleMenu,
    translate,
    lightBox,
    cartProduct,

    toggleCart: () => {
      setToggleMenu(!toggleMenu)
      if (toggleMenu) {
        setTranslate(0)
        setLightBox("lightboxOpen")
      } else {
        setTranslate(100)
        setLightBox("")
      }
    },
    cart: (data, quantity) => {
      
      let temp = {
        id: data.id,
        discount:data.discountPercentage,
        category:data.category,
        price:data.price,
        thumbnail:data.thumbnail,
        title:data.title,
        quantity:quantity,
        description:data.description
      }
      setCartProduct([...cartProduct, temp])
    },
    removeFromCart: (id) => {
      setCartProduct(cartProduct.filter((product) => {
        return product.id !== id
      }))
    },

  }

  console.log(props)


  return (
    <div className="App">
      <BrowserRouter>
        <Header {...props} />
        <Routes>
          <Route path="/products" element={<Products {...props}/>} />
          <Route path="/products/:productId/:title" element={<ProductDisplay {...props} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart {...props} />} />
          <Route path="/" element={<Home {...props} />} />
          <Route path="/about" element={<About />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
