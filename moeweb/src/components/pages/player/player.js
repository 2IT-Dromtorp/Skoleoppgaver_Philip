import React, { useEffect } from 'react';
import './player.css';
import { useParams } from 'react-router-dom';

function Player() {
  const { region, playerid } = useParams();

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const url = `https://api.wotblitz.${region}/wotb/account/info/?application_id=b7f9551476c817ea6d70e0ce36e3e1bf&account_id=${playerid}`;
        console.log(`Request URL: ${url}`);
        const response = await fetch(url);
        if (!response.ok) {
          console.log('Player not found (skibidi)')
        }
        const data = await response.json();
        console.log('Response:', data);
        const player = data.data
        
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchPlayer();
  }, [region, playerid]);

  return (
    <main className='main'>
      <section className='player-module'>
        <div className='player-module-content'>
          
        </div>
      </section>
    </main>
  );
}

export default Player;