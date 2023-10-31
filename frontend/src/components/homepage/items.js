import React from 'react';
import './items.css';


function Item(props){

    return(
        <div className='rectangle'>
            <h2>{props.feature}</h2>
        </div>
    );
}

export default Item; 