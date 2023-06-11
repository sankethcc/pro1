
import React,{ useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get("https://fakestoreapi.com/products/");

      setProducts(data);
      setData(data)
    };
    fetchProduct();
  }, []);
  

    const filterResult=(catItem)=>{
      const result = products.filter((curData)=>{
          return curData.category === catItem;
      });
      setData(result)
    }

    const [toggle,setToggle] = useState(true)
    const [translate, setTranslate] = useState(-200)
    const toggleInput=()=>{
        setToggle(!toggle)
        toggle === true?setTranslate(0):setTranslate(-200)
        
    }
  return (
    <>
      <main className="product-page">
        <button className="toggle-media" onClick={toggleInput}>Filter Products</button>
        
        <div className="filter" style={{transform:`translate3d(${translate}%,0px,0px)`, transitionDuration:"350ms"}}>
            <div className="position">

          <h3>Filter</h3>
          <hr></hr>
          <div className="filter-type">
          <h4>Category</h4>
          <div className="filter-buttons">
            <button className="category-button" onClick={()=>setData(products)}>All Products</button>
            <button className="category-button" onClick={()=>filterResult("electronics")}>electronics</button>
            <button className="category-button" onClick={()=>filterResult("jewelery")}>jewelery</button>
            <button className="category-button" onClick={()=>filterResult("men's clothing")}>men's clothing</button>
            <button className="category-button" onClick={()=>filterResult("women's clothing")}>women's clothing</button>
          </div>
            </div>
          </div>
        </div>
        <div className="shirts">
          {data.map((values) => {
            const { id, title, price, image } = values;
            return (
              <>
                <div className="cards" key={id}>
                  <div className="card-container">
                    <div className="image-container">
                      <img src={image} alt="Image"></img>
                      <p>{title.slice(0, 15)}</p>
                      <p>${price}</p>
                    </div>
                    <div className="card-button">
                      <button>
                        <Link to="/login">Buy Now</Link>
                      </button>
                      <button>
                        <Link to="/login">Add Cart</Link>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </main>
    </>
  );
}
