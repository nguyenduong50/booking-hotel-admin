import React, { useEffect, useState } from 'react';
import { json, Link } from 'react-router-dom';
import httpRequest from '../../utils/http-request';
import { tokenLoader } from '../../utils/auth';

const TrashHotelList = ({hotels}) => {
    const [hotelDestroy, setHotelDestroy] = useState({});
    const [hotelRestore, setHotelRestore] = useState({});
    const [hotelSelected, setHotelSelected] = useState(hotels);
    const [isBtnHotels, setIsBtnHotels] = useState(null);
    const token = tokenLoader();

    const hotelDestroyModalHandle = async(hotel) => {
        setHotelDestroy(hotel);
    };

    const hotelRestoreModalHandle = async(hotel) => {
        setHotelRestore(hotel);
    };

    const hotelsModalHandle = async() => {
        if(!hotelSelected){
            return;
        }

        const listHotelSelectedTem = hotelSelected.filter(item => item?.isChecked === true);

        if(listHotelSelectedTem.length === 0){
            setIsBtnHotels(false)
        }

        if(listHotelSelectedTem.length > 0){
            setIsBtnHotels(true)
        }
    };

    const hotelDestroyHandle = async(hotel_id) => {
        try{
            await httpRequest.post(`destroy-hotel?token=${token}`, {hotel_id: hotel_id});           
            return window.location.reload();
        }
        catch(error){
            throw json(
                {message: error},
                {status: 500}
            )
        }
    };

    const hotelRestoreHandle = async(hotel_id) => {
        try{
            await httpRequest.post(`restore-hotel?token=${token}`, {hotel_id: hotel_id});
            return window.location.reload();
        }
        catch(error){
            throw json(
                {message: error},
                {status: 500}
            )
        }
    };

    const hotelsRestoreHandle = async() => {
        //Validate hotelSelected = 0



        //fetch restore hotels
        try{
            await httpRequest.post(`restore-hotels?token=${token}`, {hotelList: hotelSelected});
            return window.location.reload();
        }
        catch(error){
            throw json(
                {message: error},
                {status: 500}
            )
        }

    };

    const hotelsDestroyHandle = async() => {
        //Validate hotelSelected = 0



        //fetch restore hotels
        try{
            await httpRequest.post(`destroy-hotels?token=${token}`, {hotelList: hotelSelected});
            return window.location.reload();
        }
        catch(error){
            throw json(
                {message: error},
                {status: 500}
            )
        }

    };

    const changeCheckboxHandle = (event, _id) => {
        const {name, checked} = event.target;

        if(name === "checkAll"){
            let temHotels = hotelSelected.map(hotel => {
                return {...hotel, isChecked: checked};
            });
            setHotelSelected(temHotels);
        }
        
        if(name === "checkItem"){
            let temHotels = hotelSelected.map(hotel => {
                return hotel._id === _id ? {...hotel, isChecked: checked} : hotel;
            });
            setHotelSelected(temHotels);
        }
    };

    useEffect(() => {
        setHotelSelected(hotels);
    }, [hotels]);

    return (
        <>
            <div className="d-flex justify-content-between mt-4 mb-2">
                <h2 className="fs-4 text-secondary">Hotel Trash</h2>
                <div>
                    <Link to="/hotel" className="btn btn-outline-primary btn-sm me-2">List Hotel</Link>
                    <button 
                        className="btn btn-outline-success btn-sm me-2"
                        data-bs-target="#restoreHotelsModal"
                        data-bs-toggle="modal"
                        onClick={hotelsModalHandle}
                    >
                        Restore
                    </button>
                    <button 
                        className="btn btn-outline-danger btn-sm me-2"
                        data-bs-target="#destroyHotelsModal"
                        data-bs-toggle="modal"
                        onClick={hotelsModalHandle}
                    >
                        Destroy
                    </button>
                </div>
            </div>
            <div className="border rounded-3 box-shadow-sm">
                <table className="table mt-1 mb-0">
                    <thead className="">
                        <tr className="">
                            <th scope="col" className="border-end">
                                <input 
                                    type="checkbox" 
                                    name="checkAll"
                                    checked={hotelSelected ? hotelSelected.filter(hotel => hotel?.isChecked !== true).length < 1 : false}
                                    onChange={(event) => changeCheckboxHandle(event)} 
                                />
                            </th>
                            <th scope="col" className="border-end">Name</th>
                            <th scope="col" className="border-end">Type</th>
                            <th scope="col" className="border-end">Title</th>
                            <th scope="col" className="border-end">City</th>
                            <th scope="col" className="border-end">Rating</th>
                            <th scope="col" className="">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        !hotelSelected && 
                        <tr>
                            <td colSpan="7" className="text-center">
                                <span>No records have been deleted yet </span>
                                <Link to="/hotel" className="text-primary text-decoration-underline">Go to List Hotel</Link>
                            </td>
                        </tr>
                    }
                    {
                        hotelSelected && 
                        hotelSelected.map((hotel) => (
                            <tr key={hotel._id}>
                                <td>
                                    <input 
                                        type="checkbox" 
                                        name="checkItem"
                                        checked={hotel?.isChecked || false}
                                        onChange={(event) => changeCheckboxHandle(event, hotel._id)} 
                                    />
                                </td>
                                <td>{hotel.name}</td>
                                <td>{hotel.type}</td>
                                <td>{hotel.title}</td>
                                <td>{hotel.city}</td>
                                <td>{hotel.rating}</td>
                                <td>
                                    <button 
                                        type="button"
                                        className="btn btn-outline-success btn-sm me-2" 
                                        data-bs-target="#restoreHotelModal"
                                        data-bs-toggle="modal"
                                        onClick={() => hotelRestoreModalHandle(hotel)}
                                    >
                                        Restore
                                    </button>
                                    <button 
                                        type="button"
                                        className="btn btn-outline-danger btn-sm" 
                                        data-bs-target="#destroyHotelModal"
                                        data-bs-toggle="modal"
                                        onClick={() => hotelDestroyModalHandle(hotel)}
                                    >
                                        Destroy
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
            {/* Form restore hotel modal */}
            <div className="modal fade" id="restoreHotelModal" tabIndex="-1" aria-labelledby="restoreHotelModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="restoreHotelModalLabel">Are you restore this Hotel?</h1>
                            <button 
                                type="button" 
                                className="btn-close" 
                                data-bs-dismiss="modal" 
                                aria-label="Close" 
                                onClick={() => hotelRestoreModalHandle({})}
                            >
                            </button>
                        </div>
                        <div className="modal-body">
                            <span className="fw-bold">Hotel: </span>
                            <span>{hotelRestore.name}</span>
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                data-bs-dismiss="modal"
                                onClick={() => hotelRestoreModalHandle({})}
                            >
                                Cancel
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-success" 
                                data-bs-dismiss="modal"
                                onClick={() => hotelRestoreHandle(hotelRestore._id)}
                            >
                                Restore
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Form restore hotels modal */}
            <div className="modal fade" id="restoreHotelsModal" tabIndex="-1" aria-labelledby="restoreHotelsModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="restoreHotelsModalLabel">Restore!</h1>
                            <button 
                                type="button" 
                                className="btn-close" 
                                data-bs-dismiss="modal" 
                                aria-label="Close" 
                            >
                            </button>
                        </div>
                        <div className="modal-body">
                            {
                                isBtnHotels && (
                                    <>
                                        <p className="fw-bold">This action will restore multiple hotels at once. Be careful.</p>
                                        <p>Are you sure you want to restore these hotels in bulk?</p>
                                    </>
                                )
                            }
                            {
                                !isBtnHotels && (
                                    <>
                                        <p className="fw-bold">No records have been selected yet</p>
                                    </>
                                )
                            }
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-success" 
                                data-bs-dismiss="modal"
                                disabled={!isBtnHotels ? true : false}
                                onClick={hotelsRestoreHandle}
                            >
                                Restore
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Form destroy hotel modal */}
            <div className="modal fade" id="destroyHotelModal" tabIndex="-1" aria-labelledby="destroyHotelModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="destroyHotelModalLabel">Are you destroy this Hotel?</h1>
                            <button 
                                type="button" 
                                className="btn-close" 
                                data-bs-dismiss="modal" 
                                aria-label="Close" 
                            >
                            </button>
                        </div>
                        <div className="modal-body">
                            <span className="fw-bold">Hotel: </span>
                            <span>{hotelDestroy.name}</span>
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                data-bs-dismiss="modal"
                                onClick={() => hotelDestroyModalHandle({})}
                            >
                                Cancel
                            </button>
                            <button
                                type="button" 
                                className="btn btn-danger" 
                                data-bs-dismiss="modal"
                                onClick={() => hotelDestroyHandle(hotelDestroy._id)}
                            >
                                Destroy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Form destroy hotels modal */}
            <div className="modal fade" id="destroyHotelsModal" tabIndex="-1" aria-labelledby="destroyHotelsModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="destroyHotelsModalLabel">Warning Destroy!</h1>
                            <button 
                                type="button" 
                                className="btn-close" 
                                data-bs-dismiss="modal" 
                                aria-label="Close" 
                            >
                            </button>
                        </div>
                        <div className="modal-body">                                                      
                            {
                                isBtnHotels && (
                                    <>
                                        <p className="fw-bold">This action will destroy multiple hotels at once. Be careful.</p>
                                        <p>Are you sure you want to destroy these hotels in bulk?</p>
                                    </>
                                )
                            }
                            {
                                !isBtnHotels && (
                                    <>
                                        <p className="fw-bold">No records have been selected yet</p>
                                    </>
                                )
                            }
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button
                                type="button" 
                                className="btn btn-danger" 
                                data-bs-dismiss="modal"
                                disabled={!isBtnHotels ? true : false}
                                onClick={hotelsDestroyHandle}
                            >
                                Destroy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TrashHotelList;