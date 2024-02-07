import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./components/home";
import Klubb from "./components/klubb";
import Buss from "./components/buss";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="klubb" element={<Klubb />} />
          <Route path="buss" element={<Buss />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
