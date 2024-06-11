import { BrowserRouter, Routes, Route } from "react-router-dom";
import Template from "./components/pages/template";
import Landing from "./components/pages/landing";
import Player from "./components/pages/player";
import Clan from "./components/pages/clan";
import Session from "./components/pages/session";
import './components/pages/styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Template />}>
          <Route index element={<Landing />} />
          <Route path="/:region/player/:playerid" element={<Player />} />
          <Route path="/:region/clan/:clanid" element={<Clan />} />
          <Route path="/session/:region/player/:playerid" element={<Session />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
