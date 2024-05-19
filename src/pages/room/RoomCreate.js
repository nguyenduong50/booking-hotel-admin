import React, {useState, useEffect} from 'react';
import { Form, useActionData, redirect } from 'react-router-dom';
import classes from './RoomCreate.module.css';
import TitleCreate from '../../components/titleCreate/TitleCreate';
import ErrorModal from '../../components/UI/ErrorModal';
import useInput from '../../hooks/use-input';
import httpRequest from '../../utils/http-request';
import { tokenLoader } from '../../utils/auth';

const RoomCreate = () => {
    const data = useActionData();
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
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredPrice,
        isValid: enteredPriceIsValid,
        hasError: priceHasError,
        valueChangeHandler: priceChangedHandler,
        inputBlurHandler: priceBlurHandler,
        //reset: resetpriceInput
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredRooms,
        isValid: enteredRoomsIsValid,
        hasError: roomsHasError,
        valueChangeHandler: roomsChangedHandler,
        inputBlurHandler: roomsBlurHandler,
        //reset: resetRoomsInput
    } = useInput(value => value.trim() !== '');

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

export default RoomCreate;

export async function action({request}){
    const data = await request.formData();
    const newRoom = {
        title: data.get('title'),
        price: data.get('price'),
        desc: data.get('desc'),
        maxPeople: data.get('maxPeople'),
        roomNumbers: data.get('roomNumbers'),
    };
    const token = tokenLoader();

    //Fetch create Hotel
    try{
        await httpRequest.post(`create-room?token=${token}`, newRoom);
        return redirect('/room');
    }
    catch(error){
        return error.response.data;
    }
};