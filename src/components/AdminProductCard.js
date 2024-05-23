import React, { useState } from 'react'
import { MdModeEditOutline } from 'react-icons/md'
import AdminEditProduct from './AdminEditProduct';
import displayCurrency from 'helpers/displayCurrency';
import { MdDelete } from 'react-icons/md';
import DeleteProduct from './DeleteProduct';


const AdminProductCard = ({
    data,
    fetchData,
}) => {
    const [editProduct, setEditProduct] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState(false);
    const [productId,setProductId] = useState(null);
    return (
        <div className='bg-white p-4 rounded relative'>
            <div className='w-40'>
                <div className='w-full h-32 flex justify-center items-center '>
                    <img src={data.productImage[0]} alt="" className=' object-fill h-full' />
                </div>
                <h1 className='w-full text-ellipsis line-clamp-1'>{data.productName}</h1>

                <div>
                    <p className='font-semibold'>
                        {displayCurrency(data.sellingPrice)}
                    </p>
                    <div className='flex items-center justify-between my-1'>
                        <button
                            title='Delete Product'
                            className='w-fit block p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white'
                            onClick={() =>{
                                setDeleteProduct(true)
                                setProductId(data._id)
                            }}
                        >
                            <MdDelete />
                        </button>
                        <button
                            title='Update Product'
                            className='w-fit block p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white'
                            onClick={() => setEditProduct(true)}
                        >
                            <MdModeEditOutline />
                        </button>
                    </div>
                </div>
            </div>

            {editProduct && (
                <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchData={fetchData} />
            )}

            {
                deleteProduct && (
                    <DeleteProduct onClose={()=>{
                        setDeleteProduct(false)
                        setProductId(null)
                    }} productId={productId} fetchData={fetchData}/>
                )
            }
        </div>
    )
}

export default AdminProductCard