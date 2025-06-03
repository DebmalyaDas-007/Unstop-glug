import React from 'react'
import Loginpage from './pages/Loginpage.jsx'
import { BrowserRouter, Routes,Route} from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard.jsx'
import Landingpage from './pages/Landingpage.jsx'
import CategoryEvents from './pages/CategoryEvents.jsx'
import BrowseEvents from './pages/BrowseEvents.jsx'
import EventPage from './pages/EventPage.jsx'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/login" element={<Loginpage/>}/>
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path='/category/:category' element={<CategoryEvents/>}/>
      <Route path='/browseEvents' element={<BrowseEvents/>}/>
      <Route path='/event/:id' element={<EventPage/>}/>
    </Routes>
  </BrowserRouter>
  
  
   
  )
}

export default App
