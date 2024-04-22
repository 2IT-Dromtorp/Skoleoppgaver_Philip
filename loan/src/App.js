import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Template from './components/template';
import Landing from './components/landing';
import './global/global.css';
import './modules/navbar/navbar.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Template />}>
          <Route path='/' element={<Landing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
