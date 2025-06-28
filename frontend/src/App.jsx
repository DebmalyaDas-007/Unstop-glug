import React from 'react'
import Loginpage from './pages/Loginpage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard.jsx'
import Landingpage from './pages/Landingpage.jsx'
import CategoryEvents from './pages/CategoryEvents.jsx'
import BrowseEvents from './pages/BrowseEvents.jsx'
import EventPage from './pages/EventPage.jsx'
import ProtectedRoutes from './protected routes/ProtectedRoutes.jsx'
import TeamCard from './components/TeamCard.jsx'
import ViewTeam from './pages/ViewTeam.jsx'
import TeamCreate from './pages/TeamCreate.jsx'
import UserDashboard from './pages/UserDashboard.jsx'
import { MainContext, MainProvider } from './contextAPI/index.jsx'
import MyApplications from './components/MyApplications.jsx'
import { Toaster } from 'react-hot-toast'
import PublicRoute from './protected routes/PublicRoute.jsx';
function App() {
  return (
    <>
     <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route
  path="/login"
  element={
    <PublicRoute>
      <Loginpage />
    </PublicRoute>
  }
/>
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoutes>
                <AdminDashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoutes>
                <MainProvider>
                  <UserDashboard />
                </MainProvider>

              </ProtectedRoutes>
            }
          />
          <Route path='/category/:category' element={<CategoryEvents />} />
          <Route path='/browseEvents' element={<BrowseEvents />} />

          <Route path='/event/:id' element={<EventPage />} />
          <Route path='/event/:id/teams' element={<TeamCard />} />
          <Route path='/event/:eventId/teams/:teamId' element={<ViewTeam />} />
          <Route path='/:id/teams/create-team' element={<TeamCreate />} />

          <Route path='/myApplications' element={<MyApplications />} />
        </Routes>
      </BrowserRouter>
    </>



  )
}

export default App
