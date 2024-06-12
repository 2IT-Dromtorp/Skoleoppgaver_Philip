import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/pages/layout';
import Landing from './components/pages/landing';
import Profile from './components/pages/profile';
import Login from './components/pages/login';
import Register from './components/pages/register';
import Addproduct from './components/pages/addproduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/addproduct' element={<Addproduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
