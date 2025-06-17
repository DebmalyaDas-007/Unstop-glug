import React from 'react'
import { Typewriter } from "react-simple-typewriter";
import { Search } from 'lucide-react'; // Import the icon
import '../styles/Herosection.css'; 
import { useNavigate } from 'react-router-dom';
function Herosection() {
  const navigate=useNavigate();
  return (
    <div className="hero-container">
      <h1 className="hero-heading">
        <Typewriter
          words={[
            "Unforgettable events, seamlessly executed",
            "Your vision, our expertise",
            "Crafting auspicious moments"
          ]}
          loop={0}
          cursor
          cursorStyle="!"
          typeSpeed={100}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>

      <p>Explore opportunities from across the globe to grow, showcase skills, participate and win!</p>


      <button className="explore-button" onClick={()=>(navigate('/browseEvents'))}>
        <Search size={18} style={{ marginRight: '8px' }} />
        Explore Events
      </button>
    </div>
  );
}

export default Herosection;
