import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ProductsView = () => {
  const [products, setProducts] = useState([])
  useEffect(()=>{
    try{
      const fetchProducts = async ()=>{
        const {data} = await axios.get('http://localhost:5000/get_products')
        setProducts(data)
      }
      fetchProducts()
    }catch(error){
      console.log(error)
    }
  },[])
  return (
    <div className='products-section-admin'>
      <aside className='filters'>
        Filter
      </aside>
      <section className='product-container'>
          {products.map((product)=>{
            const{title, thumbnail, quantity, price, discount_percentage, description, brand, _id} = product
            return(
              <div key={_id} className='product-card'>
                  <div className='thumb_container'>
                    <img className='thumbnail' src={`http://localhost:5000/get_image/${thumbnail}`} />
                    <h3 className='product-title'> Name {title}</h3>
                  </div>
                  <div className='description'>
                    <p> Brand: {brand.toUpperCase()}</p>
                    <div className='price-qty-discount'>
                      <p>${price}</p>
                      <p>Stock:{quantity}</p>
                      <p>{discount_percentage}% off</p>
                    </div>
                    <p className='description'>Description: {description}</p>

                  </div>
              </div>
            )
          })}

      </section>
    </div>
  )
}

export default ProductsView