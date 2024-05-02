import React, { useState, useEffect, useRef } from 'react';
import './fancydropdown.css';

function FancyDropdown({ options, placeholder, selectedOption, onSelect }) {
  const [isActive, setIsActive] = useState(false);
  const [currentOption, setCurrentOption] = useState(selectedOption || "-");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  const handleOptionClick = (option) => {
    onSelect(option);
    setCurrentOption(option);
    setIsActive(false);
  };

  return (
    <div className='dropdown' ref={dropdownRef} id={isActive ? 'active' : ''}>
      <div className='content' onClick={toggleDropdown}>
        <span>{currentOption}</span>
        <span className='dropdown-placeholder'>{placeholder}</span>
      </div>
      <ul className='options'>
        {options.map((option, index) => (
          <li key={index} className='item' onClick={() => handleOptionClick(option)}>{option}</li>
        ))}
      </ul>
    </div>
  );
}

export default FancyDropdown;