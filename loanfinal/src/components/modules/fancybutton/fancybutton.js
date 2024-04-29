import React from 'react';
import './fancybutton.css';

function FancyButton({ name, onClick }) {
  return (
    <div id='button' className='button' onClick={onClick}>
        <div id='content' className='button'>
            <span id='name' className='button'>{name}</span>
        </div>
    </div>
  );
}

export default FancyButton;
