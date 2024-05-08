import React, { useEffect, useState, useRef } from 'react';
import './landing.css';
import { useNavigate, Link } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();
  const [playerSearch, setPlayerSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('EU');
  const [players, setPlayers] = useState([]);
  const debounceRef = useRef(null);

  const handleInputChange = (value) => {
    setPlayerSearch(value);
  };

  useEffect(() => {
    const fetchPlayers = () => {
      if (playerSearch.length < 3) {
        setPlayers([]);
        return;
      }

      const playerAPIURL = `https://api.wotblitz.${selectedRegion}/wotb/account/list/?application_id=b7f9551476c817ea6d70e0ce36e3e1bf&search=${playerSearch}`;
      fetch(playerAPIURL)
        .then(response => response.json())
        .then(data => {
          if (data.status === 'ok' && data.data.length > 0) {
            fetchClanData(data.data.slice(0, 5)); // Show only 5 players
          } else {
            setPlayers([]);
          }
        })
        .catch(error => {
          console.error('Error fetching player data:', error);
          setPlayers([]);
        });
    };

    const fetchClanData = (playersData) => {
      const promises = playersData.map(player =>
        fetch(`https://api.wotblitz.${selectedRegion}/wotb/clans/accountinfo/?application_id=b7f9551476c817ea6d70e0ce36e3e1bf&account_id=${player.account_id}&extra=clan`)
          .then(response => response.json())
          .then(clanData => ({
            ...player,
            clanTag: clanData.data && clanData.data[player.account_id] && clanData.data[player.account_id].clan ? `[${clanData.data[player.account_id].clan.tag}]` : ''
          }))
          .catch(() => ({
            ...player,
            clanTag: '' // If no clan tag, display nothing
          }))
      );

      Promise.all(promises).then(results => {
        setPlayers(results);
      });
    };

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(fetchPlayers, 300);
    return () => clearTimeout(debounceRef.current);
  }, [playerSearch, selectedRegion]);

  return (
    <main className='main'>
      <section className='landing-module'>
        <div className='landing-module-content'>
          <div className='field'>
            <div className='search-field'>
              <FancyInput placeholder='Search for players' value={playerSearch} onChange={handleInputChange} />
              <FancyDropdown
                options={['EU', 'COM', 'ASIA']}
                selectedRegion={selectedRegion}
                onSelect={setSelectedRegion}
              />
            </div>
            <ul className='field-list'>
              {players.map((player, index) => (
                <li key={index} className='field-list-item'>
                  <Link to={`/${selectedRegion.toLowerCase()}/player/${player.account_id}`} className='list-item-clickable'>
                    <div className='list-player'>
                      <span>{player.nickname}</span>
                      <span>{player.clanTag}</span>
                    </div>
                    <span>{selectedRegion}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Landing;

const FancyInput = ({ value, placeholder, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className='fancyinput'>
      <div className='fancyinput-content'>
        <input className='fancyinput-field' placeholder={placeholder} value={value} onChange={handleChange} />
      </div>
    </div>
  );
};

const FancyDropdown = ({ options, selectedRegion, onSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className='fancydropdown' ref={dropdownRef}>
      <div className='fancydropdown-content' onClick={toggleDropdown}>
        <div className='value'>
          <span>{selectedRegion}</span>
        </div>
        {isDropdownOpen && (
          <ul className='dropdown-list'>
            {options.map((option, index) => (
              <li key={index} className='item' onClick={() => handleOptionClick(option)}>{option}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};