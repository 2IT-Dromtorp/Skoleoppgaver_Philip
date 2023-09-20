import { Route, Routes } from "react-router-dom"
import { About } from "./pages/About"
import { Home } from "./pages/Home"
import { Testing } from "./pages/Testing"

function App() {
  return (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/testing" element={<Testing />} />
  </Routes>
  )
}

export default App;