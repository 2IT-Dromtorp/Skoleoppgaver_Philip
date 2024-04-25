import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './components/_global/global.css';
import Template from './components/template/template';
import Landing from './components/landing/landing';
import Player from './components/player/player';
import Clan from './components/clan/clan';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Template />}>
          <Route index element={<Landing />} />
          <Route path="/player/:region/:accountid" element={<Player />} />
          <Route path="/clan/:region/:clanid" element={<Clan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
