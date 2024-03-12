import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

function Login({ handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        handleLogin(username);
        toast.success('Logged in successfully');
        setTimeout(() => {
          navigate('/account');
        }, 2000);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('An error occurred while logging in');
    }
  };

  return (
    <div id='main_window'>
      <div id='form'>
        <input type='text' placeholder='Brukernavn' value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type='password' placeholder='Passord' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='button' onClick={handleSubmit}>Logg på</button>
        <span>eller</span>
        <Link to='/signup'>Opprett bruker</Link>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
