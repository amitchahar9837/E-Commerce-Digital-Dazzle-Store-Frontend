import React, { useEffect, useState } from 'react'
import loginIcon from 'assets/signin.gif'
import { Link, useNavigate } from 'react-router-dom'
import summaryApi from 'common'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setUserDetails } from 'store/slices/userSlice'
import fetchUserCartItem from 'helpers/fetchUserCartItemCount'
import { setCartItem } from 'store/slices/userCartItemCount'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputs,setInputs] = useState({
        email:'',
        password:'',
    })

    const handleInput = (e)=>{
        setInputs(prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const handleUpload = async(e) =>{
        e.preventDefault();
        const dataRes = await fetch(summaryApi.signin.url,{
            method:summaryApi.signin.method,
            headers:{
                'Content-Type' : "Application/json"
            },
            body:JSON.stringify(inputs)
        })

        const response = await dataRes.json();
        if(response.msg){
            toast.success(response.msg)
            dispatch(setUserDetails(response.user));
            localStorage.setItem("user",JSON.stringify(response.user));
            localStorage.setItem("token",response.token);
            cartItemCount();
            navigate('/');
        }else{
            toast.error(response.err);
        }
    }

    const cartItemCount = async () =>{
        const fetchCartItemCount = await fetchUserCartItem();
        if(!fetchCartItemCount.error){
          dispatch(setCartItem(fetchCartItemCount.data));
        }
      }

      useEffect(()=>{
        window.scrollTo(0,0)
      },[])
    return (
        <section>
            <div className='container mx-auto p-4 min-h-[calc(100vh-100px)] flex justify-center items-center'>
                <div className='bg-white w-full p-5 py-5 max-w-sm rounded'>

                    <div className='w-20 h-20 mx-auto rounded-full overflow-hidden'>
                        <img src={loginIcon} alt="Login Icon" />
                    </div>

                    <form className='pt-6 grid gap-4' onSubmit={handleUpload}>

                        <div className='grid'>
                            <label>Email : </label>
                            <div className='bg-slate-100 p-2'>
                                <input name='email' value={inputs.email} onChange={handleInput} type="email" placeholder='Enter Email' className='w-full h-full bg-transparent outline-none' />

                            </div>
                        </div>

                        <div className='grid'>
                            <label>Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input name='password' value={inputs.password} onChange={handleInput} type='password' placeholder='Enter Password' className='w-full h-full bg-transparent outline-none' />
                            </div>
                        </div>

                        <Link to={'/forgotpassword'} className='block w-fit ml-auto text-red-600 hover:underline hover:text-red-700'> forgotten password?</Link>
                        <p className='block w-fit ml-auto'>Don't have an account? <Link to={'/signup'} className='text-red-600 hover:text-red-700 hover:underline'>signup</Link></p>
                        <button className='bg-red-600 text-white px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block '>Login</button>

                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login