import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../images/MoneyMan.png';
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
        navigate('/account');
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('An error occurred while logging in');
    }
  };

  return (
    <div id="main">
      <div id='loginSection'>
        <img id="logo" src={Logo} alt="Logo" />
        <div id='inputWrapper'>
          <input type='text' placeholder='Brukernavn' value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div id='inputWrapper'>
          <input type='password' placeholder='Passord' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type='button' id='submitButton' onClick={handleSubmit}>Logg inn</button>
        <span>eller</span>
        <Link id='signupLink' to='/signup'>Opprett bruker</Link>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
