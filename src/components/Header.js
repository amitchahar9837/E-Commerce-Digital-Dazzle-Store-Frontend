import React, { useState } from 'react'
import Logo from './Logo'
import { GrSearch } from 'react-icons/gr'
import { FaRegCircleUser } from 'react-icons/fa6'
import { FaShoppingCart } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { toast } from 'react-toastify'
import { setUserDetails } from 'store/slices/userSlice'
import Role from 'common/role'
const Header = () => {
    const user = useSelector(store => store?.user?.user);
    const cartItemCount = useSelector(store => store.cartItemCount);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [profileDisplay, setProfileDisplay] = useState(false);
    const searchInput = useLocation();
    const urlSearch = new URLSearchParams(searchInput?.search);
    const searchQuery = urlSearch.getAll('q');
    const [search, setSearch] = useState(searchQuery)
    const [showSearch, setShowSearch] = useState(false);
    const handleLogout = () => {
        dispatch(setUserDetails(null));
        localStorage.clear("user");
        localStorage.clear("token");
        navigate('/');
        toast.success("Logout Successfully")
    }

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearch(value);
        if (value) {
            navigate(`/search?q=${value}`);
        } else {
            navigate('/search')
        }
    }
    return (
        <header className='h-16 shadow-md bg-white fixed w-full z-50'>
            <div className='container mx-auto flex items-center justify-between h-full px-4 '>
                <div>
                    <Link to={'/'}>
                        <Logo w={110} h={50} />
                    </Link>
                </div>

                <div className='hidden lg:flex justify-between items-center w-full max-w-sm border rounded-full focus-within:shadow-md pl-2'>
                    <input value={search} type="text" placeholder='Search Product' className='w-full outline-none' onChange={handleSearch} />
                    <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
                        <GrSearch />
                    </div>
                </div>

                <div className='flex items-center gap-4 md:gap-7'>

                    <button className='block lg:hidden text-2xl font-semibold ' onClick={()=>setShowSearch(prev =>!prev)}><GrSearch /></button>
                    <div className='group relative flex justify-center' onClick={() => setProfileDisplay(prev => !prev)}>
                        {
                            user?._id && (
                                <div className='text-3xl cursor-pointer'>
                                    {
                                        user?.profilePic ? (
                                            <img src={user.profilePic} alt={user?.name} className='w-8 h-8 rounded-full object-cover' />
                                        ) : (
                                            <FaRegCircleUser />
                                        )
                                    }
                                </div>
                            )
                        }
                        {profileDisplay ? (
                            <div className='absolute bottom-0 top-11 h-fit p-2 bg-white rounded-sm shadow-lg'>
                                {
                                    user?.role === Role.Admin ? (
                                        <Link to={'/admin-panel/dashboard'} className='hover:bg-slate-50 p-2 text-nowrap'>Admin Panel</Link>
                                    ) : (
                                        <Link to={'/'} className='hover:bg-slate-50 p-2 text-nowrap'>Profile</Link>
                                    )
                                }
                            </div>
                        ) : ''}
                    </div>

                    {user?._id && (
                        <Link to={'/my-cart'} className='text-2xl cursor-pointer relative'>
                            <FaShoppingCart />
                            <div className='bg-red-600 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-3'>
                                <p className='text-sm'>{cartItemCount}</p>
                            </div>
                        </Link>
                    )}

                    <div>
                        {
                            user?._id ? (
                                <button onClick={handleLogout} className='px-3 py-1 bg-red-600 rounded-full text-white font-semibold hover:bg-red-700'>Logout</button>
                            ) : (
                                <Link to={'/login'} className='px-3 py-1 bg-red-600 rounded-full text-white font-semibold hover:bg-red-700'>Login</Link>
                            )
                        }
                    </div>
                </div>
                {showSearch && (
                    <div className={ showSearch ? `absolute z-50 left-[50%] top-16 flex justify-between items-center border-b-2 border-black transition-all -translate-x-[50%] w-full max-w-md bg-white bg-opacity-90 p-2` : `absolute left-1/2 -top-10 flex justify-between items-center border-b-2 border-black transition-all w-full max-w-md bg-white bg-opacity-90 p-2`}>
                        <input value={search} type="text" placeholder='Search Product' className='bg-transparent w-full outline-none placeholder:text-black' onChange={handleSearch} />
                        <div className='text-2xl hover:text-red-600 px-3'>
                            <GrSearch />
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
