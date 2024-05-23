import summaryApi from 'common'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()
  const handleInput = (e) => {
    setInput(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const handleSubmit = async(e) =>{
    e.preventDefault(); 
    const request = await fetch(summaryApi.forgotPassword.url,{
      method:summaryApi.forgotPassword.method,
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        email:input.email,
      })
    })
    const response = await request.json();
    if(response.msg){
      toast.success(response.msg);
      navigate('/reset-password')
    }else{
      toast.error(response.err);
    }
  }
  return (
    <section>
      <div className='container mx-auto p-4 min-h-[calc(100vh-60px)] flex justify-center items-center'>
        <div className='bg-white w-full p-5 py-5 max-w-sm rounded overflow-hidden'>
          <h2 className='text-center font-semibold text-md lg:text-xl'>Reset Your Password</h2>
          <div className='transition-all'>
            <p className='text-center text-base py-2'>Enter email to reset your password</p>
            <form className='pt-6 grid gap-4' onSubmit={handleSubmit}>
              <div className='grid gap-1'>
                <label htmlFor='email'>Email Address : </label>
                <div className='bg-slate-100 p-2'>
                  <input type="email" id='email' name="email" value={input.email} onChange={handleInput} placeholder='Enter Email' className='w-full h-full bg-transparent outline-none' />
                </div>
              </div>
              <button className='bg-red-600 text-white px-6 py-2 max-w-[150px] rounded hover:scale-110 transition-all ml-auto block font-medium '>next</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword