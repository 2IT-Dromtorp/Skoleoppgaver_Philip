import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Profile() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken);
      setUserInfo(decodedToken);
    }
  }, []);

  return (
    <div className='profile-page-wrapper'>
      <div className='profile-info-wrapper'>
        {userInfo && (
          <>
            <h1 className='title'>Welcome, {userInfo.name}</h1>
            <img draggable='false' className='profile-picture' src={userInfo.profile_picture} alt='Profile' />
          </>
        )}
      </div>
      <div className='profile-tournaments-wrapper'></div>
    </div>
  );
}

export default Profile;
