import summaryApi from 'common';
import SearchedProductCard from 'components/SearchedProductCard';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const SearchProduct = () => {
    const query = useLocation();
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const fetchProduct = async () =>{
        setLoading(true)
        const request = await fetch(summaryApi.searchProduct.url + query.search);
        const response = await request.json();
        setLoading(false);
        setData(response.data)
      }
    useEffect(()=>{
        fetchProduct();
    },[query])
    useEffect(()=>{
      window.scrollTo(0,0)
    },[])
  return (
    <div className='container mx-auto p-4 min-h-[calc(100vh-120px)]'>
      {
        loading && (
          <h2 className='text-center text-lg'>Loading...</h2>
        )
      }
      <p className='font-medium text-lg my-2'>Search Results : {data.length}</p>
      {
        data.length === 0 && !loading && (
          <h2 className='text-center bg-white text-lg p-4 my-4'>No Data Found...</h2>
        )
      }
      {
        data.length !==0 && !loading &&(
          <SearchedProductCard loading={loading} data={data}/>
        )
      }
    </div>
  )
}

export default SearchProduct