import { BrowserRouter, Route, Routes } from "react-router-dom"
import { About } from "./pages/About"
import { Home } from "./pages/Home"
import { Testing } from "./pages/Testing"
import { Oppg1 } from "./pages/Oppg1"
import { Oppg2 } from "./pages/Oppg2"
import { Oppg3 } from "./pages/Oppg3"
import Layout from "./pages/layout"
import "./App.css"
import { Klassekart } from "./pages/Klassekart"
import Profile from "./pages/Profile"
import Elev from "./pages/Elev"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/testing" element={<Testing />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/oppg1" element={<Oppg1 />} />
                    <Route path="/oppg2" element={<Oppg2 />} />
                    <Route path="/oppg3" element={<Oppg3 />} />
                    <Route path="/klassekart" element={<Klassekart />} />
                    <Route path="/klassekart/profile/:name" element={<Profile />} />
                    <Route path="/elev" element={<Elev />} />
                </Route>
            </Routes>
        </BrowserRouter>

    )
}

export default App;