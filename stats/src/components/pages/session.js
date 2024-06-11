import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Session() {
    const { region, playerid } = useParams();
    const [initialStats, setInitialStats] = useState({ battles: 0, wins: 0, damageDealt: 0 });
    const [sessionStats, setSessionStats] = useState({ battles: 0, winrate: 0, avgDamage: 0 });
    const [error, setError] = useState(null);

    // Fetch initial stats on mount
    useEffect(() => {
        const fetchInitialStats = async () => {
            try {
                const URL = `https://api.wotblitz.${region}/wotb/account/info/?application_id=b7f9551476c817ea6d70e0ce36e3e1bf&account_id=${playerid}`;
                const response = await fetch(URL);
                if (!response.ok) {
                    throw new Error('Failed to fetch initial stats');
                }
                const data = await response.json();
                const stats = data.data[playerid].statistics.all;
                setInitialStats({
                    battles: stats.battles,
                    wins: stats.wins,
                    damageDealt: stats.damage_dealt,
                });
            } catch (error) {
                setError(error.message);
            }
        };

        fetchInitialStats();
    }, [region, playerid]);

    // Fetch and update session stats every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            const fetchSessionStats = async () => {
                try {
                    const URL = `https://api.wotblitz.${region}/wotb/account/info/?application_id=b7f9551476c817ea6d70e0ce36e3e1bf&account_id=${playerid}`;
                    const response = await fetch(URL);
                    if (!response.ok) {
                        throw new Error('Failed to fetch session stats');
                    }
                    const data = await response.json();
                    const stats = data.data[playerid].statistics.all;

                    const sessionBattles = stats.battles - initialStats.battles;
                    const sessionWins = stats.wins - initialStats.wins;
                    const sessionDamage = stats.damage_dealt - initialStats.damageDealt;
                    const sessionWinrate = sessionBattles ? (sessionWins / sessionBattles * 100).toFixed(2) : 0;
                    const sessionAvgDamage = sessionBattles ? (sessionDamage / sessionBattles).toFixed(0) : 0;

                    setSessionStats({
                        battles: sessionBattles,
                        winrate: sessionWinrate,
                        avgDamage: sessionAvgDamage,
                    });
                } catch (error) {
                    setError(error.message);
                }
            };

            fetchSessionStats();
        }, 10000);

        return () => clearInterval(interval);
    }, [region, playerid, initialStats]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <section className='session-box'>
                <div className='session-header'></div>
                <div className='session'>
                    <StatBox stat='Battles' sValue={sessionStats.battles} cValue={initialStats.battles} />
                    <StatBox stat='Winrate' sValue={`${sessionStats.winrate}%`} cValue={`${(initialStats.wins / initialStats.battles * 100).toFixed(2)}%`} />
                    <StatBox stat='Avg Dmg' sValue={sessionStats.avgDamage} cValue={Math.round(initialStats.damageDealt / initialStats.battles)} />
                </div>
            </section>
        </div>
    );
}

const StatBox = ({ stat, sValue, cValue }) => {
    return (
        <div className='stat-box'>
            <span className='stat-label'>{stat}</span>
            <span className='stat-value'>{sValue}</span>
            <span className='career-value'>{cValue}</span>
        </div>
    );
};

export default Session;
