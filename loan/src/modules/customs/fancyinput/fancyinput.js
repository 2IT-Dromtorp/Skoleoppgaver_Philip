import React, { useState } from 'react';
import './fancyinput.css';

function FancyInput({ placeholder, type, value }) {
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
        <div id='fancy-input'>
            <div id='input-content' className={focused || inputValue ? 'focused' : ''}>
                <input type={type}
                    id='field'
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                <span id='placeholder'>{placeholder}</span>
            </div>
        </div>
    );
}

export default FancyInput;
