import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/pages/layout/layout";
import Landing from "./components/pages/landing/landing"
import Player from "./components/pages/player/player";
import Clan from "./components/pages/clan/clan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Landing />} />
          <Route path="/:region/player/:playerid" element={<Player />} />
          <Route path="/:region/clan/:clanid" element={<Clan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
