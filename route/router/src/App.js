import { BrowserRouter, Route, Routes } from "react-router-dom"
import { About } from "./pages/About"
import { Home } from "./pages/Home"
import { Testing } from "./pages/Testing"
import { Oppg1 } from "./pages/Oppg1"
import Layout from "./pages/layout"
import "./App.css"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="testing" element={<Testing />} />
                    <Route path="home" element={<Home />} />
                    <Route path="oppg1" element={<Oppg1 />} />
                </Route>
            </Routes>
        </BrowserRouter>

    )
}

export default App;