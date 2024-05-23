import React,{useState} from 'react'
import { IoMdClose } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import productCategory from 'helpers/productCategory';
import uploadImage from 'helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from 'react-icons/md';
import summaryApi from 'common';
import { toast } from 'react-toastify';

const AdminEditProduct = ({
  onClose,
  productData,
  fetchData,
}) => {
  
  const [data,setData] = useState({
    _id:productData?._id,
    productName:productData?.productName,
    brandName:productData?.brandName,
    category:productData?.category,
    productImage:productData?.productImage,
    description:productData?.description,
    price:productData?.price,
    sellingPrice:productData?.sellingPrice,
})
const [openFullScreenImage,setOpenFullScreenImage] = useState(false);
const [fullScreenImage,setFullScreenImage] = useState('');

const handleInput = (e)=>{
    const {name,value} = e.target;
    setData(prev =>({
        ...prev,
        [name]: value,
    }))
}
const handleUploadProductImage = async(e) =>{
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setData(prev => ({
        ...prev,
        productImage : [...prev.productImage, uploadImageCloudinary.url]
    }))
}
const handleDeleteImage = async(index) =>{
    const newProductImage = await [...data.productImage];
    newProductImage.splice(index,1);
    setData(prev => ({
        ...prev,
        productImage : [...newProductImage]
    }))
}

// Upload Product - Submit Product
const handleSubmit = async(e) =>{
    e.preventDefault();
    const updateApi = await fetch(summaryApi.updateProduct.url,{
        method:summaryApi.updateProduct.method,
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem('token'),
        },
        body:JSON.stringify(data)
    });
    const dataResponse = await updateApi.json();
    if(!dataResponse.err){
            toast.success(dataResponse.msg);
            onClose();
            fetchData();
    }else{
        toast.error(dataResponse.err);
    }
}

  return (
    <div className="fixed top-0 left-0 z-20  h-full w-full flex justify-center items-center bg-slate-100 bg-opacity-80">
        <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
            <div className="flex justify-between items-center pb-3">
                <h2 className="font-bold text-lg">Update Product</h2>
                <button className="hover:text-red-500 text-2xl" onClick={onClose}>
                    <IoMdClose/>
                </button>
            </div>
            <form className="grid gap-1 productForm p-4 pb-6 h-full overflow-y-scroll" onSubmit={handleSubmit}>
                <label htmlFor="productName">Product Name : </label>
                <input type="text" id="productName" value={data.productName} name="productName" placeholder="Enter Product Name" onChange={handleInput} />
                
                <label htmlFor="brandName" className="mt-3">Brand Name : </label>
                <input type="text" id="brandName" value={data.brandName} name="brandName" placeholder="Enter Product Brand" onChange={handleInput} />
                
                <label htmlFor="category" className="mt-3">Category : </label>
                <select value={data.category} name='category' id='category' onChange={handleInput}>
                <option value={''}>Select Category</option>

                    {
                        productCategory?.map((el,index) =>(
                            <option key={el.label + index} value={el.value}>{el.label}</option>
                        ))
                    }
                </select>

                <label htmlFor="productImage" className="mt-3">Product Image : </label>
                <label id='productImageInput'  className='bg-slate-100 w-full h-32 rounded flex flex-col justify-center items-center cursor-pointer'>
                    <span className='text-4xl text-slate-500'><FaCloudUploadAlt/></span>
                    <p className='text-sm text-slate-500'>Upload Product Image</p>
                    <input type="file" id='productImageInput' className='hidden' onChange={handleUploadProductImage} />
                </label>
                <div className='flex gap-1 items-center'>
                    {
                        data?.productImage?.length > 0 ? (
                            data.productImage.map((el,index) =>(
                                <div key={index} className='relative group'>
                                    <img title='Open Full Screen'  src={el} alt="" width={80} height={80} className='bg-slate-100 cursor-pointe' onClick={()=>{
                                    setOpenFullScreenImage(true);
                                    setFullScreenImage(el);
                                }} />
                                <span className='hidden group-hover:block absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full cursor-pointer' onClick={()=>handleDeleteImage(index)}><MdDelete/></span>
                                </div>
                            ))
                        ) : (
                            <p className='text-red-600 text-sm'>*Please upload product Image</p>
                        )
                    }
                </div>

                <label htmlFor="price" className="mt-3">Price (₹) : </label>
                <input type="number" id='price' name='price' value={data.price} onChange={handleInput} placeholder='Enter Product Price' />  

                <label htmlFor="sellingPrice" className="mt-3">Selling Price (₹) : </label>
                <input type="number" id='sellingPrice' name='sellingPrice' value={data.sellingPrice} onChange={handleInput} placeholder='Enter Selling Price' />

                <label htmlFor="description" className="mt-3">Description : </label>
                <textarea rows={5}  id='sellingPrice' name='description' value={data.description} onChange={handleInput} placeholder='Enter description' className='h-32 resize-none' ></textarea>

                <button className='bg-red-500 my-2 py-2 text-white font-medium mb-8 hover:bg-red-700'>Update Product</button>
            </form>
        </div>

        {/* Full Screen Image */}
        {openFullScreenImage && (
            <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
        )}
    </div>
  )
}

export default AdminEditProduct