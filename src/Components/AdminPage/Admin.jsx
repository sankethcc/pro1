import axios from 'axios'
import React, { useState } from 'react'

const Admin = () => {
    const [product, setProduct] = useState({
        title:'',
        brand:'',
        quantity:'',
        description:'',
        price:'',
        discount:'',
        category:'',
        rating:''
    })
    const [images, setImages]=useState()
    const imageInputRef = React.useRef()
    const [thumbnail, setThumbnail] = useState()
    const thumbnailInputRef = React.useRef()

    const handleInputChange = (e)=>{
        const {name, value} = e.target
        setProduct({...product, [name]:value})
    }
    const handleImageUpload = (e)=>{
        const name = e.target.name
        if(name === "images"){
            const fileList = []
            for(let i=0;i<e.target.files.length;i++){
                fileList.push(e.target.files[i])
            }
            setImages(fileList)
        }else if(name === "thumbnail"){
            setThumbnail(e.target.files[0])
        }

    }
    const addProduct =(e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('title',product.title)
        formData.append('description',product.description)
        formData.append('brand',product.brand)
        formData.append('quantity',product.quantity)
        formData.append('price',product.price)
        formData.append('discount_percentage',product.discount)
        formData.append('category',product.category)
        formData.append('thumbnail',thumbnail)

        for(let i=0;i<images.length;i++){
            formData.append(`image_${i}`, images[i])
        }
        axios.post('http://localhost:5000/add_product', formData)
        .then((response)=>{
            if(response.status===200){
                console.log(response.data)
                console.log("Product Added Successfully")
                setProduct({
                    title:'',
                    brand:'',
                    quantity:'',
                    description:'',
                    price:'',
                    discount:'',
                    category:'',
                    rating:''
                })
                imageInputRef.current.value = ""
                thumbnailInputRef.current.value = ""
            }else{
                console.log("error")
            }
        }).catch((e)=>{
            console.log("Error Occured", e)
        })
    }
  return (
       <div className='form-container'>
        <form className='product-form' onSubmit={addProduct}>
            <input required type='text' value={product.title} name='title' onChange={handleInputChange} placeholder='Title' />
            <input required type='text' value={product.brand} name='brand' onChange={handleInputChange} placeholder='Brand' />
            <input required type='number' value={product.quantity} name='quantity' onChange={handleInputChange} placeholder='Quantity' />
            <textarea required type='text' value={product.description} name='description' onChange={handleInputChange} placeholder='Enter Description' />
            <div className='product-amount'>
                <input required type='number' value={product.price} name='price' onChange={handleInputChange} placeholder='Price' />
                <input required type='number' value={product.discount} name='discount' onChange={handleInputChange} placeholder='Discount' />  
                <input required type='number' value={product.rating} name='rating' onChange={handleInputChange} placeholder='Rating' />  
                <input required type='text' value={product.category} name='category' onChange={handleInputChange} placeholder='Category' />  
            </div>
            <div>
                <label htmlFor='product-images' >Upload Images</label>
            <input required name='images' ref={imageInputRef} id='product-images' multiple type='file' accept='image/*' onChange={(e)=>handleImageUpload(e)} />
            <input required name='thumbnail' ref={thumbnailInputRef} type='file' accept='image/*' onChange={(e)=>handleImageUpload(e)} />
            </div>
            <button type='submit'>Add Product</button>
        </form>
       </div>

  )
}

export default Admin