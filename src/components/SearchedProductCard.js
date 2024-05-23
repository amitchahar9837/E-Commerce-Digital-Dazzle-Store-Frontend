import addToCart from 'helpers/addTocart';
import displayCurrency from 'helpers/displayCurrency';
import fetchUserCartItem from 'helpers/fetchUserCartItemCount';
import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCartItem } from 'store/slices/userCartItemCount';
const SearchedProductCard = ({loading, data =[]}) => {
    const loadingList = new Array(13).fill(null);
    const dispatch = useDispatch();
   
    const handleAddToCart = async (e,id) =>{
        await addToCart(e,id);
        const fetchCartItemCount = await fetchUserCartItem();
        if(!fetchCartItemCount.err){
          dispatch(setCartItem(fetchCartItemCount.data));
        }
      }

  return (
    <div className='flex items-center justify-center lg:justify-start gap-4 md:gap-6 flex-wrap noScrollbar transition-all'>
        {
          loading ? (
            <>
              {
                loadingList?.map((product, index) => (
                  <div key={"loading" + index} className='min-w-[280px] bg-white rounded-sm shadow'>
                    <div className='bg-slate-200 h-44 w-full py-1 animate-pulse'>

                    </div>

                    <div className='p-4 grid gap-3 w-full'>
                      <h2 className='w-full bg-slate-200 py-3 animate-pulse'></h2>
                      <p className='w-full bg-slate-200 py-3 animate-pulse'></p>
                      <div className='flex gap-2 md:gap-3'>
                        <p className='w-full bg-slate-200 py-3 animate-pulse'></p>
                        <p className='w-full bg-slate-200 py-3 animate-pulse'></p>
                      </div>
                      <button className=' px-3 py-3 w-full bg-slate-200 animate-pulse'></button>
                    </div>
                  </div>
                ))
              }
            </>
          ) : (
            <>
              {
                data?.map((product, index) => (
                  <Link to={'/product/' + product?._id} key={product._id + index} className='min-w-[280px] max-w-[280px] bg-white rounded-sm shadow'>
                    <div className='bg-slate-200 h-44 w-full flex justify-center items-center py-1'>
                      <img src={product.productImage[0]} alt="" className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                    </div>

                    <div className='p-4 grid gap-3'>
                      <h2 className='text-lg font-medium line-clamp-1 text-black'>{product.productName}</h2>
                      <p className='capitalize text-slate-500'>{product?.category}</p>
                      <div className='flex gap-2 md:gap-3'>
                        <p className='text-red-600 font-medium'>{displayCurrency(product?.sellingPrice)}</p>
                        <p className='text-slate-500 line-through'>{displayCurrency(product?.price)}</p>
                      </div>
                      <button className='bg-red-500 hover:bg-red-700 text-white px-3 py-1 text-sm rounded-sm w-full' onClick={(e)=>handleAddToCart(e,product._id)}>Add to cart</button>
                    </div>
                  </Link>
                ))
              }
            </>
          )
        }
      </div>
  )
}

export default SearchedProductCard