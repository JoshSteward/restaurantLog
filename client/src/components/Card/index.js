import React from 'react';

export const Card = (props) => (
    <div className="card">
        <div className="Header">
            <h3>{props.title}</h3>
        </div>
        <div className="card-body">
            {props.children}
        </div>
    </div>
);

export default Card; 
