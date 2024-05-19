import React, { useEffect, useState } from 'react';
import classes from './HotelCreate.module.css';
import { Form, redirect, useActionData, defer, useLoaderData } from 'react-router-dom';
import Select from 'react-select';
import httpRequest from '../../utils/http-request';
import ErrorModal from '../../components/UI/ErrorModal';
import useInput from '../../hooks/use-input';
import TitleCreate from '../../components/titleCreate/TitleCreate';
import { tokenLoader } from '../../utils/auth';

const HotelEdit = () => {
    const data = useActionData();
    const [error, setError] = useState(null);
    const [allRooms, setAllRooms] = useState([]);
    const {hotel} = useLoaderData();
    const token = tokenLoader();

    const errorHandler = () => {
        setError(null);
    };

    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangedHandler,
        inputBlurHandler: nameBlurHandler,
        // reset: resetNameInput
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredType,
        isValid: enteredTypeIsValid,
        hasError: typeHasError,
        valueChangeHandler: typeChangedHandler,
        inputBlurHandler: typeBlurHandler,
        // reset: resetTypeInput
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredCity,
        isValid: enteredCityIsValid,
        hasError: cityHasError,
        valueChangeHandler: cityChangedHandler,
        inputBlurHandler: cityBlurHandler,
        // reset: resetCityInput
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredAddress,
        isValid: enteredAddressIsValid,
        hasError: addressHasError,
        valueChangeHandler: addressChangedHandler,
        inputBlurHandler: addressBlurHandler,
        // reset: resetAddressInput
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredDistance,
        isValid: enteredDistanceIsValid,
        hasError: distanceHasError,
        valueChangeHandler: distanceChangedHandler,
        inputBlurHandler: distanceBlurHandler,
        // reset: resetDistanceInput
    } = useInput(value => value > 0);

    const {
        value: enteredTitle,
        isValid: enteredTitleIsValid,
        hasError: titleHasError,
        valueChangeHandler: titleChangedHandler,
        inputBlurHandler: titleBlurHandler,
        // reset: resetTitleInput
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredDescription,
        isValid: enteredDescriptionIsValid,
        hasError: descriptionHasError,
        valueChangeHandler: descriptionChangedHandler,
        inputBlurHandler: descriptionBlurHandler,
        // reset: resetDescriptionInput
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredPrice,
        isValid: enteredPriceIsValid,
        hasError: priceHasError,
        valueChangeHandler: priceChangedHandler,
        inputBlurHandler: priceBlurHandler,
        // reset: resetPriceInput
    } = useInput(value => value > 0);

    const {
        value: enteredImages,
        isValid: enteredImagesIsValid,
        hasError: imagesHasError,
        valueChangeHandler: imagesChangedHandler,
        inputBlurHandler: imagesBlurHandler,
        // reset: resetImagesInput
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredRooms,
        isValid: enteredRoomsIsValid,
        hasError: roomsHasError,
        valueChangeHandler: roomsChangedHandler,
        inputBlurHandler: roomsBlurHandler,
        // reset: resetRoomsInput
    } = useInput(value => value.length > 0);

    let formIsValid = false;

    if(
        enteredNameIsValid && 
        enteredTypeIsValid && 
        enteredCityIsValid && 
        enteredAddressIsValid &&
        enteredDistanceIsValid &&
        enteredTitleIsValid && 
        enteredDescriptionIsValid &&
        enteredPriceIsValid &&
        enteredImagesIsValid &&
        enteredRoomsIsValid
        
    ){
      formIsValid = true
    }

    useEffect(() => {
        const fetchAllRooms = async() => {
            try{
                const response = await httpRequest.get('all-rooms?token=' + token);
                const data = await response.data;
                const allRoomsTempo = data.map(item => {
                    return{
                        value: item._id,
                        label: item.title
                    }
                });
                const roomsTempo = hotel.rooms;
                const roomsSelected = [];
                allRoomsTempo.forEach(room => {
                    if(roomsTempo.includes(room.value)){
                        roomsSelected.push(room);
                    }
                });

                roomsChangedHandler(roomsSelected);
                nameChangedHandler(hotel.name);
                typeChangedHandler(hotel.type);
                cityChangedHandler(hotel.city);
                addressChangedHandler(hotel.address);
                distanceChangedHandler(hotel.distance);
                titleChangedHandler(hotel.title);
                descriptionChangedHandler(hotel.desc);
                priceChangedHandler(hotel.cheapestPrice);
                const photosString = hotel.photos.toString();
                const photos = photosString.replace(/,/g, '\n');
                imagesChangedHandler(photos);

                setAllRooms(allRoomsTempo);
            }
            catch(error){
                console.log(error);
            }
        };

        fetchAllRooms();
    }, [hotel]);

    useEffect(() => {
        setError(data);
    }, [data]);

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
            <TitleCreate title="Hotel" />
            <div className={`${classes['form-add-new-hotel']} mt-3 py-3 px-3`}>
                <Form method="POST" className="container-fluid">
                    <input type="hidden" name="hotel_id" value={hotel._id} />
                    <div className="row mb-4">
                        <div className="col-md-6 pe-5">
                            <div className="d-flex flex-column me-5">
                                <label className={`me-4 ${nameHasError ? classes.error : ''}`}>
                                    <span>Name </span>
                                    <span style={{color: 'red'}}>*</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="My hotel" 
                                    name="name" 
                                    className={`me-4 ${nameHasError ? classes.error : ''}`} 
                                    value={enteredName}
                                    onChange={(event) => nameChangedHandler(event.target.value)}
                                    onBlur={nameBlurHandler}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 ps-5">
                            <div className="d-flex flex-column ms-5">
                                <label className={`me-4 ${typeHasError ? classes.error : ''}`}>
                                    <span>Type </span>
                                    <span style={{color: 'red'}}>*</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="hotel" 
                                    name="type" 
                                    className={`me-4 ${typeHasError ? classes.error : ''}`} 
                                    value={enteredType}
                                    onChange={(event) => typeChangedHandler(event.target.value)}
                                    onBlur={typeBlurHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-6 pe-5">
                            <div className="d-flex flex-column me-5">
                                <label className={`me-4 ${cityHasError ? classes.error : ''}`}>
                                    <span>City </span>
                                    <span style={{color: 'red'}}>*</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="New york" 
                                    name="city" 
                                    className={`me-4 ${cityHasError ? classes.error : ''}`} 
                                    value={enteredCity}
                                    onChange={(event) => cityChangedHandler(event.target.value)}
                                    onBlur={cityBlurHandler}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 ps-5">
                            <div className="d-flex flex-column ms-5">
                                <label className={`me-4 ${addressHasError ? classes.error : ''}`}>
                                    <span>Address </span>
                                    <span style={{color: 'red'}}>*</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Elton st, 216" 
                                    name="address" 
                                    className={`me-4 ${addressHasError ? classes.error : ''}`} 
                                    value={enteredAddress}
                                    onChange={(event) => addressChangedHandler(event.target.value)}
                                    onBlur={addressBlurHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-6 pe-5">
                            <div className="d-flex flex-column me-5">
                                <label className={`me-4 ${distanceHasError ? classes.error : ''}`}>
                                    <span>Distance from city center </span>
                                    <span style={{color: 'red'}}>*</span>
                                </label>
                                <input 
                                    type="number" 
                                    placeholder="500" 
                                    name="distance" 
                                    className={`me-4 ${distanceHasError ? classes.error : ''}`}
                                    value={enteredDistance}
                                    onChange={(event) => distanceChangedHandler(event.target.value)}
                                    onBlur={distanceBlurHandler}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 ps-5">
                            <div className="d-flex flex-column ms-5">
                                <label className={`me-4 ${titleHasError ? classes.error : ''}`}>                                   
                                    <span>Title </span>
                                    <span style={{color: 'red'}}>*</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="The best hotel" 
                                    name="title" 
                                    className={`me-4 ${titleHasError ? classes.error : ''}`}
                                    value={enteredTitle}
                                    onChange={(event) => titleChangedHandler(event.target.value)}
                                    onBlur={titleBlurHandler} 
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-6 pe-5">
                            <div className="d-flex flex-column me-5">
                                <label className={`me-4 ${descriptionHasError ? classes.error : ''}`}>                                   
                                    <span>Description </span>
                                    <span style={{color: 'red'}}>*</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Description" 
                                    name="description" 
                                    className={`me-4 ${descriptionHasError ? classes.error : ''}`}
                                    value={enteredDescription}
                                    onChange={(event) => descriptionChangedHandler(event.target.value)}
                                    onBlur={descriptionBlurHandler} 
                                />
                            </div>
                        </div>
                        <div className="col-md-6 ps-5">
                            <div className="d-flex flex-column ms-5">
                                <label className={`me-4 ${priceHasError ? classes.error : ''}`}>                                    
                                    <span>Cheapest Price </span>
                                    <span style={{color: 'red'}}>*</span>
                                </label>
                                <input 
                                    type="number" 
                                    placeholder="100" 
                                    name="cheapestPrice" 
                                    className={`me-4 ${priceHasError ? classes.error : ''}`}
                                    value={enteredPrice}
                                    onChange={(event) => priceChangedHandler(event.target.value)}
                                    onBlur={priceBlurHandler} 
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-6 pe-5">
                            <div className="d-flex flex-column me-5">
                                <label className={`${imagesHasError ? classes.error : ''}`}>                                 
                                    <span>Images </span>
                                    <span style={{color: 'red'}}>*</span>
                                </label>
                                <textarea 
                                    className={`overflow-scroll ${imagesHasError ? classes.error : ''}`} 
                                    name="photos" 
                                    style={{minHeight: '120px'}}
                                    value={enteredImages}
                                    onChange={(event) => imagesChangedHandler(event.target.value)}
                                    onBlur={imagesBlurHandler}
                                >
                                    {enteredImages}
                                </textarea>
                            </div>
                        </div>
                        <div className="col-md-6 ps-5">
                            <div className="d-flex flex-column ms-5">
                                <label className="">Featured</label>
                                {
                                    !hotel.featured &&
                                    <select className="" name="featured" >
                                        <option value="0" selected>No</option>
                                        <option value="1">Yes</option>
                                    </select>
                                }
                                {
                                    hotel.featured &&
                                    <select className="" name="featured" >
                                        <option value="0">No</option>
                                        <option value="1" selected>Yes</option>
                                    </select>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-12 d-flex flex-column">
                            <label 
                                className={roomsHasError ? classes.error : ''}
                            >                               
                                <span>Rooms </span>
                                <span style={{color: 'red'}}>*</span>
                            </label>
                            <Select 
                                className={roomsHasError ? classes.error : ''}
                                options={allRooms}
                                isMulti
                                name="rooms" 
                                style={{minHeight: '120px'}}
                                value={enteredRooms}
                                onChange={roomsChangedHandler}
                                onBlur={roomsBlurHandler}
                            />
                        </div>
                    </div>
                    <div className="">
                        <button className={classes['btn-send']} disabled={!formIsValid}>Send</button>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default HotelEdit;

export async function action({request}){
    const data = await request.formData();
    // const formValues = {};
    // data.forEach((value, key) => {
    //   formValues[key] = value;
    // });

    const updateHotel = {
        hotel_id: data.get('hotel_id'),
        name: data.get('name'),
        type: data.get('type'),
        city: data.get('city'),
        address: data.get('address'),
        distance: data.get('distance'),
        title: data.get('title'),
        description: data.get('description'),
        cheapestPrice: data.get('cheapestPrice'),
        photos: data.get('photos'),
        featured: data.get('featured'),
        rooms: data.getAll('rooms')
    };

    //Fetch create Hotel
    const token = tokenLoader();
    try{
        await httpRequest.post(`update-hotel?token=${token}`, updateHotel);
        return redirect('/hotel');
    }
    catch(error){
        return error.response.data;
    }
};

const loadHotel = async(hotel_id) => {
    const token = tokenLoader();
    try{
        const response = await httpRequest.get('edit-hotel/' + hotel_id + `?token=${token}`);
        const data = response.data;
        return data;
    }
    catch(error){
        console.log(error);
    }
};

export const loader = async({params}) => {
    const hotel_id = params.hotel_id; 
    return defer({
        hotel: await loadHotel(hotel_id)
    });
};
