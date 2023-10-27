"use client"
import MainLayout from '@/components/MainLayout';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiEdit } from "react-icons/fi";
import "@/app/globals.css";

function products() {
  const [products, setProducts] = useState([]);
  useEffect(()=>{
    axios.get('/api/products').then(response =>
      setProducts(response.data)
    )
  },[]);
  return (
    <MainLayout>
        <Link href={"/products/new"}>
            <button className='btn-primary'>Add new product</button>
        </Link>
        <table className='basic mt-2'>
          <thead>
            <tr>
              <td>Product Name</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product.title}</td>
                <td>
                  <Link href={'/products/edit/'+product._id}>
                  <div className='flex flex-row items-center gap-2 bg-blue-900 text-white rounded p-2 w-fit'><FiEdit/><span>Edit</span></div>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </MainLayout>
    
  )
}

export default products;