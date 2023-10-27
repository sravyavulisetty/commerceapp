"use client"
import React,{useEffect, useState} from 'react';
import MainLayout from '@/components/MainLayout';
import { useParams } from 'next/navigation';
import axios from 'axios';
import ProductForm from '@/components/ProductForm';
function page(){
  const [productInfo, setproductInfo] = useState(null);
    const params = useParams();
    const {id} = params;
    useEffect(()=>{
        if(!id){
          return;
        }
        axios.get(`/api/products/${id}`).then(response =>{
            setproductInfo(response.data);
        })
    },[]);
    return (
    <MainLayout>
      <h1 className='text-blue-900 mb-2 text-xl'>Edit Product</h1>
      {productInfo && (
      <ProductForm {...productInfo}/>
      )}
    </MainLayout>
  )
}

export default page