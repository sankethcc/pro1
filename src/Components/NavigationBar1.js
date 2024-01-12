
import logo from '../assets/logo.png'
import cartlogo from '../assets/cart.png'
import searchlogo from '../assets/search.png'
import searchIcon from '../assets/search-icon.png'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Hamburger from 'hamburger-react';
import { State } from './Context/Provider';


function NavigationBar1(props) {
  const {isLoggedIn, setIsLoggedIn, cartProduct,toggleCart} = State()
  const [onClick, setOnClick] = useState("")
  const [toggle, setToggle] = useState(false)
  const [lightBox, setLightBox] = useState('')

  const logout = ()=>{
    localStorage.removeItem("user")
    setIsLoggedIn(false)
  }
  const toggleSearch = () => {
    setToggle(!toggle)
    toggle === false ? setOnClick("onclick") : setOnClick("")
  }
  const [toggleMenu, setToggleMenu] = useState(true)
  const [translate, setTranslate] = useState(-100)
  const toggleInput = () => {
    setToggleMenu(!toggleMenu)
    if(toggleMenu === true){
      setTranslate(0)
      setLightBox("lightboxOpen")
      
    }else{
      setTranslate(-100)
      setLightBox("")
    }
  }
  return (
    <>
      <div className='navbar-container'>
        <Link to='/' className="logo-container">
          <img src={logo} alt='Logo'></img>
        </Link >
        <div className='media'>
          <button onClick={toggleSearch}><img style={{height:'2rem'}} src={searchIcon} /></button>
          <div onClick={()=>toggleCart()} className="cart-container">
            <p className='total-items-count'>{cartProduct.length}</p>
            <img src={cartlogo} alt='Cart' />
          </div>
          <button className='hamburger-btn' onClick={toggleInput}>{<Hamburger toggled={!toggleMenu} />}</button>
        </div>
        <div className={`searchbar-conteiner ${onClick} `} >
          <div className='search-close'>
            <form onSubmit={(e) => { e.preventDefault() }}>
              <input id='search' type="text" placeholder='Search Product, Category, Brand' />
              <button type="submit" className="search-button">
                <img src={searchlogo} alt="Search" />
              </button>
            </form>
            <div className='close-btn'>
              <button className='media close-button ' onClick={toggleSearch}>X</button>
            </div>

          </div>
        </div>
        <ul className="navigation-menu-container">
          <Link  to='/' className="menu-content">Home</Link>
          <Link  to='about' className="menu-content">About</Link>
          <Link to='products' className="menu-content">Products</Link>
          {!isLoggedIn?
          <Link to='login' className="menu-content">Login</Link>
          :<Link onClick={logout} className='menu-content'>Logout</Link>}
        <div onClick={()=>toggleCart()} className="cart-container">
            <p className='total-items-count'>{cartProduct.length}</p>
            <img src={cartlogo} alt='Cart' />
          </div>
        </ul>

      </div>
      <ul className="hamburger-menu" style={{ transform: `translate3d(0px,${translate}%,0px)`, transitionDuration: "350ms" }}>
        <button className='menu-btn' onClick={toggleInput}><Hamburger toggled={!toggleMenu} /></button>
        <div>
          <Link onClick={toggleInput} to='' className="menu-content">Home</Link>
          <Link onClick={toggleInput} to='about' className="menu-content">About</Link>
          <Link onClick={toggleInput} to='products' className="menu-content">Products</Link>
          <Link onClick={toggleInput} to='login' className="menu-content">Login</Link>

          
        </div>

      </ul>
        <div onClick={toggleInput} className={`lightbox ${lightBox}`}></div>

    </>
  );
}
export default NavigationBar1;
