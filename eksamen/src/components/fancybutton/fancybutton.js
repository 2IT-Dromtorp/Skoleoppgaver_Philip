import React from 'react'
import './fancybutton.css'

function Fancybutton({ text, onClick, disabled }) {
    return (
        <div className='button-wrapper'>
            <button className='button' onClick={onClick} disabled={disabled}>
                {text}
            </button>
        </div>
    )
}

export default Fancybutton
