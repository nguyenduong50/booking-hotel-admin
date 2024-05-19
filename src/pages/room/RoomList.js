import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import httpRequest from '../../utils/http-request';
import ErrorModal from '../../components/UI/ErrorModal';
import { tokenLoader } from '../../utils/auth';

const RoomList = ({rooms}) => {
    const navigate = useNavigate();
    const [roomDelete, setRoomDelete] = useState({});
    const [roomSelected, setRoomSelected] = useState(rooms);
    const [isBtnDeleteRooms, setIsBtnDeleteRooms] = useState(null);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const token = tokenLoader();

    const errorHandler = () => {
        setError(null);
    };

    const increasePageHandle = () => {
        if(page >= rooms.length - 1){
            setPage(0);
            return;
        }

        setPage(page + 1);
    };

    const decreasePageHandle = () => {
        if(page === 0){
            setPage(rooms.length - 1);
            return;
        }

        setPage(page - 1);
    };

    const roomEditHandle = (room_id) => {
        navigate('/room/' + room_id);
    };

    const roomDeleteModalHandle = (room) => {
        setRoomDelete(room);
    };

    const roomDeleteHandle = async(room_id) => {
        try{
            await httpRequest.post(`destroy-room?token=${token}`, {room_id: room_id});
            return window.location.reload();
        }
        catch(error){
            setError(error.response.data);
        }
    };

    const roomsDeleteModalHandle = async() => {
        if(!roomSelected){
            return;
        }
        
        const listRoomSelectedTem = roomSelected.filter(item => item?.isChecked === true);

        if(listRoomSelectedTem.length === 0){
            setIsBtnDeleteRooms(false)
        }

        if(listRoomSelectedTem.length > 0){
            setIsBtnDeleteRooms(true)
        }
    };

    const roomsDeleteHandle = async() => {
        try{
            await httpRequest.post(`destroy-rooms?token=${token}`, {roomList: roomSelected});           
            return window.location.reload();
        }
        catch(error){
            setError(error.response.data);
        }
    };

    const changeCheckboxHandle = (event, _id) => {
        const {name, checked} = event.target;

        if(name === "checkAll"){
            let temRooms = roomSelected.map(room => {
                return {...room, isChecked: checked};
            });
            setRoomSelected(temRooms);
        }
        
        if(name === "checkItem"){
            let temRooms = roomSelected.map(room => {
                return room._id === _id ? {...room, isChecked: checked} : room;
            });
            setRoomSelected(temRooms);
        }
    };

    useEffect(() => {
        setRoomSelected(rooms[page]);
    }, [rooms, page]);

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
                <h2 className="fs-4 text-secondary">Room List</h2>
                <div>
                    <button 
                        className="btn btn-outline-danger btn-sm me-2" 
                        data-bs-target="#deleteRoomsModal"
                        data-bs-toggle="modal"
                        onClick={roomsDeleteModalHandle}
                    >
                        Delete
                    </button>
                    <Link to="/create-room" className="btn btn-outline-success btn-sm">Add new</Link>
                </div>
            </div>
            {/* Table list Room */}
            <div className="border rounded-3 box-shadow-sm">
                <table className="table mt-1 mb-0">
                    <thead className="">
                        <tr className="">
                            <th scope="col" className="border-end">
                                <input 
                                    type="checkbox" 
                                    name="checkAll"
                                    checked={roomSelected ? roomSelected.filter(room => room?.isChecked !== true).length < 1 : false}
                                    onChange={(event) => changeCheckboxHandle(event)} 
                                />
                            </th>
                            <th scope="col" className="border-end">ID</th>
                            <th scope="col" className="border-end">Title</th>
                            <th scope="col" className="border-end">Description</th>
                            <th scope="col" className="border-end">Price</th>
                            <th scope="col" className="border-end">Max People</th>                           
                            <th scope="col" className="">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        !roomSelected && 
                        <tr>
                            <td colSpan="7" className="text-center">
                                <span>No records have been create yet </span>
                                <Link to="/create-room" className="text-primary text-decoration-underline">Go to Create Room</Link>
                            </td>
                        </tr>
                    }
                    {
                        roomSelected && 
                        roomSelected.map((room) => (
                            <tr key={room._id}>
                                <td>
                                    <input 
                                        type="checkbox" 
                                        name="checkItem"
                                        checked={room?.isChecked || false}
                                        onChange={(event) => changeCheckboxHandle(event, room._id)} 
                                    />
                                </td>
                                <td style={{width: '250px'}}>{room._id}</td>
                                <td>{room.title}</td>
                                <td>{room.desc}</td>
                                <td>{room.price}</td>
                                <td>{room.maxPeople}</td>
                                <td>
                                    <button 
                                        type="button"
                                        className="btn btn-outline-success btn-sm me-2"
                                        onClick={() => roomEditHandle(room._id)} 
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        type="button"
                                        className="btn btn-outline-danger btn-sm" 
                                        data-bs-target="#deleteModal"
                                        data-bs-toggle="modal"
                                        onClick={() => roomDeleteModalHandle(room)}
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
                    <span className="me-3">{page + 1} of {rooms.length}</span>
                    <button className="border-0 bg-transparent text-black-50" onClick={decreasePageHandle}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <button className="border-0 bg-transparent text-black-50" onClick={increasePageHandle}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
            {/* Form delete room modal */}
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteRoomModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="deleteRoomModalLabel">Are you delete this Room?</h1>
                            <button 
                                type="button" 
                                className="btn-close" 
                                data-bs-dismiss="modal" 
                                aria-label="Close" 
                                onClick={() => roomDeleteModalHandle({})}>
                            </button>
                        </div>
                        <div className="modal-body">
                            <span className="fw-bold">Room: </span>
                            <span>{roomDelete.title}</span>
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                data-bs-dismiss="modal"
                                onClick={() => roomDeleteModalHandle({})}
                            >
                                Cancel
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-danger" 
                                data-bs-dismiss="modal"
                                onClick={() => roomDeleteHandle(roomDelete._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Form delete rooms modal */}
            <div className="modal fade" id="deleteRoomsModal" tabIndex="-1" aria-labelledby="deleteRoomsModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="deleteRoomsModalLabel">Warning!</h1>
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
                                isBtnDeleteRooms && (
                                    <>
                                        <p className="fw-bold">This action will delete multiple rooms at once. Be careful.</p>
                                        <p>Are you sure you want to delete these rooms in bulk?</p>
                                    </>
                                )
                            }
                            {
                                !isBtnDeleteRooms && (
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
                                disabled={!isBtnDeleteRooms ? true : false}
                                onClick={roomsDeleteHandle}
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

export default RoomList;