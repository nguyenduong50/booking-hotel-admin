import React, { Suspense } from 'react';
import httpRequest from '../../utils/http-request';
import { Await, json, useLoaderData, defer } from 'react-router-dom';
import UserList from './UserList';
// import classes from './User.module.css';
import { tokenLoader } from '../../utils/auth';

const User = () => {
    const {users} = useLoaderData();
    const textLoading = <p style={{textAlign: 'center'}}>Loading users ...</p>;

    return (
        <>
            <div className="d-flex justify-content-between mt-4 mb-2">
                <h2 className="fs-4 text-secondary">User List</h2>
                {/* <button className="btn btn-outline-success btn-sm">Add new</button> */}
            </div>
            <Suspense fallback={textLoading}>
                <Await resolve={users}>
                    {(users => <UserList users={users} />)}
                </Await>
            </Suspense>
        </>
    );
};

export default User;

async function loadUsers () {
    const token = tokenLoader();
    try{
        const response = await httpRequest.get('users?token=' + token);
        return response.data;
    }
    catch(error){
        throw json(
            {message: error},
            {status: 500}
        )
    }
}

export async function loader(){
    return defer({
        users: loadUsers()
    })
}
