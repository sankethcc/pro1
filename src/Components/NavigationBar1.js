
import logo from '../assets/logo.png'
import cartlogo from '../assets/cart.png'
import { Link } from 'react-router-dom';
import Button from './Button'
function NavigationBar1() {
  return (
    <>
      <div className='navbar-container'>
        <Link to='/sankethcc/pro1' className="logo-container">
          <img src={logo} alt='Logo'></img>
        </Link >
        <div className="searchbar-conteiner" >
        <form onSubmit={(e) => { e.preventDefault() }}>
          <input type="text" placeholder='Search Product, Category, Brand' />
          <Button />
        </form>
        </div>
        <ul className="navigation-menu-container">
          <Link to='products' className="menu-content">Products</Link>
          <Link to='login' className="menu-content">Login</Link>

          <Link to='cart' className="cart-container">
            <img src={cartlogo} alt='Cart'/>
            <span>Cart</span>
          </Link>
        </ul>

      </div>


    </>
  );
}
export default NavigationBar1;
