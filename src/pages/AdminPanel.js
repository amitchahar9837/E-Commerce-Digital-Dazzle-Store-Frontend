import Role from 'common/role';
import React, { useEffect, useState } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from 'react-icons/io';
import { IoCameraOutline } from "react-icons/io5";
import DisplayImage from 'components/DisplayImage';
import summaryApi from 'common';
import { toast } from 'react-toastify';
import { setUserDetails } from 'store/slices/userSlice';
import uploadImage from 'helpers/uploadImage';

const AdminPanel = () => {

  const user = useSelector(store => store?.user?.user);
  const navigate = useNavigate();
  const [showAside, setShowAside] = useState(false);
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState('');
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.role !== Role.Admin) {
      navigate('/');
    }
  }, [user]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await uploadImage(file);
    await setProfilePic(imagePic.url);
    updateUserProfileFun(imagePic.url);
  }

  const updateUserProfileFun = async(image)=>{
    const updateUser = await fetch(summaryApi.updateUser.url, {
      method: summaryApi.updateUser.method,
      headers: {
        'Content-Type': "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        userId: user._id,
        profilePic: image,
      })
    })
    const Response = await updateUser.json();
    if (Response.msg) {
      toast.success("Profile Pic Updated Successfully");
      localStorage.setItem("user",JSON.stringify(Response.data));
      dispatch(setUserDetails(Response.data))
    } else {
      toast.error(Response.err);
    }
  }
  return (
    <div className='flex  flex-col md:flex-row w-full min-h-[calc(100vh-120px)] p-2 items-start gap-2 md:gap-0 relative'>
      <button className='block md:hidden text-2xl font-semibold my-4 hover:text-red-500' onClick={() => setShowAside(prev => !prev)}><GiHamburgerMenu /></button>
      <aside style={showAside ? { display: 'inline-block', position: 'absolute', top: '0px', left: '0px', zIndex: '10' } : {}} className='hidden md:flex flex-col w-full max-w-60 h-full min-h-[calc(100vh-90px)] bg-white shadow-[5px_0px_5px_rgba(0,0,0,0.1)] relative'>
        <button className="hover:text-red-500 text-2xl absolute top-3 right-3 inline-block md:hidden" onClick={() => setShowAside(false)}>
          <IoMdClose />
        </button>
        <div className='w-full h-40 flex flex-col justify-center items-center'>
          <div className='text-5xl flex justify-center cursor-pointer relative'>
            <div className='w-20 h-20 relative'>

              {
                user?.profilePic ? (
                  <img src={profilePic} alt={user?.name} className='w-20 h-20 rounded-full object-cover' onClick={() => {
                    setFullScreenImage(user.profilePic)
                    setOpenFullScreenImage(true)
                  }} />
                ) : (
                  <FaRegCircleUser />
                )
              }
              <form className='absolute right-0 bottom-0'>
                <label>
                  <input type="file" className='hidden' onChange={handleUploadPic} />
                  <IoCameraOutline className='text-3xl cursor-pointer bg-gray-50 rounded-full p-1' />
                </label>
              </form>
            </div>
          </div>
          <p className='capitalize text-lg font-semibold'>{user?.name}</p>
          <p className='text-sm'>{user?.role}</p>
        </div>

        <div>
          <nav className='grid gap-2 px-2'>
            <Link onClick={() => setShowAside(false)} to={'dashboard'} className='p-2 bg-slate-100 hover:bg-slate-200 flex gap-2 items-center font-medium'><RxDashboard className='text-xl' /> Dashboard</Link>
            <Link onClick={() => setShowAside(false)} to={'all-users'} className='p-2 bg-slate-100 hover:bg-slate-200 flex gap-2 items-center font-medium'><FaUserCog className='text-xl' />Customers</Link>
            <Link onClick={() => setShowAside(false)} to={'all-products'} className='p-2 bg-slate-100 hover:bg-slate-200 flex gap-2 items-center font-medium'><MdOutlineShoppingBag className='text-xl' />Products</Link>

          </nav>
        </div>
      </aside>

      {/* Full Screen DP Image */}
      {openFullScreenImage && (
        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
      )}
      <main className='w-full h-full p-2'>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminPanel