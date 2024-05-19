import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/root/RootLayout";
import AuthPage from "../pages/auth/Auth";
import HomePage from "../pages/home/Home";
import HotelPage from "../pages/hotel/Hotel";
import HotelCreate from "../pages/hotel/HotelCreate";
import HotelEdit from "../pages/hotel/HotelEdit";
import TrashHotel from "../pages/hotel/TrashHotel";
import RoomPage from "../pages/room/Room";
import RoomCreate from "../pages/room/RoomCreate";
import RoomEdit from "../pages/room/RoomEdit";
import UserPage from "../pages/user/User";
import TransactionPage from "../pages/transaction/Transaction";
import ErrorPage from "../pages/errorPage/ErrorPage";

import {action as authAction} from '../pages/auth/Auth';
import { checkAuthLoader, tokenLoader } from '../utils/auth';
import {action as logoutAction} from '../pages/auth/Logout';

import {loader as loaderUsers} from '../pages/user/User';
import {loader as loaderHotels} from '../pages/hotel/Hotel';
import {action as actionCreateHotel} from '../pages/hotel/HotelCreate';
import {action as actionUpdateHotel} from '../pages/hotel/HotelEdit';
import {loader as loadHotel} from '../pages/hotel/HotelEdit';
import {loader as loaderTrashHotels} from '../pages/hotel/TrashHotel';
import {loader as loaderRooms} from '../pages/room/Room';
import {action as actionCreateRoom} from '../pages/room/RoomCreate';
import {loader as loadRoom} from '../pages/room/RoomEdit';
import {action as actionUpdateRoom} from '../pages/room/RoomEdit';
import {loader as loadTransactions} from '../pages/transaction/Transaction';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        id: 'root',
        loader: checkAuthLoader,
        children: [
            {
                index: true,
                element: <HomePage />, 
            },
            {
                path: 'user',
                element: <UserPage />,
                loader: loaderUsers
            },
            {
                path: 'hotel',
                children: [
                    {
                        index: true,
                        element: <HotelPage />,
                        loader: loaderHotels,
                    },
                    {
                        path: 'trash',
                        element: <TrashHotel />,
                        loader: loaderTrashHotels
                    },
                    {
                        path: ':hotel_id',
                        element: <HotelEdit />,
                        loader: loadHotel,
                        action: actionUpdateHotel
                    },
                ]
            },
            {
                path: 'create-hotel',
                element: <HotelCreate />,
                action: actionCreateHotel
            },
            {
                path: 'room',
                children: [
                    {
                        index: true,
                        element: <RoomPage />,
                        loader: loaderRooms,
                    },
                    {
                        path: ':room_id',
                        element: <RoomEdit />,
                        loader: loadRoom,
                        action: actionUpdateRoom
                    },
                ]
            },
            {
                path: 'create-room',
                element: <RoomCreate />,
                action: actionCreateRoom
            },
            {
                path: 'transaction',
                element: <TransactionPage />,
                loader: loadTransactions
            },
            {
                path: '/logout',
                action: logoutAction
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthPage />,
        action: authAction
    }
]);

export default router;