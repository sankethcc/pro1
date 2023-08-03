
import { Link } from 'react-router-dom'
import NavigationBar1 from './NavigationBar1'
import { useState } from 'react';
export default function Header(props) {
  const [qtys,setQtys] = useState(1)

  return (
    <>
      <header className="page-header">
        <NavigationBar1 toggle={props.toggleCart} cartLength={props?.cartProduct.length} />
        <aside className='position-absolute position-fixed' style={{ transform: `translate3d(${props.translate}%,0px,0px)`, transitionDuration: "350ms" }}>
          <div className="cart__header">
            <h1 className="cart__title">Shopping cart</h1>
            <p className="cart__text">
              <button onClick={props.toggleCart} className="button">
                Close cart
              </button>
            </p>
          </div>
          {props?.cartProduct.length == 0 ?
            <div className="cart__empty" >
              <p>Add Product to your Cart</p>
            </div> :
            <div className="cart__products js-cart-products">
              {
                props?.cartProduct?.map((item) => {
                  return (
                    <CartItem {...item} {...props} qty={qtys} key={item.id}/>
                  )
                })}
            </div>

          }

          <div className="cart__footer">
            <p className="cart__text">
              <Link to='/cart' onClick={props.toggleCart} className="button" title="Buy products">
                Buy products
              </Link>
            </p>
          </div>
        </aside>
        <div onClick={props.toggleCart} className={`lightbox ${props.lightBox}`}></div>
      </header>

    </>
  );
}

const CartItem = (props) => {
  const [qty, setQty] = useState(props.qty)
  return (
    <div className="cart__product" key={props.id} >
      <article className="js-cart-product">
        <Link to={`products/${props.id}/${props.title}`} onClick={props.toggleCart} className='cart-thumb-wrapper'>
          <img className='cart-img' src={props.thumbnail} />
        </Link>
        <Link to={`products/${props.id}/${props.title}`} onClick={props.toggleCart} className='name-price'>
          <h1>{props.title}</h1>
          <p>${props.price}</p>

        </Link>
        <div style={{marginLeft:'1rem'}}>Qty:{qty}</div>

      </article>
      <div className='remove-btn-wrapper'>
        <button onClick={() => props.removeFromCart(props.id)} className='remove-btn'>X</button>
      </div>
    </div>
  )
}