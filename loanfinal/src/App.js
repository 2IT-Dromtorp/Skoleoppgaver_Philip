import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Template from "./components/pages/template";
import Landing from "./components/pages/landing";
import Loan from "./components/pages/loan/loan";
import Login from "./components/pages/login/login";
import Signup from "./components/pages/signup/signup";
import Account from "./components/pages/account/account";
import '../src/components/global.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Template />}>
          <Route index element={<Landing />} />
          <Route path="/loan" element={<Loan />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account/:userid" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
