import axios from 'axios'
import React, { useEffect, useState } from 'react'
import userProfile from '../assets/profile.svg';
import '../styles/Profile.css'

const Profile = () => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:3000/api/auth/get-user', { 
          withCredentials: true 
        });
        
        console.log('API Response:', response.data);
        
        if (response.data && response.data.user) {
          setUser(response.data.user);
        } else {
          setError('User data not found in response');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        
        if (error.response) {
          if (error.response.status === 403) {
            setError('unauthorized');
          } else if (error.response.status === 401) {
            setError('unauthenticated');
          } else {
            setError(`Server error: ${error.response.status}`);
          }
        } else if (error.request) {
          setError('Network error - unable to connect to server');
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  // Loading state
  if (loading) {
    return (
      <div className='profile-container'>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <h2>Loading your profile...</h2>
        </div>
      </div>
    )
  }

  // Error states
  if (error === 'unauthorized') {
    return (
      <div className='profile-container'>
        <div className="error-container">
          <h1>Access Denied</h1>
          <p>You don't have permission to view this profile.</p>
          <button onClick={() => window.location.href = '/login'}>
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  if (error === 'unauthenticated') {
    return (
      <div className='profile-container'>
        <div className="error-container">
          <h1>Please Log In</h1>
          <p>You need to be logged in to view your profile.</p>
          <button onClick={() => window.location.href = '/login'}>
            Login
          </button>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='profile-container'>
        <div className="error-container">
          <h1>Error Loading Profile</h1>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // Main profile display
  return (
    <div className='profile-container'>
      <h1 className="greet">
        Welcome back{user.name ? `, ${user.name}` : ''}!
      </h1>
      
      {/* Profile Header Card */}
      <div className="profile-header">
        <div className="profile-image">
          <img 
            src={user.avatar || userProfile} 
            alt={`${user.name || 'User'}'s profile`}
            onError={(e) => {
              e.target.src = userProfile;
            }}
          />
        </div>
        
        <div className="profile-info">
          <div className="userName">
            <h1>{user.name || 'Name not available'}</h1>
            <h5>{user.email || 'Email not available'}</h5>
          </div>
          
          <div className="role">
            <h3>{user.role || 'User'}</h3>
          </div>
          
          {/* Status indicator */}
        
        </div>
      </div>

      {/* Profile Stats */}
      <div className="profile-stats">
        <div className="stat-card">
          <div className="stat-number">1</div>
          <div className="stat-label">Year Active</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">5</div>
          <div className="stat-label">Participations</div>
        </div>
       
      </div>

    
      {/* Additional Info */}
      {user.createdAt && (
        <div className="additional-info">
          <p>
            <strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      )}
    </div>
  )
}

export default Profile