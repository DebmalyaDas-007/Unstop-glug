import React from 'react'
import Loginpage from './pages/Loginpage.jsx'
import { BrowserRouter, Routes,Route} from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard.jsx'
import Landingpage from './pages/Landingpage.jsx'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/login" element={<Loginpage/>}/>
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  </BrowserRouter>
  
  
   
  )
}

export default App
