import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Layout from "./components/layout/layout.js";
import Landing from "./components/pages/landing/landing";
import Loan from "./components/pages/loan/loan";
import Login from "./components/pages/login/login";
import Signup from "./components/pages/signup/signup";
import Account from "./components/pages/account/account";
import '../src/components/global.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/3000" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/loan" element={<Loan />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
