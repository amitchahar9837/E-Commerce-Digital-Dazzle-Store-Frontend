import summaryApi from 'common';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const categoryLoading = new Array(12).fill(null)
    const fetchCategoryProduct = async () => {
        setLoading(true)
        const fetchApi = await fetch(summaryApi.categoryProduct.url);
        const dataResponse = await fetchApi.json();
        setLoading(false);
        setCategoryProduct(dataResponse.data);
    }
    useEffect(() => {
        fetchCategoryProduct();
    }, [])
    return (
        <div className='container mx-auto p-4'>
            <div className='flex items-center justify-between gap-4 overflow-scroll noScrollbar'>
                {
                    loading ? (
                        categoryLoading.map((el,index) =>(
                            <div className='min-w-16 min-h-16 max-w-16 max-h-16 md:min-w-20 md:max-w-20 md:max-h-20 md:min-h-20 rounded-full bg-slate-200 animate-pulse' key={"category "+ index}></div>
                        ))
                    ) : (
                        <>
                        {
                            categoryProduct?.map((product, index) => (
                                <Link to={'/product-category?category='+product?.category} key={product._id + index}>
                                    <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 p-4 flex justify-center items-center'>
                                        <img src={product?.productImage[0]} alt={product.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all duration-200' />
                                    </div>
                                    <p className='text-sm md:text-base text-center capitalize'>{product?.category}</p>
                                </Link>
                            ))
                        }
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default CategoryList