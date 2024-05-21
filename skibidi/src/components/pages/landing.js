import React, { useState } from 'react';
import "../styles/landing.css";
import "../styles/fancyinput.css";
import "../styles/fancydropdown.css";

function Landing() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('EU');

  const handleSearchQuery = (value) => {
    setSearchQuery(value);
  }

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  }

  const playerSearch = () => {
    const url = `https://api.wotblitz.${selectedRegion}/wotb/account/list/?application_id=b7f9551476c817ea6d70e0ce36e3e1bf&search=${searchQuery}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }  

  return (
    <main id='module'>
      <section className='landing-section'>
        <div className='lm-content'>
          <div className='lm-search-field'>
            <FancyInput onChange={handleSearchQuery} />
            <FancyDropdown
              selectedOption={selectedRegion}
              options={['EU', 'COM', 'ASIA']}
              onSelect={handleRegionChange} />
          </div>
          <ul className='lm-list'>

          </ul>
        </div>
      </section>
    </main>
  );
}

export default Landing;

const FancyInput = ({ onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div id='fancyinput'>
      <div className='fi-content'>
        <input className='fi-field' onChange={handleChange} />
      </div>
    </div>
  );
};

const FancyDropdown = ({ selectedOption, options, onSelect }) => {
  return (
    <div id='fancydropdown'>
      <div className='fd-content'>
        <span className='fd-textbox'>{selectedOption}</span>
        <ul className='fd-list'>
          {options.map((option, index) => (
            <li key={index} className='fd-option' onClick={() => onSelect(option)}>
              <span className='fd-option-textbox'>{option}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
