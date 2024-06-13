import React, { useState, useEffect } from 'react';
import Fancybutton from '../fancybutton/fancybutton';
import TournamentCell from '../tournamentcell/tournamentcell';

function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('/api/v1/tournaments', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch tournaments');
        }
        const data = await response.json();
        setTournaments(data);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };

    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('/api/v1/protected-route', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (!response.ok) {
            throw new Error('Failed to fetch user');
          }
          const data = await response.json();
          setUser(data.user);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };

    fetchTournaments();
    fetchUser();
  }, []);

  const handleTournamentToggle = async (tournamentId, isRegistered) => {
    const token = localStorage.getItem('token');
    if (!token || !user) {
      alert('You must be logged in to register.');
      return;
    }

    const endpoint = isRegistered
      ? `/api/v1/tournaments/${tournamentId}/unregister`
      : `/api/v1/tournaments/${tournamentId}/register`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to ${isRegistered ? 'unregister from' : 'register for'} tournament`);
      }
      const updatedTournaments = tournaments.map(tournament =>
        tournament._id === tournamentId
          ? { ...tournament, isRegistered: !isRegistered }
          : tournament
      );
      setTournaments(updatedTournaments);

      console.log(`Successfully ${isRegistered ? 'unregistered from' : 'registered for'} tournament`);
    } catch (error) {
      console.error(`Error ${isRegistered ? 'unregistering from' : 'registering for'} tournament:`, error);
    }
  };

  return (
    <div>
      <ul className='tournament-list'>
        {tournaments.map(tournament => (
          <TournamentCell
            key={tournament._id}
            {...tournament}
            src={tournament.artwork}
            dates={`${tournament.start_date} - ${tournament.end_date}`}
            isRegistered={tournament.isRegistered || false}
            onToggle={() => handleTournamentToggle(tournament._id, tournament.isRegistered)}
          />
        ))}
      </ul>
    </div>
  );
}

export default Tournaments;
