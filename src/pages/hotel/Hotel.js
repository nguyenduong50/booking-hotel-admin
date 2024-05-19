import React, { Suspense } from 'react';
import httpRequest from '../../utils/http-request';
import { Await, json, useLoaderData, defer } from 'react-router-dom';
import HotelList from './HotelList';
import { tokenLoader } from '../../utils/auth';

const Hotel = () => {
    const {hotels} = useLoaderData();
    const textLoading = <p style={{textAlign: 'center'}}>Loading hotels ...</p>;

    return (
        <>
            <Suspense fallback={textLoading}>
                <Await resolve={hotels}>
                    {(hotels => <HotelList hotels={hotels} />)}
                </Await>
            </Suspense>
        </>
    );
};

export default Hotel;

async function loadHotels () {
    const token = tokenLoader();
    try{
        const response = await httpRequest.get('hotels?token=' + token);
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
        hotels: loadHotels()
    })
}