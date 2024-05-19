import React from 'react';
import classes from './Header.module.css';

const Header = () => {
    return (
        <header>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2 border-end">
                        <h2 className={classes['title-admin']}>Admin page</h2>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;