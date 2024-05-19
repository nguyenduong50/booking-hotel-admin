import React from 'react';
import { NavLink, Form } from 'react-router-dom';
import classes from './Sidebar.module.css';
import { tokenLoader } from '../../utils/auth';

const Sidebar = () => {
    const token = tokenLoader();

    return (
        <aside className="col-2 border-end">
           <ul>
                <li className={classes['menu-title']}>MAIN</li>
                <li className={classes['menu-link']}>
                    <NavLink to="/" className={({isActive}) => isActive ? classes.active : undefined} end>
                        <i className="fa-solid fa-gauge me-2"></i>
                        Dashboard
                    </NavLink>
                </li>
                <li className={classes['menu-title']}>LISTS</li>
                <li className={classes['menu-link']}>
                    <NavLink to="/user" className={({isActive}) => isActive ? classes.active : undefined}>
                        <i className="fa-regular fa-user me-2"></i>
                        Users
                    </NavLink>
                    
                </li>
                <li className={classes['menu-link']}>
                    <NavLink to="/hotel" className={({isActive}) => isActive ? classes.active : undefined}>
                        <i className="fa-solid fa-hotel me-2"></i>
                        Hotels
                    </NavLink>                  
                </li>
                <li className={classes['menu-link']}>
                    <NavLink to="room" className={({isActive}) => isActive ? classes.active : undefined}>
                        <i className="fa-regular fa-credit-card me-2"></i>
                        Rooms
                    </NavLink>                   
                </li>
                <li className={classes['menu-link']}>
                    <NavLink to="/transaction" className={({isActive}) => isActive ? classes.active : undefined}>
                        <i className="fa-solid fa-truck me-2"></i>
                        Transactions
                    </NavLink>                   
                </li>
                <li className={classes['menu-title']}>NEW</li>
                <li className={classes['menu-link']}>
                    <NavLink to="/create-hotel" className={({isActive}) => isActive ? classes.active : undefined}>
                        <i className="fa-solid fa-hotel me-2"></i>
                        New Hotel
                    </NavLink>                  
                </li>
                <li className={classes['menu-link']}>
                    <NavLink to="/create-room" className={({isActive}) => isActive ? classes.active : undefined}>
                        <i className="fa-regular fa-credit-card me-2"></i>
                        New Room
                    </NavLink>                  
                </li>
                <li className={classes['menu-title']}>USER</li>
                <li className={classes['menu-link']}>
                    <Form method="POST" action="/logout" className="ms-2">
                        <i className="fa-solid fa-arrow-right-from-bracket me-1"></i>
                        <button className={classes['btn-logout']}>Logout</button>
                        <input type="hidden" value={token} name="token" />
                    </Form>                   
                </li>
           </ul>
        </aside>
    );
};

export default Sidebar;