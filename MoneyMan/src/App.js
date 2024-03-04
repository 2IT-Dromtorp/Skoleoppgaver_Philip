import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './components/Layout';
import Home from './components/HomePage';
import Signup from './components/SignupPage';
import Login from './components/LoginPage';
import AccountPage from './components/AccountPage';
import './App.css';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedLoggedInStatus = localStorage.getItem('isLoggedIn');
    if (storedLoggedInStatus === 'true') {
      setIsLoggedIn(true);
      const storedUsername = localStorage.getItem('username');
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('username');
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout isLoggedIn={isLoggedIn} username={username} handleLogout={handleLogout} />}>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login handleLogin={handleLogin} />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/account' element={<AccountPage username={username} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
