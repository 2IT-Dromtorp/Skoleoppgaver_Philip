import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultProfile from '../../../assets/default_profile.jpg';
import { jwtDecode } from 'jwt-decode';
import './account.css';

function Account() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    const decodedToken = jwtDecode(token);
    const username = `${decodedToken.firstName} ${decodedToken.lastName}`;
    setUsername(username);
    setEmail(decodedToken.email);
  }, [])

  const navigate = useNavigate();
  return (
    <main className='main'>
      <section className='account-section-module'>
        <div className='account-module-data-content'>
          <span className='module-header'>Velkommen, {username}</span>
          <div className='account-preview'>
            <img className='account-preview-image' src={DefaultProfile} draggable='false' alt="Profile" />
            <div className='account-preview-data'>
              <span className='account-preview-email'>{email}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Account;