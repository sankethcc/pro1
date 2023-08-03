import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  console.log(props)
  const values = props.data
  const { id, title, category, price, thumbnail, discountPercentage } = values
  const discountRate = price - price * (Math.floor(discountPercentage) / 100);
  return (
    <>
      <div className="cards"  >
        <div className="pro-card ">
          <span className="category">{category}</span>
          <Link
            to={`products/${id}/${title}`}
            className="thumbnail-container"
          >
            <div className="home-thumb-cat">
              <img src={thumbnail} alt="product"></img>
            </div>

            <div className="pro-title">
              <p style={{ textTransform: 'capitalize' }} >{title.slice(0, 15)}...</p>
              <p style={{ textDecoration: "line-through" }}>${price}</p>
              <p style={{ fontWeight: 'bold' }}>${Math.floor(discountRate)}<span> ({Math.floor(discountPercentage)}% off)</span></p>
            </div>
          </Link>
          <div className="card-button">
            <button>
              <Link to="/login">Buy Now</Link>
            </button>
            <button onClick={() => {
              props.cart(props.data, 1)
              props.toggle()
            }}
            >
              Add Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
