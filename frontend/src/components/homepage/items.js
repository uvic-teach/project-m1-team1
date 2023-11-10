import React from 'react';
import './items.css';
import {Button} from '@mui/material';


function Item(props){

    return(

        <div className='link'>
            <Button variant='contained' href='https://www.google.com'>{props.feature}</Button>
        </div>

        /*
        <a className='link' href='https://www.google.com' >
        <button className='button'>
            <h2>{props.feature}</h2>
        </button>
        </a>
        */
    );
}

export default Item; 