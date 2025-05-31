import React from 'react'
import "../styles/Login.css";
import googleLogo from "../assets/google.png";
import ToggleButton from '../components/ToggleButton';
import {auth,provider} from "../utils/Firebase.js";
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Loginpage() {
    const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();
    const googleLogin=async()=>{
        try {
            if (!selectedRole) {
                alert("Please select a role (Admin or Candidate) before logging in.");
                return;
              }
            const response = await signInWithPopup(auth,provider)
            const user= response.user;

            const userData={
                name:user.displayName,
                email:user.email,
                avatar:user.photoURL,
                phoneNumber:user.phoneNumber,
                role:selectedRole.toLowerCase(),
            }
            const apiResponse = await fetch("http://localhost:3000/api/auth/google-login",{
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData)
            })
           if(!apiResponse.ok){
                throw new Error("Login failed");
            }
            const responseData= await apiResponse.json();
            console.log("Login successful:",responseData);

            if (selectedRole === "Admin") navigate("/admin-dashboard");
      else navigate("/user-dashboard");

        } catch (error) {
            console.log("Login failed:",error);
        }
       
    }
  return (
<div className="login-container">
<video autoPlay muted loop className="bg-video">
    <source src="src/assets/loginbg.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
      <div className="login-box">
        <h2>Welcome</h2>
        <ToggleButton onSelect={(role) => setSelectedRole(role)} />
        <p>Please login to continue</p>
       
        <button onClick={googleLogin} className="google-button" >
          <img src={googleLogo} alt="Google" className="google-icon" />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  )
}

export default Loginpage
