
import { Link, Outlet } from 'react-router-dom'
import NavigationBar1 from './NavigationBar1'
import { useState } from 'react';
import { State } from './Context/Provider';
export default function Header(props) {
  const [qtys,setQtys] = useState(1)
  const {toggleCart,cartProduct,translate,lightBox} = State()

  return (
    <>
      <header className="page-header">
        <NavigationBar1 toggle={toggleCart} cartLength={cartProduct.length} />
        <aside className='position-absolute position-fixed' style={{ transform: `translate3d(${translate}%,0px,0px)`, transitionDuration: "350ms" }}>
          <div className="cart__header">
            <h1 className="cart__title">Shopping cart</h1>
            <p className="cart__text">
              <button onClick={toggleCart} className="button">
                Close cart
              </button>
            </p>
          </div>
          {cartProduct.length == 0 ?
            <div className="cart__empty" >
              <p>Add Product to your Cart</p>
            </div> :
            <div className="cart__products js-cart-products">
              {
                cartProduct?.map((item) => {
                  return (
                    <CartItem {...item} {...props} qty={qtys} key={item.id}/>
                  )
                })}
            </div>

          }

          <div className="cart__footer">
            <p className="cart__text">
              <Link to='/cart' onClick={toggleCart} className="button" title="Buy products">
                Buy products
              </Link>
            </p>
          </div>
        </aside>
        <div onClick={toggleCart} className={`lightbox ${lightBox}`}></div>
      </header>
        <Outlet />

    </>
  );
}

const CartItem = (props) => {
  const [qty, setQty] = useState(props.qty)
  const {toggleCart, removeFromCart} = State()
  return (
    <div className="cart__product" key={props.id} >
      <article className="js-cart-product">
        <Link to={`products/${props.id}/${props.title}`} onClick={toggleCart} className='cart-thumb-wrapper'>
          <img className='cart-img' src={props.thumbnail} />
        </Link>
        <Link to={`products/${props.id}/${props.title}`} onClick={toggleCart} className='name-price'>
          <h1>{props.title}</h1>
          <p>${props.price}</p>

        </Link>
        <div style={{marginLeft:'1rem'}}>Qty:{qty}</div>

      </article>
      <div className='remove-btn-wrapper'>
        <button onClick={() =>removeFromCart(props.id)} className='remove-btn'>X</button>
      </div>
    </div>
  )
}