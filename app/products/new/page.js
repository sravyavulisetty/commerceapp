"use client"
import MainLayout from "@/components/MainLayout";
import ProductForm from "@/components/ProductForm";

function page() {
    return (
        <MainLayout>
            <h1 className='text-blue-900 mb-2 text-xl'>New Product</h1>
            <ProductForm />
        </MainLayout>
    )
  
}

export default page;
