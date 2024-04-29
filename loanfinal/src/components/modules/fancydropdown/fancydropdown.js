import React, { useState } from 'react';
import './fancydropdown.css';

function FancyDropdown({ options, placeholder, selectedOption, onSelect }) {
  const [isActive, setIsActive] = useState(false);
  const [currentOption, setCurrentOption] = useState(selectedOption || "-");

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  const handleOptionClick = (option) => {
    onSelect(option);
    setCurrentOption(option);
    setIsActive(false);
  };

  return (
    <div id='dropdown' className={isActive ? 'active' : ''}>
      <div id='content' onClick={toggleDropdown}>
        <span>{currentOption}</span>
        <span id='placeholder' className='dropdown'>{placeholder}</span>
      </div>
      <ul id='options'>
        {options.map((option, index) => (
          <li key={index} id='item' onClick={() => handleOptionClick(option)}>{option}</li>
        ))}
      </ul>
    </div>
  );
}

export default FancyDropdown;
