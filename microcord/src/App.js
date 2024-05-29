import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/pages/layout';
import Landing from './components/pages/landing';
import Chat from './components/pages/chat';
import Server from './components/pages/server';
import Channel from './components/pages/channel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path='/c/:chatid' element={<Chat />} />
          <Route path='/channels/:serverid' element={<Server />}>
            <Route path=':channelid' element={<Channel />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
