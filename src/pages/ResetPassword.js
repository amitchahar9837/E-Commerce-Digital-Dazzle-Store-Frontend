import summaryApi from 'common'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ResetPassword = () => {
      const [input, setInput] = useState({
            token: '',
            password: '',
            tokenPassword: '',
      })

      const navigate = useNavigate()
      const handleInput = (e) => {
            setInput(prev => ({
                  ...prev,
                  [e.target.name]: e.target.value
            }))
      }
      const resetRequest = async()=>{
            const request = await fetch(summaryApi.resetPassword.url, {
                  method: summaryApi.resetPassword.method,
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        token:input.token,
                        password:input.password,
                  })
            })
            const response = await request.json();
            if (response.msg) {
                  toast.success(response.msg);
                  navigate('/login')
            } else {
                  toast.error(response.err);
            }
      }
      const handleSubmit = async (e) => {
            e.preventDefault();
            if(input.password === input.confirmPassword){
                  resetRequest();
            }else{
                  toast.error("Check you password!");
            }
      }
      return (
            <section>
                  <div className='container mx-auto p-4 min-h-[calc(100vh-60px)] flex justify-center items-center'>
                        <div className='bg-white w-full p-5 py-5 max-w-sm rounded overflow-hidden'>
                              <h2 className='text-center font-semibold text-md lg:text-xl'>Reset Your Password</h2>
                              <div className='transition-all'>
                                    <p className='text-center text-base py-2'>Enter token and password to reset your password</p>
                                    <form className='pt-6 grid gap-4' onSubmit={handleSubmit}>
                                          <div className='grid gap-1'>
                                                <label htmlFor='token'>Token : </label>
                                                <div className='bg-slate-100 p-2'>
                                                      <input type="text" id='token' name="token" value={input.token} onChange={handleInput} placeholder='Enter token' className='w-full h-full bg-transparent outline-none' />
                                                </div>
                                          </div>
                                          <div className='grid gap-1'>
                                                <label htmlFor='password'>Password : </label>
                                                <div className='bg-slate-100 p-2'>
                                                      <input type="password" id='password' name="password" value={input.password} onChange={handleInput} placeholder='Enter password' className='w-full h-full bg-transparent outline-none' />
                                                </div>
                                          </div>
                                          <div className='grid gap-1'>
                                                <label htmlFor='confirm password'>Confirm Password : </label>
                                                <div className='bg-slate-100 p-2'>
                                                      <input type="password" id='confirm password' name="confirmPassword" value={input.confirmPassword} onChange={handleInput} placeholder='Enter Confirm Password' className='w-full h-full bg-transparent outline-none' />
                                                </div>
                                          </div>
                                          
                                          <div className='w-full flex justify-between items-center'>
                                                <Link to={'/forgotpassword'} className='bg-slate-400 text-white px-6 py-2  rounded hover:scale-110 transition-all block font-medium '>Back</Link>
                                                <button className='bg-red-600 text-white px-6 py-2 rounded hover:scale-110 transition-all block font-medium '>Reset Password</button>
                                          </div>
                                    </form>
                              </div>
                        </div>
                  </div>
            </section>
      )
}

export default ResetPassword