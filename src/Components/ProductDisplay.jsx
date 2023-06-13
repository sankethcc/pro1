import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

const ProductDisplay = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { productId } = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/${productId}`
      );

      setProducts(data);
    };
    fetchProduct();
  }, []);

  const { title, price, image, description } = products;

  return (
    <div className="product-display">
      <div className="pro-img-sec">
        <img src={image} alt="product"></img>
        <div className="pro-img-btn">
            <button className="p-page-btn">
                <Link  to="/login">Buy Now</Link>
            </button>
            <button className="p-page-btn">
                <Link  to="/login">Add Cart</Link>
            </button>
        </div>
      </div>
      <div className="product-description">
        <div className="navigation-to-back">
          <button onClick={() => navigate(-1)}>Back</button>

        </div>
        <div className="product-details">
            <p style={{fontStyle:'italic', color:"green"}}>All Branded Products</p>
            <p className="title">{title}</p>
            <div className="rating-review">
                <p className="rating-logo">{Math.floor(Math.random()*5)} <span>&#9733;</span></p> 
                <p className="reviews">
                    {Math.floor(Math.random()*150)} ratings and {Math.floor(Math.random()*250)} reviews
                </p>
            </div>
            <span style={{color:"green"}}>Special Price</span>
            <p className="price">${price}</p>
            <p className="description">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
