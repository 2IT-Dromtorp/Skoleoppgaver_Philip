import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Player() {
  const { region, playerid } = useParams();
  const [player, setPlayer] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [playerResponse, clanResponse] = await Promise.all([
          fetchPlayer(),
          fetchClan(),
        ]);

        setPlayer({
          ...playerResponse[playerid],
          clan: clanResponse[playerid]?.clan || null,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [region, playerid]);

  const fetchPlayer = async () => {
    const URL = `https://api.wotblitz.${region}/wotb/account/info/?application_id=b7f9551476c817ea6d70e0ce36e3e1bf&account_id=${playerid}`;
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error('Failed to fetch player data');
    }
    const data = await response.json();
    return data.data;
  };

  const fetchClan = async () => {
    const URL = `https://api.wotblitz.${region}/wotb/clans/accountinfo/?application_id=b7f9551476c817ea6d70e0ce36e3e1bf&extra=clan&account_id=${playerid}`;
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error('Failed to fetch clan data');
    }
    const data = await response.json();
    return data.data;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const { wins, damage_dealt, damage_received, frags, survived_battles } = player.statistics.all;

  const winrate = ((wins / player.statistics.all.battles) * 100).toFixed(2);
  const avgDamage = (damage_dealt / player.statistics.all.battles).toFixed(0);
  const damageRatio = (damage_dealt / damage_received).toFixed(2);
  const deaths = player.statistics.all.battles - player.statistics.all.survived_battles;
  const kdr = (frags / deaths).toFixed(2);
  const survivalRate = ((survived_battles / player.statistics.all.battles) * 100).toFixed(2);
  const bsRating = ((wins * 0.4) + (damage_dealt * 0.00002) + (damageRatio * 20) + (frags * 0.3) + (survived_battles * 0.1)).toFixed(0);

  return (
    <div className='wrapper'>
      <div>
        <section className='player-box'>
          <div className='header'>
            <span className='header-cell'>{region.toUpperCase()}</span>
            <span className='header-cell'>{player.nickname}</span>
            <span className='header-cell'>{player.clan ? player.clan.tag : 'No Clan'}</span>
          </div>
          <div className='ps-stats'>
            <h1 className='cs-header'>Career Stats</h1>
            <StatRow stat='Battles' value={player.statistics.all.battles} />
            <StatRow stat='Winrate' value={`${winrate}%`} />
            <StatRow stat='Avg Dmg' value={avgDamage} />
            <StatRow stat='Dmg ratio' value={damageRatio} />
            <StatRow stat='Kdr' value={kdr} />
            <StatRow stat='Survival' value={`${survivalRate}%`} />
            <StatRow stat='BS Rating' value={bsRating} />
            <InfoBar />
          </div>
        </section>
      </div>
    </div>
  );
}

const StatRow = ({ stat, value }) => {
  return (
    <section className='row'>
      <span className='s-cell'>{stat}</span>
      <span className='v-cell'>{value}</span>
    </section>
  );
};

const InfoBar = () => {
  return (
    <div className='info-bar'>
      <span style={{ color: '#CC0000E6' }}>*</span> BS Rating is a unique formula
    </div>
  );
};

export default Player;
