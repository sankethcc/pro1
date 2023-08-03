import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

const ProductDisplay = (props) => {
  console.log(props.cart)
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { productId } = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `https://dummyjson.com/products/${productId}`
      );
      setProducts(data);
    };

    fetchProduct();
  }, [productId]);
  console.log(products)
  const {
    title,
    price,
    description,
    discountPercentage,
    rating,
    // stock,
    images,
    brand,
  } = products;

  const discountRate = price - price * (discountPercentage / 100);
  Math.floor(discountRate);
  const [displayImg, setDisplayImg] = useState(0);
  const changeDisplay = (currImg) => {
    setDisplayImg(currImg);
  };

  return (
    <>
      <div className="product-display">
        <div className="pro-display-cont">
          <div className="product-images">
            <div className="product-images-container">
              <div className="pro-img-sec">
                <img src={images ? images[displayImg] : ""} alt="product"></img>
              </div>
              <div className="thumb-container">
                {images
                  ? images.map((imgs, i) => {
                      return (
                        <div className="single-img-thumb" key={i}>
                          <img
                            onClick={() => changeDisplay(i)}
                            className="thumb-images"
                            src={imgs}
                            alt="thumb"
                          ></img>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>

          <div className="product-description">
            <div className="navigation-to-back">
              <button onClick={() => navigate(-1)}>Back</button>
            </div>
            <div className="product-details">
              <p style={{ fontStyle: "italic", color: "green" }}>
                All Branded Products
              </p>
              <p className="title">{title}</p>
              <div className="rating-review">
                <p className="rating-logo">
                  {rating} <span>&#9733;</span>
                </p>
                <p className="reviews">
                  {Math.floor(Math.random() * 150)} ratings and{" "}
                  {Math.floor(Math.random() * 250)} reviews
                </p>
              </div>

              <div className="flex">
                <p className="price">${price}</p>
                <span>${Math.floor(discountRate)}</span>
                <span
                  style={{
                    color: "green",
                    fontSize: "1.5rem",
                    marginTop: "1.5rem",
                  }}
                >
                  {" "}
                  ({Math.floor(discountPercentage)}% off)
                </span>
              </div>
              <p className="description">{description}</p>
              <p className="description">
                <span style={{ fontSize: "1.2rem", color: "darkgray" }}>
                  Brand:
                </span>{" "}
                {brand}
              </p>
            </div>
            <div className="pro-img-btn">
              <button className="p-page-btn">
                <Link to="/login">Buy Now</Link>
              </button>
              <button className="p-page-btn">
                <Link onClick={()=>{
                  props.cart(products,1)
                  props.toggleCart()
                  }} >Add Cart</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;
