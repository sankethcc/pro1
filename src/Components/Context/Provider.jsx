import React,{createContext, useCallback, useContext, useEffect, useState} from "react";

const ChatContext = createContext();

const Provider = ({children})=>{
    // login states for managing ligin authentication 
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    let usersdata = JSON?.parse(localStorage?.getItem('user'));
    useEffect(()=>{
        if(usersdata){
            setIsLoggedIn(true)
        }else{
            setIsLoggedIn(false)
        }

    },[isLoggedIn])
    // states and functions for cart management
    const [cartProduct, setCartProduct] = useState([])
    const [toggleMenu, setToggleMenu] = useState(true)
    const [translate, setTranslate] = useState(100)
    const [lightBox, setLightBox] = useState('')
    const toggleCart= () => {
        setToggleMenu(!toggleMenu)
        if (toggleMenu) {
          setTranslate(0)
          setLightBox("lightboxOpen")
        } else {
          setTranslate(100)
          setLightBox("")
        }
      }
    const  cart= (data, quantity) => {
        
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
      }
     const removeFromCart= (id) => {
        setCartProduct(cartProduct.filter((product) => {
          return product.id !== id
        }))
      }

    return(
        <ChatContext.Provider
        value={{
        isLoggedIn, setIsLoggedIn,
        cartProduct, setCartProduct,
        toggleMenu, setToggleMenu,
        translate, setTranslate,
        lightBox, setLightBox,
        toggleCart, cart,removeFromCart,
        }}
        >
            {children}
        </ChatContext.Provider>
    )
}

export const State= ()=>{
    return useContext(ChatContext)
}
export default Provider;