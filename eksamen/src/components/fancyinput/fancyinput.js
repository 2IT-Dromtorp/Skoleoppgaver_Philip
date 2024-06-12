import React, { useState } from 'react'
import './fancyinput.css'

function Fancyinput({ type, value, onChange, placeholder }) {
    const [isFocused, setIsFocused] = useState(false)

    const handleFocus = () => setIsFocused(true)
    const handleBlur = () => setIsFocused(false)

    return (
        <div className={`input-wrapper ${isFocused ? 'focused' : ''} ${value ? 'not-empty' : ''}`}>
            <input className='input' type={type} value={value} onChange={onChange} onFocus={handleFocus} onBlur={handleBlur} required />
            <label className='input-label'>{placeholder}</label>
        </div>
    )
}

export default Fancyinput
