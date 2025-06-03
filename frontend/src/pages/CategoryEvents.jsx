import React, { useEffect, useState } from 'react'

import '../styles/CategoryEvents.css'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import ModernEventCard from '../components/ModernEventCard';
function CategoryEvents() {
    const { category } = useParams();
    const[events,setEvents]=useState([]);
    useEffect(()=>{
        ;(async()=>{
            try {
               const response=await axios.get(`http://localhost:3000/api/event/${category}`);
                console.log(response.data.event);
                setEvents(response.data.event);
                
            } catch (error) {
                console.error("Failed to fetch events:", error);
            }
        })()
    },[])
    if(events.length==0){
        return(
        <div>
             <Navbar />
             <div className='category-header'><h1 className="category">{category}</h1></div>
           <div className="null">
           <h1 className='null-text'>No Events Listed</h1>
           </div>
          
        </div>
           
        )
    }
    return (
        <div>
             <Navbar />
            <div className='category-header'><h1 className="category">{category}</h1></div>
           
            <div className="events-wrapper">
      <div className="events">
        {events.map((event, index) => (
            <Link to={`/event/${event._id}`} key={event._id} style={{ textDecoration: 'none' }}>
          <ModernEventCard
            key={index}
            title={event.title}
            description={event.description}
            Location={event.location || "Not specified"}
          />
          </Link>
        ))}
      </div>
    </div>
            
            
        </div>
    );
}

export default CategoryEvents
