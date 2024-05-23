import summaryApi from 'common';
import Role from 'common/role'
import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    userId,
    name,
    email,
    role,
    onClose,
    invokeFunc,
}) => {
    const [userRole,setUserRole] = useState(role);
    const handleInput = (e) =>{
        setUserRole(e.target.value);
    }
    const handleUpdate = async() =>{
        const fetchApi = await fetch(summaryApi.updateUser.url,{
            method:summaryApi.updateUser.method,
            headers:{
                "Content-Type" : "application/json",
                "Authorization":"Bearer " + localStorage.getItem('token')
            },
            body:JSON.stringify({
                userId,
                role:userRole,
            }
            )
        })

        const response = await fetchApi.json();
        if(response.msg){
            toast.success(response.msg);
            onClose();
            invokeFunc();
        }else{
            toast.error(response.err);
        }
    }
    return (
    <div className='fixed top-0 left-0 flex justify-center items-center w-full h-full bg-slate-100 bg-opacity-85'>
        <div className='bg-white shadow-md p-4 w-full max-w-sm'>
            <button className='block ml-auto hover:text-red-500 text-xl' onClick={onClose}>
                <IoMdClose />
            </button>
            <h1 className='pb-4 font-medium text-lg'>Change user role</h1>  
            <p>Name : {name}</p>
            <p>Email : {email}</p>
            <div className='flex gap-2 items-center my-2'>
                <p>Role : </p>
                <select className='border px-2 py-1' onChange={handleInput} defaultValue={role}>
                {
                    Object.values(Role).map(el =>(
                        <option value={el} key={el}>{el}</option>
                    ))
                }
            </select>
            </div>
            <button onClick={handleUpdate} className='block mx-auto w-fit mt-4 px-3 py-1 rounded-full bg-red-400 hover:bg-red-500 text-white'>Update Role</button>
        </div>
    </div>
  )
}

export default ChangeUserRole