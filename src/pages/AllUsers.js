import summaryApi from 'common';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from 'components/ChangeUserRole';

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [openUpdateRole, settOpenUpdateRole] = useState(false);
    const [userUpdateData, setUserUpdateData] = useState({
        userId:'',
        name: '',
        email: '',
        role: '',
    })
    const fetchUser = async () => {
        const FetchData = await fetch(summaryApi.allUsers.url, {
            method: summaryApi.allUsers.method,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        })
        const dataResponse = await FetchData.json();
        if (!dataResponse.err) {
            setAllUsers(dataResponse.data)
        } else {
            toast.error(dataResponse.err);
        }
    }
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className='overflow-auto'>
            <table className='w-full usertable'>
                <tr className='bg-black text-white'>
                    <th className='p-2 whitespace-nowrap'>Sr.</th>
                    <th className='p-2 whitespace-nowrap'>Name</th>
                    <th className='p-2 whitespace-nowrap'>Email</th>
                    <th className='p-2 whitespace-nowrap'>Role</th>
                    <th className='p-2 whitespace-nowrap'>Created Date</th>
                    <th className='p-2 whitespace-nowrap'>Action</th>
                </tr>
                <tbody>
                    {
                        allUsers.map((data, index) => (
                            <tr key={index} className={(index + 1) % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <td className='whitespace-nowrap p-2'>{index + 1}</td>
                                <td className='whitespace-nowrap p-2'>{data?.name}</td>
                                <td className='whitespace-nowrap p-2'>{data?.email}</td>
                                <td className='whitespace-nowrap p-2'>{data?.role}</td>
                                <td className='whitespace-nowrap p-2'>{moment(data?.createdAt).format('ll')}</td>
                                <td className='whitespace-nowrap p-2'>
                                    <button
                                        onClick={() => {
                                            setUserUpdateData(data);
                                            settOpenUpdateRole(true)
                                        }
                                        }
                                        className='bg-green-100 p-2 rounded-full hover:bg-green-500 hover:text-white text-xl '>
                                        <MdModeEdit />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                openUpdateRole ? (
                    <ChangeUserRole 
                    onClose={() => settOpenUpdateRole(false)} 
                    userId ={userUpdateData._id}
                    name={userUpdateData.name} 
                    email={userUpdateData.email} 
                    role={userUpdateData.role} 
                    invokeFunc={fetchUser}
                    />
                ) : (
                    ''
                )
            }

        </div>
    )
}

export default AllUsers