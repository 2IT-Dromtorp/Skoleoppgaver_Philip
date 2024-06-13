import React from 'react'
import './fancybutton.css'

function Fancybutton({ text, onClick, disabled, style }) {
    return (
        <div className='button-wrapper'>
            <button className='button' style={style} onClick={onClick} disabled={disabled}>
                {text}
            </button>
        </div>
    )
}

export default Fancybutton
