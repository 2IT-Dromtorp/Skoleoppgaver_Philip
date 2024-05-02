import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './account.css';

function Account() {
  return (
    <main className='main'>
      <section className='account-section-module'>
        <div className='account-module-data-content'>
          <span className='module-header'>Velkommen, NAME NAME</span>
          <div className='account-preview'>
            <img className='account-preview-image' draggable='false' alt="Profile" />
            <div className='account-preview-data'>
              <span className='account-preview-email'>EMAIL@DOMAIN.ORG</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Account;