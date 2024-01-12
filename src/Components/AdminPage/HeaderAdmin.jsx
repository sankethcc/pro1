import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { State } from '../Context/Provider'
const HeaderAdmin = () => {
    const navigate = useNavigate()
    const {setIsLoggedIn} = State()
  return (
    <div className='admin-page'>
    <header className='admin-header'>
        <div className='header-item'>
        <Link to='/admin' className="logo-container">
          <img style={{height:'30px', objectFit:'contain'}} src={logo} alt='Logo'></img>
        </Link >
            <div>
                Admin Pannel
            </div>
        </div>
        <div className='header-item'>
            <Link to='/admin' >
                Dashboard
            </Link>
            <Link to='add-product' >
                Add Product
            </Link>
            <Link to='product' >
                Products
            </Link>
            <Link to='orders' >
                Orders
            </Link>

        </div>
        <div onClick={()=>{
            localStorage.removeItem('user')
            navigate('/')
            setIsLoggedIn(false)
        }} className='header-item logout-button'>
            Logout
        </div>
       </header>
       <Outlet />
       </div>
  )
}

export default HeaderAdmin