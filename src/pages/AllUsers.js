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
        <div>
            <table className='w-full usertable'>
                <tr className='bg-black text-white'>
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created Date</th>
                    <th>Action</th>
                </tr>
                <tbody>
                    {
                        allUsers.map((data, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data?.name}</td>
                                <td>{data?.email}</td>
                                <td>{data?.role}</td>
                                <td>{moment(data?.createdAt).format('ll')}</td>
                                <td>
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