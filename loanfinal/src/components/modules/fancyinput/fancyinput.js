import React, { useState } from 'react'
import './fancyinput.css'

function FancyInput({ placeholder, type, value, onChange }) {
    const [focused, setFocused] = useState(false);

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        if (value === '') {
            setFocused(false);
        }
    };

    const handleChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <div id='fancyinput'>
            <div id='fancyinput-content' className={focused || value ? 'fancyinput-content-focused' : ''}>
                <input
                value={value}className='field' type={type} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} />
                <span className='placeholder'>{placeholder}</span>
            </div>
        </div>
    )
}

export default FancyInput