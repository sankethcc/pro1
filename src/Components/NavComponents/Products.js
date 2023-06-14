
import React, { useEffect, useState } from "react";
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

  useEffect(()=>{
    
  })
  const filterResult = (catItem) => {
    const result = products.filter((curData) => {
      return curData.category === catItem;
    });
    setData(result)
  }

  const [toggle, setToggle] = useState(true)
  const [translate, setTranslate] = useState(-200)
  const toggleInput = () => {
    setToggle(!toggle)
    toggle === true ? setTranslate(0) : setTranslate(-200)

  }
  const handleChange = (e)=>{
    let value = e.target.value

    if(value === "low"){
      return data.sort((a,b) => (a.price>b.price)?1:-1)

    }else if(value ==="high"){
      return data.sort((a,b) => (b.price>a.price)?1:-1)

    }else{
      return data.sort((a,b) => (a.id>b.id)?1:-1)
    }


  }
  return (
    <>
      <main className="product-page">

        <div className="filter">
          <div className="position">

            <h3>Filter</h3>
            <hr></hr>
            <div className="filter-type">
              <h4>Category</h4>
              <div className="filter-buttons">
                <button className="category-button" onClick={() => setData(products)}>All Products</button>
                <button className="category-button" onClick={() => filterResult("electronics")}>electronics</button>
                <button className="category-button" onClick={() => filterResult("jewelery")}>jewelery</button>
                <button className="category-button" onClick={() => filterResult("men's clothing")}>men's clothing</button>
                <button className="category-button" onClick={() => filterResult("women's clothing")}>women's clothing</button>
              </div>
            </div>
            <div className="filter-type">
              <h4>Sort By</h4>
              <select className="sort-dropdown" onChange={handleChange}>
                <option value="relevance" >Relevance</option>
                <option value="high">Price(Highest first)</option>
                <option value="low">Price(Lowest first)</option>
                <option value="new" >What's New</option>
                <option value="discount" >Discount</option>
              </select>
            </div>
          </div>
        </div>
        <div className="toggle-media">
        <button onClick={toggleInput}>Filter</button>
        <button onClick={toggleInput}>SORT BY</button>
        <button onClick={toggleInput}>CATEGORY</button>
        </div>
        <div className="filter-media" style={{ transform: `translate3d(${translate}%,0px,0px)`, transitionDuration: "350ms" }}>
          <div className="position">
            <button className="close-btn" onClick={toggleInput}>X</button>
            <h3>Filter</h3>
            <hr></hr>
            <div className="filter-type">
              <h4>Category</h4>
              <div className="filter-buttons">
                <button className="category-button" onClick={() => setData(products)}>All Products</button>
                <button className="category-button" onClick={() => filterResult("electronics")}>electronics</button>
                <button className="category-button" onClick={() => filterResult("jewelery")}>jewelery</button>
                <button className="category-button" onClick={() => filterResult("men's clothing")}>men's clothing</button>
                <button className="category-button" onClick={() => filterResult("women's clothing")}>women's clothing</button>
              </div>
            </div>
          </div>
        </div>
        <div className="shirts">
          {data.map((values) => {
            const { id, title, price, image } = values;
            return (
                <div className="cards" key={id}>
                  <div className="card-container">
                    <Link to={`${id}/${title}`} className="image-container">
                      <img className="for-hover" src={image} alt="product"></img>
                      <p className="for-hover">{title.slice(0, 15)}</p>
                      <p>${price}</p>
                    </Link>
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
            );
          })}
        </div>
      </main>
    </>
  );
}
