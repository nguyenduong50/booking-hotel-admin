import React, { useEffect, useState } from 'react';
import httpRequest from '../../utils/http-request';
import {tokenLoader} from '../../utils/auth';

const UserList = ({users}) => {
    const [userList, setUserList] = useState([]);
    const [userDelete, setUserDelete] = useState({});
    const token = tokenLoader();

    const deleteUserModal = (user) => {
        setUserDelete(user);
    };

    const deleteUserHandle = async(user_id) => {
        try{
            await httpRequest.post(`delete-user?token=${token}`, {user_id: user_id})
            return window.location.reload();
        }
        catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        setUserList(users);
    },[users]);

    return (
        <>
            <div className="border rounded-3 box-shadow-sm">
                <table className="table mt-1 mb-0">
                    <thead className="">
                        <tr className="">
                            <th scope="col" className="border-end">#</th>
                            <th scope="col" className="border-end">Username</th>
                            <th scope="col" className="border-end">Email</th>
                            <th scope="col" className="border-end">Role</th>
                            <th scope="col" className="border-end">Phone number</th>
                            <th scope="col" className="border-end">Fullname</th>
                            <th scope="col" className="">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userList &&
                            userList.map((user, index) => (
                                <tr key={user._id}>
                                    <td className="fw-bold">{index + 1}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.isAdmin && <span style={{color: 'green'}}>Admin</span>}
                                        {!user.isAdmin  && <span>Customer</span>}
                                    </td>
                                    <td>{user.phoneNumber ? user.phoneNumber : 'Phone number is not available'}</td>
                                    <td>{user.fullName ? user.fullName : 'Full name is not available'}</td>
                                    <td>
                                        <button 
                                            className="btn btn-outline-danger btn-sm" 
                                            data-bs-target="#deleteModal"
                                            data-bs-toggle="modal"                                          
                                            onClick={() => deleteUserModal(user)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="d-flex justify-content-end align-items-center me-4 py-2">
                    <span className="me-3">1-1 of 1</span>
                    <button className="border-0 bg-transparent text-black-50">
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <button className="border-0 bg-transparent text-black-50">
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
            {/* Form delete user modal */}
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteUserModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="deleteUserModal">Are you delete this User?</h1>
                            <button 
                                type="button" 
                                className="btn-close" 
                                data-bs-dismiss="modal" 
                                aria-label="Close" 
                                onClick={() => deleteUserModal({})}>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="fw-bold">Username: {userDelete.username}</div>
                            <span>Email: {userDelete.email}</span>
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                data-bs-dismiss="modal"
                                onClick={() => deleteUserModal({})}
                            >
                                Cancel
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-danger" 
                                data-bs-dismiss="modal"
                                onClick={() => deleteUserHandle(userDelete._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserList;