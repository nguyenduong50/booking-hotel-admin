import React, { useEffect, useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import httpRequest from '../../utils/http-request';
import ErrorModal from '../../components/UI/ErrorModal';
import { tokenLoader } from '../../utils/auth';

const HotelList = ({hotels}) => {
    const navigate = useNavigate();
    const [hotelDelete, setHotelDelete] = useState({});
    const [hotelSelected, setHotelSelected] = useState(hotels);
    const [isBtnDeleteHotels, setIsBtnDeleteHotels] = useState(null);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const token = tokenLoader();

    const errorHandler = () => {
        setError(null);
    };

    const increasePageHandle = () => {
        if(page >= hotels.length - 1){
            setPage(0);
            return;
        }

        setPage(page + 1);
    };

    const decreasePageHandle = () => {
        if(page === 0){
            setPage(hotels.length - 1);
            return;
        }

        setPage(page - 1);
    };

    const hotelEditHandle =(hotel_id) => {
        navigate('/hotel/' + hotel_id);
    };

    const hotelDeleteModalHandle = async(hotel) => {
        setHotelDelete(hotel);
    };

    const hotelDeleteHandle = async(hotel_id) => {
        try{
            await httpRequest.post(`delete-hotel?token=${token}`, {hotel_id: hotel_id});
            return window.location.reload();
        }
        catch(error){
            setError(error.response.data);
        }
    };

    const hotelsDeleteModalHandle = async() => {
        if(!hotelSelected){
            return;
        }

        const listHotelSelectedTem = hotelSelected.filter(item => item?.isChecked === true);

        if(listHotelSelectedTem.length === 0){
            setIsBtnDeleteHotels(false)
        }

        if(listHotelSelectedTem.length > 0){
            setIsBtnDeleteHotels(true)
        }
    };

    const hotelsDeleteHandle = async() => {
        try{
            await httpRequest.post(`delete-hotels?token=${token}`, {hotelList: hotelSelected});           
            return window.location.reload();
        }
        catch(error){
            setError(error.response.data);
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
        setHotelSelected(hotels[page]);
    }, [hotels, page]);

    return (
        <>
        	{
				error &&
				<ErrorModal
					title='Error'
					messages={error}
					onConfirm={errorHandler}
				/>
			}
            <div className="d-flex justify-content-between mt-4 mb-2">
                <h2 className="fs-4 text-secondary">Hotel List</h2>
                <div>
                    <Link to="/hotel/trash" className="btn btn-outline-secondary btn-sm me-2">Trash</Link>
                    <button 
                        className="btn btn-outline-danger btn-sm me-2" 
                        data-bs-target="#deleteHotelsModal"
                        data-bs-toggle="modal"
                        onClick={hotelsDeleteModalHandle}
                    >
                        Delete
                    </button>
                    <Link to="/create-hotel" className="btn btn-outline-success btn-sm">Add new</Link>
                </div>
            </div>
            {/* Table list Hotel */}
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
                            <th scope="col" className="border-end">ID</th>
                            <th scope="col" className="border-end">Name</th>
                            <th scope="col" className="border-end">Type</th>
                            <th scope="col" className="border-end">Title</th>
                            <th scope="col" className="border-end">City</th>                           
                            <th scope="col" className="">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        !hotelSelected && 
                        <tr>
                            <td colSpan="7" className="text-center">
                                <span>No records have been create yet </span>
                                <Link to="/create-hotel" className="text-primary text-decoration-underline">Go to Create Hotel</Link>
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
                                <td>{hotel._id}</td>
                                <td>{hotel.name}</td>
                                <td>{hotel.type}</td>
                                <td>{hotel.title}</td>
                                <td>{hotel.city}</td>
                                <td>
                                    <button 
                                        type="button"
                                        className="btn btn-outline-success btn-sm me-2"
                                        onClick={() => hotelEditHandle(hotel._id)} 
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        type="button"
                                        className="btn btn-outline-danger btn-sm" 
                                        data-bs-target="#deleteModal"
                                        data-bs-toggle="modal"
                                        onClick={() => hotelDeleteModalHandle(hotel)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )) 
                    }
                    </tbody>
                </table>
                <div className="d-flex justify-content-end align-items-center me-4 py-2">
                    <span className="me-3">{page + 1} of {hotels.length}</span>
                    <button className="border-0 bg-transparent text-black-50" onClick={decreasePageHandle}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <button className="border-0 bg-transparent text-black-50" onClick={increasePageHandle}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
            {/* Form delete hotel modal */}
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteHotelModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="deleteHotelModalLabel">Are you delete this Hotel?</h1>
                            <button 
                                type="button" 
                                className="btn-close" 
                                data-bs-dismiss="modal" 
                                aria-label="Close" 
                                onClick={() => hotelDeleteModalHandle({})}>
                            </button>
                        </div>
                        <div className="modal-body">
                            <span className="fw-bold">Hotel: </span>
                            <span>{hotelDelete.name}</span>
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                data-bs-dismiss="modal"
                                onClick={() => hotelDeleteModalHandle({})}
                            >
                                Cancel
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-danger" 
                                data-bs-dismiss="modal"
                                onClick={() => hotelDeleteHandle(hotelDelete._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Form delete hotels modal */}
            <div className="modal fade" id="deleteHotelsModal" tabIndex="-1" aria-labelledby="deleteHotelsModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="deleteHotelsModalLabel">Warning!</h1>
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
                                isBtnDeleteHotels && (
                                    <>
                                        <p className="fw-bold">This action will delete multiple hotels at once. Be careful.</p>
                                        <p>Are you sure you want to delete these hotels in bulk?</p>
                                    </>
                                )
                            }
                            {
                                !isBtnDeleteHotels && (
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
                                disabled={!isBtnDeleteHotels ? true : false}
                                onClick={hotelsDeleteHandle}
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

export default HotelList;