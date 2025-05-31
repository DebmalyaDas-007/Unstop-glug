import React from 'react'
import { Typewriter } from "react-simple-typewriter";
import '../styles/Herosection.css'; 
function Herosection() {
  return (
    <div className="hero-container">
      <h1 className="hero-heading" >
      <Typewriter
         className="typewriter-text"
      
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
    </div>
  );
}

export default Herosection;
