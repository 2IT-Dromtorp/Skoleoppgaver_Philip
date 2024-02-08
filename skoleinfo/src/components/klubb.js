import React, { useState, useEffect } from 'react';
import klubber from './klubber.json';

function Klubb() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    setClubs(klubber);
  }, []);
  return (
    <div id='klubb-container'>
      {
        clubs.map(club => (
          <div key={club.id} id='klubb'>
            <p id='klubbNavn'>{club.navn}</p>
            <p>{club.regi}</p>
            <p>{club.lokasjon}</p>
            <p>{club.tider}</p>
          </div>
        ))
      }
    </div>
  );
}

export default Klubb;
