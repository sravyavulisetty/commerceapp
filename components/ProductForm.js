"use client"
import React, { useState } from 'react'
import { redirect } from 'next/navigation';

function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription, 
    price: existingPrice}) {
    const [title, setTitle] = useState(existingTitle || "");
    const [description, setDescription] =useState(existingDescription || "");
    const [price, setPrice] = useState(existingPrice || 0);
    const [gotoProducts, setgotoProducts] = useState(false);
    async function createProduct(e){
        e.preventDefault();
        if(_id){
            const data={title, description, price};
            await fetch("/api/products",{
                method: "PUT",
                body: JSON.stringify({...data, _id})
            })
            .then(res=> res.json())
            .then(data => console.log(data))

        }
        else{
            await fetch("/api/products",{
                method:"POST",
                body: JSON.stringify({title, description, price})
            })
            .then(res => res.json())
            .then(data=>console.log(data))
    }
    setgotoProducts(true);
    }
    if(gotoProducts){
        redirect('/products');
    }
   
  return (
        <form onSubmit={createProduct}>
        <label htmlFor='productname'>Product name</label>
        <input type='text' id="productname" placeholder='product name' value = {title} onChange={(e) => setTitle(e.target.value)}>
        </input>
        <label htmlFor='description'>Description</label>
        <input type="text" placeholder='description' id="description" value={description} onChange={(e) => setDescription(e.target.value)}></input>
        <label htmlFor='price'>Price (in USD)</label>
        <input type='number' placeholder="price" id='price' value={price} onChange={(e) => setPrice(e.target.value)}></input>
        <button className='btn-primary'>Save</button>
        </form>
  )
}

export default ProductForm;
