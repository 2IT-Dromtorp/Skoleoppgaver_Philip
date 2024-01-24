// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './components/Home';
import Chat from './components/Chat';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="chat" element={<Chat />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;