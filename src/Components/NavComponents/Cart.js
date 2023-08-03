import { useState } from "react";
import { Link } from "react-router-dom";

export default function Cart(props) {
    return (
        <div className="cart">
            <h1>Shopping Cart</h1>

            <div className="shopping-cart">

                <div className="column-labels">
                    <p className="product-image">Image</p>
                    <p className="product-details">Product</p>
                    <p className="product-price">Price</p>
                    <p className="product-quantity">Quantity</p>
                    <p className="product-removal">Remove</p>
                    <p className="product-line-price">Total</p>
                </div>
                {props?.cartProduct.map((item) => {
                    return (
                        <CartProduct item={item} remove={props.removeFromCart} key={item.id} />
                    )
                })}
                <Link to='/login' className="checkout">Checkout</Link>

            </div>
        </div>
    )
}


const CartProduct = (props) => {
    const { id, discount, price, thumbnail, title, description, quantity } = props.item
    const discountRate = price - price * (Math.floor(discount) / 100);
    const [qty, setQty] = useState(quantity)
    const handleInput = (e) => {
        setQty(e.target.value)
    }
    return (
        <div className="product">
            <div className="part-1">
                <div className="product-image">
                    <img src={thumbnail} alt="Product" />
                </div>
                <div className="product-details">
                    <div className="product-title">{title}</div>
                    <p className="product-description">{description}</p>
                </div>

            </div>
            <div className="part-2">
                <div className="product-price" >
                    <p className="price">{price}</p>
                    <p className="dis-price">{discountRate}</p>
                </div>
                <div className="product-quantity">
                    <button onClick={() => qty > 1 ? setQty(qty - 1) : setQty(qty)}>-</button>
                    <input onChange={handleInput} type="number" value={qty} min="1" />
                    <button onClick={() => setQty(qty + 1)}>+</button>
                </div>
                <div className="product-removal">
                    <button className="remove-product" onClick={() => props.remove(id)}>
                        Remove
                    </button>
                </div>
                <div className="product-line-price">{Math.floor(qty * discountRate)}</div>

            </div>
        </div>
    )
}

