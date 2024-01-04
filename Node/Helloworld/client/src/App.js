import './App.css';
import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Select from './pages/Select';
import Update from './pages/Update';
import Delete from './pages/Delete';
import Insert from './pages/Insert';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="select" element={<Select />} />
            <Route path="update" element={<Update />} />
            <Route path="insert" element={<Insert />} />
            <Route path="delete" element={<Delete />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;