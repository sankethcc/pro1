
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

export default function Products(props) {
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  // select=title,price,stock,thumbnail,description,description,discountPercentage,rating,brand,images,category
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get("https://dummyjson.com/products?limit=0&skip=0&select=title,price,thumbnail,category,discountPercentage");

      setProducts(data.products);
      setData(data.products)
      setIsLoading(false)

    };
    fetchProduct();
    const fetchCategory = async () => {
      const { data } = await axios.get("https://dummyjson.com/products/categories");

      setCategories(data);

    };
    fetchCategory();
  }, []);

  const filterResult = (catItem) => {
    const result = products.filter((curData) => {
      return curData.category === catItem;
    });
    setData(result)
  }

  const [toggle, setToggle] = useState(true)
  const [translate, setTranslate] = useState(200)
  const toggleInput = () => {
    setToggle(!toggle)
    toggle === true ? setTranslate(0) : setTranslate(200)

  }
  const [toggleSort, setToggleSort] = useState(true)
  const [translateSort, setTranslateSort] = useState(200)
  const toggleInputsort = () => {
    setToggleSort(!toggleSort)
    toggleSort === true ? setTranslateSort(0) : setTranslateSort(200)

  }


  const handleInputSort = (value, data) => {
    let result;
    if (value === "low") {
      result = data.sort((a, b) => {
        return a.price - b.price
      });
    } else if (value === "high") {
      result = data.sort((a, b) => {
        return (b.price > a.price ? 1 : -1)
      })
    } else if (value === "relevance") {
      result = data.sort((a, b) => {
        return (a.id > b.id ? 1 : -1)
      })
    } else if (value === "a-z") {
      result = data.sort((a, b) => {
        return (a.title.slice(0, 1) > b.title.slice(0, 1) ? 1 : -1)
      })
    } else if (value === 'discount') {
      result = data.sort((a, b) => {
        return (a.discountPercentage > b.discountPercentage ? 1 : -1)
      })
    }

    else {
      result = data.sort((a, b) => {
        return (b.title.slice(0, 1) > a.title.slice(0, 1) ? 1 : -1)
      })
      setData(result)
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
              {isLoading === true ? <LoadingSpinner /> :
                <div className="filter-buttons">
                  <button className="category-button" onClick={() => setData(products)}>All Products</button>
                  {categories.map((category, index) =>
                    <button key={index} className="category-button" onClick={() => filterResult(`${category}`)}>{category}</button>
                  )}
                </div>
              }

            </div>
            <div className="filter-type">
              <h4>Sort By</h4>
              <div className="sort-dropdown">
                <button className="sort-btn" onClick={() => { handleInputSort("relevance", data); toggleInput() }}  >Relevance</button>
                <button className="sort-btn" onClick={() => { handleInputSort("high", data); toggleInput() }}>Price(Highest first)</button>
                <button className="sort-btn" onClick={() => { handleInputSort("low", data); toggleInput() }}>Price(Lowest first)</button>
                <button className="sort-btn" onClick={() => { handleInputSort("a-z", data); toggleInput() }} >Sort(A-Z)</button>
                <button className="sort-btn" onClick={() => { handleInputSort("z-a", data); toggleInput() }} >Sort(Z-A)</button>
                <button className="sort-btn" onClick={() => { handleInputSort("discount", data); toggleInput() }} >Discount</button>
              </div>
            </div>
          </div>
        </div>
        <div className="toggle-media">
          <button onClick={() => toggleInput("filter")}>Filter</button>
          <button onClick={() => toggleInputsort("sort")}>SORT BY</button>
          <button onClick={() => toggleInput("")}>CATEGORY</button>
        </div>
        <div className="filter-media" style={{ transform: `translate3d(0px,${translate}%,0px)`, transitionDuration: "350ms" }}>
          <div className="position">
            <button className="close-btn" onClick={toggleInput}>X</button>
            <h3>Filter</h3>
            <hr></hr>
            <div className="filter-type">
              <h4>Category</h4>
              <div className="filter-buttons">
                <button className="category-button" onClick={() => {
                  setData(products)
                  toggleInput()
                }}>All Products</button>
                {categories.map((category, index) =>
                  <button key={index} className="category-button" onClick={() => {
                    filterResult(`${category}`)
                    toggleInput()

                  }}>{category}</button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="filter-media" style={{ transform: `translate3d(0px,${translateSort}%,0px)`, transitionDuration: "350ms" }}>
          <div className="position">
            <button className="close-btn" onClick={toggleInputsort}>X</button>
            <h3>Filter</h3>
            <hr></hr>
            <div className="filter-type">
              <h4>Sort By</h4>
              <div className="sort-dropdown">
                <button className="sort-btn" onClick={() => { handleInputSort("relevance", data); toggleInputsort() }}  >Relevance</button>
                <button className="sort-btn" onClick={() => { handleInputSort("high", data); toggleInputsort() }}>Price(Highest first)</button>
                <button className="sort-btn" onClick={() => { handleInputSort("low", data); toggleInputsort() }}>Price(Lowest first)</button>
                <button className="sort-btn" onClick={() => { handleInputSort("a-z", data); toggleInputsort() }} >Sort(A-Z)</button>
                <button className="sort-btn" onClick={() => { handleInputSort("z-a", data); toggleInputsort() }} >Sort(Z-A)</button>
                <button className="sort-btn" onClick={() => { handleInputSort("discount", data); toggleInputsort() }} >Discount</button>
              </div>
            </div>
          </div>
        </div>

        {isLoading === true ? <LoadingSpinner /> :
          <div className="shirts">

            {data.map((values) => {
              const { id, title, price, thumbnail, discountPercentage } = values;
              let quantity = 1
              const discountRate = price - price * (Math.floor(discountPercentage) / 100);
              return (

                <div className="cards" key={id} >
                  <div className="pro-card ">
                    <span className="category">{<span> ({Math.floor(discountPercentage)}% off)</span>}</span>
                    <Link
                      to={`${id}/${title}`}
                      className="thumbnail-container"
                    >
                      <div className="home-thumb-cat for-hover">
                        <img src={thumbnail} alt="product"></img>
                      </div>

                      <div className="pro-title">
                        <p style={{ textTransform: 'capitalize' }} className="for-hover">{title.slice(0, 15)}...</p>
                        <p style={{ textDecoration: "line-through" }}>${price}</p>
                        <p style={{ fontWeight: 'bold' }}>${Math.floor(discountRate)}</p>
                      </div>
                    </Link>
                    <div className="card-button">
                      <button >
                        <Link to="/login">Buy Now</Link>
                      </button>
                      <button onClick={() => {
                        props.cart(values, 1)
                        props.toggleCart()

                      }}>
                        <Link to="">Add Cart</Link>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        }

      </main>
    </>
  );
}
