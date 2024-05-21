import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/pages/layout"
import Landing from "./components/pages/landing"
import Player from "./components/pages/player"
import Clan from "./components/pages/clan"
import "./components/styles/global.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />}/>
          <Route path="/:region/player/:accountid" element={<Player />}/>
          <Route path="/:region/clan/:clanid" element={<Clan />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
