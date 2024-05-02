import React, { useState } from 'react'
import './fancyinput.css'

function FancyInput({ placeholder, type, value, onChange, accept }) {
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
        <div id='input'>
            <div id='content' className={focused || value ? 'content-focused' : ''}>
                <input
                value={value} id='field' required type={type} accept={accept} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} />
                <span id='placeholder'>{placeholder}</span>
            </div>
        </div>
    )
}

export default FancyInput