import React from 'react';
import './fancybutton.css';

function FancyButton({ text, onClick }) {
  return (
    <div id='button' className='button' onClick={onClick}>
        <div id='content' className='button'>
            <span id='name' className='button'>{text}</span>
        </div>
    </div>
  );
}

export default FancyButton;
