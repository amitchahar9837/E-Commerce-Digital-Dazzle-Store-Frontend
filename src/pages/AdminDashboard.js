import summaryApi from 'common';
import React, { useEffect, useState } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  
  const [totalProduct,setTotalProduct] = useState(0);
  const [totalUser,setTotalUser] = useState(0);

  const fetchTotalProduct = async () =>{
    const request  = await fetch(summaryApi.totalProduct.url,{
      method:summaryApi.totalProduct.method,
      headers:{
        'Authorization' : 'Bearer '+localStorage.getItem('token')
      }
    })
    const response = await request.json();
    setTotalProduct(response.data);
  }
  const fetchTotalUser = async () =>{
    const request  = await fetch(summaryApi.totalUser.url,{
      method:summaryApi.totalUser.method,
      headers:{
        'Authorization' : 'Bearer '+localStorage.getItem('token')
      }
    })
    const response = await request.json();
    setTotalUser(response.data);
  }
  useEffect(()=>{
    fetchTotalUser();
    fetchTotalProduct();
  },[]) 

  return (
    <div className='w-full min-h-[calc(100vh-90px)] px-2'>
      <h2 className='font-medium text-2xl pb-5'>Dashboard</h2>
      <div className='flex gap-4 flex-wrap'>
        <div className='w-80 h-36 bg-blue-400 rounded'>
          <div className='flex justify-between items-center px-2 py-4'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-4xl font-semibold text-white'>{totalUser}</h1>
              <h3 className='text-md font-medium text-white'>Total Users</h3>
            </div>
            <div className='text-6xl text-gray-100 text-opacity-60'>
              <FaUserCog/>
            </div>
          </div>
          <Link to={'/admin-panel/all-users'} className='inline-block p-2 w-full bg-blue-500 text-white'>More Info</Link>
 
        </div>
        <div className='w-80 h-36 bg-green-400 rounded'>
          <div className='flex justify-between items-center px-2 py-4'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-4xl font-semibold text-white'>1</h1>
              <h3 className='text-md font-medium text-white'>Total Orders</h3>
            </div>
            <div className='text-6xl text-gray-100 text-opacity-60'>
              <FaShoppingCart/>
            </div>

          </div>
          <Link to={'/admin-panel/all-users'} className='inline-block p-2 w-full bg-green-500 text-white'>More Info</Link>

        </div>
        <div className='w-80 h-36 bg-yellow-400 rounded'>
          <div className='flex justify-between items-center px-2 py-4'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-4xl font-semibold text-white'>{totalProduct}</h1>
              <h3 className='text-md font-medium text-white'>Total Products</h3>
            </div>
            <div className='text-6xl text-gray-100 text-opacity-60'>
              <MdOutlineShoppingBag/>
            </div>

          </div>
          <Link to={'/admin-panel/all-products'} className='inline-block p-2 w-full bg-yellow-500 text-white'>More Info</Link>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard