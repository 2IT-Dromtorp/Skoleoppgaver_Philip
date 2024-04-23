import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Template from './components/template';
import Landing from './components/landing/landing';
import Account from './components/account/account';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import './global/global.css';
import './modules/navbar/globalnav.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Template />}>
          <Route path='/' element={<Landing />} />
          <Route path='/account' element={<Account />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
