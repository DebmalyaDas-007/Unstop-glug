import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import '../styles/MyApplications.css'
import { Toaster } from 'react-hot-toast'
const MyApplications = () => {
  const [myApplications, setMyApplications] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/team/myApplications', {
          withCredentials: true,
        })
        setMyApplications(response.data.applications)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const respondToteam = async (myResponse, eventId, teamApplicationId) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/team/${eventId}/myteam/respond`,
        {
          response: myResponse,
          teamApplicationId: teamApplicationId,
        },
        { withCredentials: true }
      )

      // ✅ Show toast
      toast.success(`Request ${myResponse} successfully!`)

      // ✅ Remove application from UI
      setMyApplications((prev) =>
        prev.filter((app) => app._id !== teamApplicationId)
      )
    } catch (error) {
      console.log(error)
      const msg = error?.response?.data?.message || 'Something went wrong'
      toast.error(msg)
    }
  }

  const acceptRequest = (eventId, teamApplicationId) => {
    respondToteam("accepted", eventId, teamApplicationId)
  }

  const rejectRequest = (eventId, teamApplicationId) => {
    respondToteam("rejected", eventId, teamApplicationId)
  }

  return (
    <div>
      <div className="application-container">
      <Toaster 
  position="top-center"
  toastOptions={{
    duration: 3000,
    style: {
      zIndex: 99999,
    },
  }}
/>
        {myApplications && myApplications.length > 0 ? (
          myApplications.map((application) => (
            <div key={application._id} className="application-card">
              {/* Team Information */}
              <div className="team-info">
                <h4>TEAM DETAILS:</h4>
                <p><strong>Team Name:</strong> {application.Team.name}</p>
                <p><strong>Team Size:</strong> {application.Team.v}</p>
              </div>

              {/* Applicant Information */}
              <div className="applicant-info">
                <h4>APPLICANT DETAILS:</h4>
                <p><strong>Name:</strong> {application.applicant.name}</p>
                <p><strong>Email:</strong> {application.applicant.email}</p>
              </div>

              {/* Event Information */}
              <div className="event-info">
                <h4>EVENT DETAILS:</h4>
                <p><strong>Title:</strong> {application.event.title}</p>
                <p><strong>Description:</strong> {application.event.description}</p>
              </div>

              <p><strong>Status:</strong> {application.status}</p>

              <div className="control-btns">
                <button
                  className="accept"
                  onClick={() => acceptRequest(application.event._id, application._id)}
                >
                  ACCEPT REQUEST
                </button>
                <button
                  className="reject"
                  onClick={() => rejectRequest(application.event._id, application._id)}
                >
                  REJECT REQUEST
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No team requests found.</p>
        )}
      </div>
    </div>
  )
}

export default MyApplications
