import React from 'react'
import Navbar from '../components/Navbar'
import Herosection from '../components/Herosection'
import '../styles/Landingpage.css'; // or wherever the class is defined

function Landingpage() {
  return (
    <div>
     
      <div className="nav-hero">
      <Navbar></Navbar>
      <Herosection/>
      </div>
     
    </div>
  )
}

export default Landingpage
