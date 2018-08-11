import React from 'react';
import './Phone.scss';

export const Phone = (props) => {
    return (
        <div className="phone">
            <img className="phone-content" src={props.image} alt="phone screenshot"/>
        </div>
    )
}
