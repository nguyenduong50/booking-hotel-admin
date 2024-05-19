import React from 'react';
import classes from './TitleCreate.module.css';

const TitleCreate = ({title}) => {
    return (
        <div className={`${classes['title-add-page']} mt-3 py-2 px-2`}>
            <h3 className="text-black-50 fs-4 mb-0">Add New {title}</h3>
        </div>
    );
};

export default TitleCreate;