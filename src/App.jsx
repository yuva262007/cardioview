 import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import Assessment from './pages/Assessment/Assessment'
import Anatomy from './pages/Anatomy/Anatomy'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/anatomy" element={<Anatomy />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App