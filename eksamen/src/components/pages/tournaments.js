import React, { useEffect, useState } from 'react'
import Fancybutton from '../fancybutton/fancybutton';
import TournamentCell from '../tournamentcell/tournamentcell';

function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      const response = await fetch('/api/v1/tournaments');
      const data = await response.json();
      setTournaments(data);
    };

    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch('/api/v1/protected-route', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setUser(data.user);
      }
    };

    fetchTournaments();
    fetchUser();
  }, []);

  const handleRegister = async (tournamentId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to register.');
      return;
    }

    const response = await fetch(`/api/v1/tournaments/${tournamentId}/register`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    if (data.success) {
    } else {
    }
  };

  return (
    <div>
      <ul className='tournament-list'>
        {tournaments.map((tournament) => (
          <TournamentCell key={tournament._id} {...tournament} src={tournament.artwork} dates={`${tournament.start_date} - ${tournament.end_date}`} onRegister={() => handleRegister(tournament._id)} />
        ))}
      </ul>
    </div>
  )
}

export default Tournaments
