import summaryApi from 'common';
import AdminProductCard from 'components/AdminProductCard';
import UploadProduct from 'components/UploadProduct'
import React, { useEffect, useState } from 'react'

const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct] = useState(false);
  const [allProducts,setAllProducts] = useState([]);

  const fetchAllProduct = async()=>{
    const productApi = await fetch(summaryApi.allProduct.url);
    const response = await productApi.json();
    setAllProducts(response?.data || []);
  }
  
  useEffect(()=>{
    fetchAllProduct();
  },[])
  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products : {allProducts?.length}</h2>
        <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white py-1 px-3 rounded-full duration-300 transition-all ' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
      </div>
      
      {/* All Products */}
      <div className='flex items-center justify-center lg:justify-start gap-4 py-4 flex-wrap h-[calc(100vh-150px)] overflow-y-scroll noScrollbar'>
        {
          allProducts?.map((product,index) =>(
            <AdminProductCard data={product} key={index+"AllProduct"} fetchData={fetchAllProduct}/>
            
          ))
        }
      </div>

      {/* Upload Product modal */}
      {
        openUploadProduct && (
          <UploadProduct onClose = {()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
        )
      }
    </div>
  )
}

export default AllProducts