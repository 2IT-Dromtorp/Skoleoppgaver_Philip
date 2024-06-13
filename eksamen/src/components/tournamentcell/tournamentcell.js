import React from 'react';
import Fancybutton from '../fancybutton/fancybutton';

const TournamentCell = ({ name, src, description, format, dates, timestamp, sport, isRegistered, onToggle }) => {
  return (
    <div className='tournament-cell-wrapper'>
      <div className='tournament-cell-content'>
        <div className='cell-image-wrapper'>
          <img className='cell-image' src={src} alt={`${name} artwork`} />
          <span className='cell-tournament-title'>{name}</span>
        </div>
        <div className='cell-body'>
          <div className='cell-text'>
            <span className='cell-body-text'>{description}</span>
            <span className='cell-body-text'>{format}</span>
            <span className='cell-body-text'>{dates}</span>
            <span className='cell-body-text'>{timestamp}</span>
            <span className='cell-body-text'>{sport}</span>
          </div>
          <Fancybutton
            style={{ height: '40px' }}
            text={isRegistered ? 'Unregister' : 'Register'}
            onClick={onToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default TournamentCell;
