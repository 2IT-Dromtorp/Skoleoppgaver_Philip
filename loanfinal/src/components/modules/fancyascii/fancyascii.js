import React from 'react';
import './fancyascii.css';

function FancyAscii({ src }) {
  return (
    <pre className='ascii-output'>
      <img className='ascii-image' draggable='false' src={src}/>
    </pre>
  );
}

export default FancyAscii;
