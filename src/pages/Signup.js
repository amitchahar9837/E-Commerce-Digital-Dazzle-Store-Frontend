import React, { useState } from 'react'
import loginIcon from 'assets/signin.gif'
import { Link, useNavigate } from 'react-router-dom'
import summaryApi from 'common'
import { toast } from 'react-toastify'
import uploadImage from 'helpers/uploadImage'


const Signup = () => {
  const navigate = useNavigate();
  const [inputs,setInputs] = useState({
    name:'',
    email:'',
    password:'',
    confirmpassword:'',
    profilePic:'',
})

const handleInput = (e)=>{
    setInputs(prev => ({
        ...prev,
        [e.target.name] : e.target.value
    }))
}

const handleUploadPic = async (e) =>{
  const file = e.target.files[0];

  const imagePic =await  uploadImage(file);

  setInputs(prev =>({
    ...prev,
    profilePic: imagePic.url,
  }))
}

const handleSubmit = async(e) =>{
  e.preventDefault();
  
  if(inputs.password === inputs.confirmpassword){
    signupApi();
  } else{
    toast.error("Check password and confirm password")
  }
}

const signupApi = ()=>{
  fetch(summaryApi.signup.url,{
    method:summaryApi.signup.method,
    headers:{
      'Content-Type' : 'Application/json',
    },
    body: JSON.stringify(inputs)
  }).then(response =>response.json())
  .then(data =>{
    if(data.msg){
      toast.success(data.msg);
      navigate('/login');
    }else{
      toast.error(data.err);
    }
  }).catch(error =>{
    console.log(error)
  })
}
  return (
    <section id='sign-up'>
            <div className='container mx-auto p-4'>
                <div className='bg-white w-full p-5 py-5 max-w-sm mx-auto rounded'>

                    <div className='w-20 h-20 mx-auto relative rounded-full overflow-hidden'>
                      <div>
                        <img src={inputs.profilePic || loginIcon} alt="Login Icon" />
                      </div>
                      <label>
                      <div className='text-xs font-semibold text-center w-full bg-slate-200 pb-5 absolute bottom-0 bg-opacity-85 cursor-pointer'>
                        Upload Photo
                      </div>
                      <input type="file" className='hidden' onChange={handleUploadPic}/>
                      </label>
                    </div>

                    <form className='pt-6 grid gap-4' onSubmit={handleSubmit}>

                        <div className='grid'>
                            <label>Name : </label>
                            <div className='bg-slate-100 p-2'>
                                <input name='name' value={inputs.name} onChange={handleInput} type="text" placeholder='Enter FullName' className='w-full h-full bg-transparent outline-none' />

                            </div>
                        </div>
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
                        
                        <div className='grid'>
                            <label>Confirm Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input name='confirmpassword' value={inputs.confirmpassword} onChange={handleInput} type='password' placeholder='Enter Confirm Password' className='w-full h-full bg-transparent outline-none' />
                            </div>
                        </div>

                        <p className='block w-fit ml-auto'>Already have an account? <Link to={'/login'} className='text-red-600 hover:text-red-700 hover:underline'>login</Link></p>
                        <button className='bg-red-600 text-white px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block '>Signup</button>

                    </form>
                </div>
            </div>
        </section>
  )
}

export default Signup