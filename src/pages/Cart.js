import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import summaryApi from 'common';
import { useDispatch, useSelector } from 'react-redux';
import displayCurrency from 'helpers/displayCurrency';
import { MdDelete } from 'react-icons/md';
import fetchUserCartItem from 'helpers/fetchUserCartItemCount';
import { setCartItem } from 'store/slices/userCartItemCount';
import { toast } from 'react-toastify';
import { FaCartShopping } from "react-icons/fa6";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const cartItemCount = useSelector(store => store.cartItemCount);
  const loadingItem = new Array(cartItemCount).fill(null);
  const dispatch = useDispatch();

  const fetchData = async () => {
    const request = await fetch(summaryApi.allCartItem.url, {
      method: summaryApi.allCartItem.method,
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    })
    const response = await request.json();
    if (response.success) {
      setData(response.data);
    }
  }

  const increaseQty = async (id, qty) => {
    const request = await fetch(summaryApi.updateCartItem.url, {
      method: summaryApi.updateCartItem.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('token')
      },
      body: JSON.stringify({
        qty: qty + 1,
        cartId: id
      })
    })

    const response = await request.json();
    if (!response.error) {
      fetchData();
    }
  }
  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      const request = await fetch(summaryApi.updateCartItem.url, {
        method: summaryApi.updateCartItem.method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify({
          qty: qty - 1,
          cartId: id
        })
      })
      const response = await request.json();
      if (!response.error) {
        fetchData();
      }
    }
  }
  const deleteItem = async (id) => {
    const request = await fetch(summaryApi.deleteCartItem.url, {
      method: summaryApi.deleteCartItem.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('token')
      },
      body: JSON.stringify({
        cartId: id
      })
    })

    const response = await request.json();
    if (!response.error) {
      toast.success("Product deleted!")
      fetchData();
      const fetchCartItemCount = await fetchUserCartItem();
      if (!fetchCartItemCount.error) {
        dispatch(setCartItem(fetchCartItemCount.data));
      }
    }
  }

  const handleLoading = async () => {
    await fetchData();

  }
  useEffect(() => {
    window.scrollTo(0,0)
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, [])

  const TotalQTY = data.reduce((prevValue, currentValue) => prevValue + currentValue?.quantity, 0)
  const TotalPRICE = data.reduce((prevValue, currentValue) => prevValue + (currentValue?.quantity * currentValue?.productId?.sellingPrice), 0)
  return (
    <div className='container mx-auto p-4'>
      {data.length === 0 && !loading && (
        <>
          <div className='flex justify-center items-center flex-col gap-3 min-h-[calc(100vh-120px)] w-full bg-white'>
            <div className='w-16 h-16 md:w-20 md:h-20 border-2 border-red-600 text-red-600 flex justify-center items-center text-2xl md:text-3xl lg:text-4xl rounded-full'>
              <FaCartShopping />
            </div>
            <h2 className='text-xl text-center font-semibold uppercase'>Your Cart is Currently Empty!</h2>
            <p className='text-slate-400 text-sm'>Looks like you have not made your choice yet.</p>
            <Link to={'/'} className='px-3 py-1 bg-red-600 rounded-full text-white font-semibold hover:bg-red-700'>Shop Now</Link>
          </div>
        </>
      )}
      <div className='flex justify-between gap-4 lg:flex-row flex-col p-4 min-h-[calc(100vh-120px)]'>
        <div className='w-full max-w-3xl max-h-[calc(100vh-90px)] overflow-y-scroll noScrollbar'>
          {loading ? (
            loadingItem.map((el, index) => (
              <div key={"loading " + index} className='h-32 my-2 border border-slate-300 w-full bg-slate-200 animate-pulse'></div>
            ))
          ) : (
            data.map((product, index) => (
              
              <div key={product._id + index} className='h-fit sm:h-32 my-2 border border-slate-300 w-full bg-white grid grid-cols-1 sm:grid-cols-[128px,1fr] relative '>
                <Link to={'/product/'+product?.productId?._id} className='w-full sm:w-32 h-32 bg-slate-200'>
                  <img src={product?.productId?.productImage[0]} alt="" className='w-full h-full mix-blend-multiply object-scale-down' />
                </Link>

                {/* delete icon */}
                <button className='absolute top-2 right-2 p-2 text-red-600 text-2xl rounded-full hover:text-white hover:bg-red-600' onClick={() => deleteItem(product?._id)}>
                  <MdDelete />
                </button>
                <div className='px-2 py-1 md:px-4 md:py-'>
                  <Link to={'/product/'+product?.productId?._id} className='text-lg lg:text-xl line-clamp-1'>{product?.productId?.productName}</Link>
                  <p className='text-slate-500 capitalize'>{product?.productId?.category}</p>

                  <div className='flex flex-row md:flex-col md:justify-start justify-between md:items-start items-center w-full'>
                    <div className='flex justify-between md:items-center md:flex-row flex-col items-start w-full'>
                      <p className='text-red-600 font-medium text-lg'>{displayCurrency(product?.productId?.sellingPrice)}</p>
                      <p className='text-slate-500 font-semibold text-lg'>{displayCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                    </div>

                    <div className='flex items-center gap-2 mt-1'>
                      <button className='w-6 h-6 flex justify-center items-center border border-red-600 text-red-600 hover:text-white hover:bg-red-600 rounded' onClick={() => decreaseQty(product?._id, product?.quantity)}>-</button>
                      <p>{product?.quantity}</p>
                      <button className='w-6 h-6 flex justify-center items-center border border-red-600 text-red-600 hover:text-white hover:bg-red-600 rounded' onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Invoice */}
        {data.length !== 0 && (
          <div className='w-full max-w-sm'>
            {
              loading ? (
                <div className='mt-5 lg:mt-2 bg-slate-200 h-36 w-full animate-pulse rounded border border-slate-300'>

                </div>
              ) : (
                <div className='mt-5 lg:mt-2 bg-white h-36 w-full  rounded border border-slate-300'>
                  <h2 className='text-white bg-red-600 px-4 py-1 text-lg'>Total</h2>
                  <div className='flex justify-between items-center gap-2 px-4 py-1 font-medium text-lg text-slate-600'>
                    <p>Quantity : </p>
                    <p>{TotalQTY}</p>
                  </div>
                  <div className='flex justify-between items-center gap-2 px-4 py-1 font-medium text-lg text-slate-600'>
                    <p>Total Price : </p>
                    <p>{displayCurrency(TotalPRICE)}</p>
                  </div>
                  <button className='bg-blue-600 text-white p-2 w-full'>Checkout</button>
                </div>
              )
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart