import React from 'react'
import Loginpage from './pages/Loginpage.jsx'
import { BrowserRouter, Routes,Route} from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard.jsx'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Loginpage />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  </BrowserRouter>
  
  
   
  )
}

export default App
