import React, { useState, useEffect } from 'react';
import './fancyinput.css';
import pweye from '../../../assets/pweye.svg';

function FancyInput({ name, type, value, onChange, required }) {
    const [focused, setFocused] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

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
        onChange(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='fancy-input'>
            <div id='input-content' className={focused || inputValue ? 'focused' : ''}>
                <input type={showPassword ? 'text' : type} state className='field' onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} value={inputValue}
                    required={required} />
                {type === 'password' && (
                    <img src={pweye} id='pweye' alt='toggle password visibility' className='password-toggle' onClick={togglePasswordVisibility} />
                )}
                <span className='placeholder'>{name}</span>
            </div>
        </div>
    );
}

export default FancyInput;
