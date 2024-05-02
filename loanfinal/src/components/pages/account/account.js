import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultProfile from '../../../assets/default_profile.jpg';
import './account.css';

function Account() {

  const navigate = useNavigate();
  return (
    <main className='main'>
      <section className='account-section-module'>
        <div className='account-module-data-content'>
          <span className='module-header'>Velkommen, {localStorage.getItem('username')}</span>
          <div className='account-preview'>
            <img className='account-preview-image' src={DefaultProfile} draggable='false' alt="Profile" />
            <div className='account-preview-data'>
              <span className='account-preview-email'>{localStorage.getItem('email')}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Account;