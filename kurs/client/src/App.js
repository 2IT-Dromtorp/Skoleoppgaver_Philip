import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import logo from './logo.svg';
import './LightMode.css';
import './DarkMode.css';
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Datakunnskap from "./pages/Datakunnskap";
import Kroppsoving from "./pages/Kroppsoving";
import Norsk from "./pages/Norsk";
import Heimkunnskap from "./pages/Heimkunnskap";

function App() {
  // State for login status and email
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  // Effect to check and set login status from localStorage
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    const storedEmail = localStorage.getItem('email');

    if (storedLoggedIn && storedEmail) {
      setLoggedIn(JSON.parse(storedLoggedIn));
      setEmail(storedEmail);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setEmail={setEmail} />}>
            <Route index element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="home" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="login" element={<Login email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="register" element={<Register email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="datakunnskap" element={<Datakunnskap email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="kroppsoving" element={<Kroppsoving email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="norsk" element={<Norsk email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="heimkunnskap" element={<Heimkunnskap email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;