import { BrowserRouter, Route, Routes } from "react-router-dom";
import Template from "./components/pages/template";
import Landing from "./components/pages/landing";
import Profile from "./components/pages/profile";
import Login from "./components/pages/login";
import Registration from "./components/pages/registration";
import Tournaments from "./components/pages/tournaments";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={<Template />}>
          <Route index element={<Landing />} />
          <Route path="/profile/:profileid" element={<Profile />} />
          <Route path="/tournaments" element={<Tournaments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
