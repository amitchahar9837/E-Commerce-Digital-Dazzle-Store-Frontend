import React from 'react'
import { IoMdClose } from 'react-icons/io'

const DisplayImage = ({
    imgUrl,
    onClose,
}) => {
    return (
        <div className='fixed top-0 left-0 bottom-0 z-30 right-0 bg-slate-200 bg-opacity-70 flex justify-center items-center'>
            <div className='bg-white shadow-lg rounded p-4 max-w-5xl  relative '>

                <div className='flex justify-center items-center p-4 h-[70vh] max-h-[70vh] max-w-[70vh]'>
                    <img src={imgUrl} alt="" className='w-full h-full object-scale-down' />
                </div>

                <button className="hover:text-red-500 text-2xl absolute top-2 right-2 " onClick={onClose}>
                    <IoMdClose title='close' />
                </button>

            </div>
        </div>
    )
}

export default DisplayImage