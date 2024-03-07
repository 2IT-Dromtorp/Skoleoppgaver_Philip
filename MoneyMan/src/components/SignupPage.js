import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {

    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        toast.success('User created successfully');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to create user');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error('An error occurred while signing up');
    }
  };

  return (
    <div id="mainWindow">
      <div id="loginSection">
        Logo
        <div id="inputWrapper">
          <input placeholder="Brukernavn" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="Passord" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type='button' onClick={handleSignUp} id="submitButton">
          Opprett bruker
        </button>
        <Link id="blueLink" to="/login">Har du allerede en konto? Logg inn</Link>
      </div>
      <Toaster />
    </div>
  );
}

export default Signup;
