import React, {useState, useEffect} from 'react';
import { Form, useActionData, redirect, defer, useLoaderData } from 'react-router-dom';
import classes from './RoomCreate.module.css';
import TitleCreate from '../../components/titleCreate/TitleCreate';
import ErrorModal from '../../components/UI/ErrorModal';
import useInput from '../../hooks/use-input';
import httpRequest from '../../utils/http-request';
import { tokenLoader } from '../../utils/auth';

const RoomEdit = () => {
    const data = useActionData();
    const {room} = useLoaderData();
    const [error, setError] = useState(null);

    const errorHandler = () => {
        setError(null);
    };

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
        //reset: resetDescriptionInput
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredMaxPeople,
        isValid: enteredMaxPeopleIsValid,
        hasError: maxPeopleHasError,
        valueChangeHandler: maxPeopleChangedHandler,
        inputBlurHandler: maxPeopleBlurHandler,
        //reset: resetmaxPeopleInput
    } = useInput(value => value > 0);

    const {
        value: enteredPrice,
        isValid: enteredPriceIsValid,
        hasError: priceHasError,
        valueChangeHandler: priceChangedHandler,
        inputBlurHandler: priceBlurHandler,
        //reset: resetpriceInput
    } = useInput(value => value > 0);

    const {
        value: enteredRooms,
        isValid: enteredRoomsIsValid,
        hasError: roomsHasError,
        valueChangeHandler: roomsChangedHandler,
        inputBlurHandler: roomsBlurHandler,
        //reset: resetRoomsInput
    } = useInput(value => value.length > 0);

    let formIsValid = false;

    if(
        enteredTitleIsValid && 
        enteredDescriptionIsValid &&
        enteredPriceIsValid &&
        enteredMaxPeopleIsValid &&
        enteredRoomsIsValid
    ){
      formIsValid = true
    }

    useEffect(() => {
        titleChangedHandler(room.title);
        descriptionChangedHandler(room.desc);
        maxPeopleChangedHandler(room.maxPeople);
        priceChangedHandler(room.price);
        roomsChangedHandler(room.roomNumbers);
    }, [room]);

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
            <TitleCreate title="Room" />
            <div className={`${classes['form-add-new-room']} mt-3 py-3 px-3`}>
                <Form method="POST" className="container-fluid">
                    <input type="hidden" name="room_id" value={room._id} />
                    <div className="row mb-4">
                        <div className="col-md-6 pe-5">
                            <div className="d-flex flex-column me-5">
                                <label className={`me-4 ${titleHasError ? classes.error : ''}`}>
                                    <span>Title </span>
                                    <span style={{color: 'red'}}>*</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="2 bed room" 
                                    name="title" 
                                    className={`me-4 ${titleHasError ? classes.error : ''}`} 
                                    value={enteredTitle}
                                    onChange={(event) => titleChangedHandler(event.target.value)}
                                    onBlur={titleBlurHandler}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 ps-5">
                            <div className="d-flex flex-column ms-5">
                                <label className={`me-4 ${descriptionHasError ? classes.error : ''}`}>
                                    <span>Description </span>
                                    <span style={{color: 'red'}}>*</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="King size bed, 1 bathroom" 
                                    name="desc" 
                                    className={`me-4 ${descriptionHasError ? classes.error : ''}`} 
                                    value={enteredDescription}
                                    onChange={(event) => descriptionChangedHandler(event.target.value)}
                                    onBlur={descriptionBlurHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-6 pe-5">
                            <div className="d-flex flex-column me-5">
                                <label className={`me-4 ${priceHasError ? classes.error : ''}`}>
                                    <span>Price </span>
                                    <span style={{color: 'red'}}>*</span>
                                </label>
                                <input 
                                    type="number" 
                                    placeholder="100" 
                                    name="price" 
                                    className={`me-4 ${priceHasError ? classes.error : ''}`} 
                                    value={enteredPrice}
                                    onChange={(event) => priceChangedHandler(event.target.value)}
                                    onBlur={priceBlurHandler}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 ps-5">
                            <div className="d-flex flex-column ms-5">
                                <label className={`me-4 ${maxPeopleHasError ? classes.error : ''}`}>
                                    <span>Max People </span>
                                    <span style={{color: 'red'}}>*</span>
                                </label>
                                <input 
                                    type="number" 
                                    placeholder="2" 
                                    name="maxPeople" 
                                    className={`me-4 ${maxPeopleHasError ? classes.error : ''}`} 
                                    value={enteredMaxPeople}
                                    onChange={(event) => maxPeopleChangedHandler(event.target.value)}
                                    onBlur={maxPeopleBlurHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="row mb-4">
                            <div className="col-md-6 d-flex flex-column">
                                <label className={`${roomsHasError ? classes.error : ''}`}>                               
                                    <span>Room Numbers </span>
                                    <span style={{color: 'red'}}>*</span>
                                </label>
                                <textarea 
                                    className={`overflow-y-scroll ${roomsHasError ? classes.error : ''}`}
                                    name="roomNumbers" 
                                    style={{minHeight: '120px'}}
                                    value={enteredRooms}
                                    placeholder="give comma between room number"
                                    onChange={(event) => roomsChangedHandler(event.target.value)}
                                    onBlur={roomsBlurHandler}
                                >
                                    {enteredRooms}
                                </textarea>
                            </div>
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

export default RoomEdit;

export async function action({request}){
    const data = await request.formData();
    const updateRoom = {
        room_id: data.get('room_id'),
        title: data.get('title'),
        price: data.get('price'),
        desc: data.get('desc'),
        maxPeople: data.get('maxPeople'),
        roomNumbers: data.get('roomNumbers'),
    };

    //Fetch update Room
    const token = tokenLoader();
    try{
        await httpRequest.post(`update-room?token=${token}`, updateRoom);
        return redirect('/room');
    }
    catch(error){
        return error.response.data;
    }
};

const loadRoom = async(room_id) => {
    const token = tokenLoader();
    try{
        const response = await httpRequest.get('edit-room/' + room_id + `?token=${token}`);
        const data = await response.data;
        return data
    }
    catch(error){
        console.log(error);
    }
};

export const loader = async({params}) => {
    const room_id = params.room_id;
    return defer({
        room: await loadRoom(room_id)
    });
};
