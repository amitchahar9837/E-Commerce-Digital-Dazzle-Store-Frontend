import summaryApi from 'common';
import React from 'react'
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-toastify';
const DeleteProduct = ({
      productId,
      onClose,
      fetchData,
}) => {

      const handleDeleteProduct = async ()=>{
            const request = await  fetch(summaryApi.deleteProduct.url,{
                  method:summaryApi.deleteProduct.method,
                  headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                  },
                  body:JSON.stringify({
                        productId
                  })
            })
            const response = await request.json();

            if(!response.err){
                  toast.success('Product Deleted');
                  onClose();
                  fetchData();
            }else{
                  toast.error(response.err);
            }
      }
  return (
      <div className='fixed top-0 left-0 z-20 bg-slate-100 bg-opacity-75 flex justify-center items-center w-full min-h-[100vh]'>
      <div className='w-full min-w-sm max-w-sm bg-white p-4'>
          <div className="flex justify-between items-center pb-3">
              <h2 className="font-bold text-lg">Delete Product</h2>
              <button className="hover:text-red-500 text-2xl" onClick={onClose}>
                  <IoMdClose />
              </button>
          </div>
          <h1 className='text-lg font-medium my-4'>Are you sure to delete product?</h1>
          <button className='w-fit ml-auto block p-2 bg-red-100 hover:bg-red-600 rounded hover:text-white' onClick={handleDeleteProduct} >Delete</button>
      </div>
  </div>
  )
}

export default DeleteProduct