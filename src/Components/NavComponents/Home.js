import slide1 from "../../assets/slide1.png";
import slide2 from "../../assets/slide2.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import NavigationBar2 from "../NagivationBar2";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../Footer";
import Card from '../Card'

import LoadingSpinner from '../LoadingSpinner'


export default function Home(props) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get("https://dummyjson.com/products?limit=20&skip=30&select=title,price,thumbnail,category,discountPercentage,description");

      setProducts(data.products);
    };
    fetchProduct();
    setIsLoading(false)

  }, []);





  return (
    <>

      <div className="home">
        <div>
          <NavigationBar2 />
          <div className="carousel-cat">
            <Carousel
              showStatus={false} autoPlay={true} infiniteLoop={true} interval={2000} showThumbs={false}
            >
              <div >
                <img src={slide1} alt="Bluetooth Speaker"></img>
              </div>
              <div >
                <img src={slide2} alt="Mobile Phones"></img>
              </div>
            </Carousel>

          </div>
          {isLoading === true ? <LoadingSpinner /> :
            <div className="sanketkumar">
              <h1 className="our-pro-heading">SEE OUR PRODUCTS</h1>

              <div className="cards-container">
                {products.map((values,i) => {
                  const data = values;
                  return (
                    <div key={i}>
                      <Card data={data} cart={props.cart} toggle = {props.toggleCart} />

                    </div>
                  )
                })}
              </div>
            </div>
          }

        </div>
      </div>
      <Footer />
    </>
  );
}
