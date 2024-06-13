import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import TournamentCell from '../tournamentcell/tournamentcell';
import Fancybutton from '../fancybutton/fancybutton';

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const [registeredTournaments, setRegisteredTournaments] = useState([]);
  const [userSports, setUserSports] = useState([]);

  useEffect(() => {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken);
      console.log("User Info:", decodedToken);
      setUserInfo(decodedToken);
      fetchUserInfo();
    }
  }, []);

  const fetchUserInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('/api/v1/user-info', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }

      const data = await response.json();
      setUserInfo(data.user);
      setUserSports(data.user.sport || []);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    const fetchRegisteredTournaments = async () => {
      const token = localStorage.getItem('token');
      if (!token || !userInfo) return;

      try {
        const response = await fetch('/api/v1/registered-tournaments', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch tournaments');
        }
        const data = await response.json();
        setRegisteredTournaments(data);
        console.log("Registered Tournaments:", data);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };

    fetchRegisteredTournaments();
  }, [userInfo]);

  const handleSportToggle = async (sport) => {
    const token = localStorage.getItem('token');
    if (!token || !userInfo) return;

    const isSignedUp = userSports.includes(sport);
    const endpoint = isSignedUp ? `/api/v1/sport/${sport}/signoff` : `/api/v1/sport/${sport}/signup`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isSignedUp ? 'sign off' : 'sign up'} for ${sport}`);
      }

      fetchUserInfo();
      console.log(`Successfully ${isSignedUp ? 'signed off' : 'signed up'} for ${sport}`);
    } catch (error) {
      console.error(`Error ${isSignedUp ? 'signing off' : 'signing up'} for ${sport}:`, error);
    }
  };

  return (
    <div className='profile-page-wrapper'>
      <div className='profile-info-wrapper'>
        {userInfo && (
          <>
            <h1 className='title'>Welcome, {userInfo.name}</h1>
            <img draggable='false' className='profile-picture' src={userInfo.profile_picture} alt='Profile' />
            <div className='profile-sports-flex'>
              <ul className='sports-container'>
                {['Football', 'Volleyball', 'Basketball'].map(sport => (
                  <Sportbox
                    key={sport}
                    sport={sport}
                    isSignedUp={userSports.includes(sport)}
                    onToggle={() => handleSportToggle(sport)}
                  />
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
      <div className='profile-tournaments-wrapper'>
        <ul className='tournament-list'>
          {registeredTournaments.map(tournament => (
            <TournamentCell key={tournament._id} tournament={tournament} name={tournament.name} description={tournament.description} format={tournament.format} timestamp={tournament.timestamp} src={tournament.artwork} dates={`${tournament.start_date} - ${tournament.end_date}`} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;

const Sportbox = ({ sport, isSignedUp, onToggle }) => {
  return (
    <div className='sportbox-flex'>
      <div className='sportbox-content'>
        <span className='sportbox-text'>{sport}</span>
        <div className='sportbox-button'>
          <Fancybutton text={isSignedUp ? 'Sign off' : 'Sign up'} onClick={onToggle} />
        </div>
      </div>
    </div>
  )
}