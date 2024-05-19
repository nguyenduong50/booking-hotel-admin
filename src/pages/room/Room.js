import React, { Suspense } from 'react';
import httpRequest from '../../utils/http-request';
import { Await, json, useLoaderData, defer } from 'react-router-dom';
import RoomList from './RoomList';
import { tokenLoader } from '../../utils/auth';

const Room = () => {
    const {rooms} = useLoaderData();
    const textLoading = <p style={{textAlign: 'center'}}>Loading hotels ...</p>;

    return (
        <>
            <Suspense fallback={textLoading}>
                <Await resolve={rooms}>
                    {(rooms => <RoomList rooms={rooms} />)}
                </Await>
            </Suspense>
        </>
    );
};

export default Room;

async function loadRooms () {
    const token = tokenLoader();
    try{
        const response = await httpRequest.get('rooms?token=' + token);
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
        rooms: loadRooms()
    })
}