import React, { useState } from 'react'
import './fancyinput.css'

function FancyInput({ placeholder, type }) {
    const [focused, setFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        if (inputValue === '') {
            setFocused(false);
        }
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div id='fancyinput'>
            <div id='fancyinput-content' className={focused || inputValue ? 'focused' : ''}>
                <input className='field' type={type} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} />
                <span className='placeholder'>{placeholder}</span>
            </div>
        </div>
    )
}

export default FancyInput
