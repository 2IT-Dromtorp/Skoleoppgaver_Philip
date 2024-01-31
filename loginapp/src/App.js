import './App.css';
import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = (event) => {
    event.preventDefault();

    if (username === 'mongo' && password === 'db') {
      window.location.href = 'http://localhost:3000/andreas';
    } else if (username === 'mattis' && password === 'password') {
      window.location.href = 'http://localhost:3000/mattis';
    }
  };

  return (
    <div id='main'>
      <div id='loginform'>
        <input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={login}>Logg Inn</button>
      </div>
    </div>
  );
}

export default App;