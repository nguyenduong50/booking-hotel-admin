import React, { Suspense } from 'react';
import { Await, json, useLoaderData, defer } from 'react-router-dom';
import TrashHotelList from './TrashHotelList';
import httpRequest from '../../utils/http-request';
import { tokenLoader } from '../../utils/auth';

const TrashHotel = () => {
    const {hotels} = useLoaderData();
    const textLoading = <p style={{textAlign: 'center'}}>Loading hotels ...</p>;

    return (
        <>
            <Suspense fallback={textLoading}>
                <Await resolve={hotels}>
                    {(hotels => <TrashHotelList hotels={hotels} />)}
                </Await>
            </Suspense>
        </>
    );
};

export default TrashHotel;

const loadTrashHotels = async() => {
    const token = tokenLoader();
    try{
        const response = await httpRequest.get('trash-hotels?token=' + token);
        return response.data;
    }
    catch(error){
        throw json(
            {message: error},
            {status: 500}
        )
    }
};

export async function loader(){
    return defer({
        hotels: loadTrashHotels()
    })
}
