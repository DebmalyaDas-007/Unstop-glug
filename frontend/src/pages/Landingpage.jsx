import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Herosection from '../components/Herosection';
import CategoryCard from '../components/CategoryCard';
import '../styles/Landingpage.css';
import { MdMovie } from 'react-icons/md';
import { FaLaptopCode } from 'react-icons/fa';
import { GiSoccerBall, GiAtomicSlashes } from 'react-icons/gi';
import { PiStudentFill } from 'react-icons/pi';
import { BsThreeDots } from 'react-icons/bs';

import ModernEventCard from '../components/ModernEventCard';



function Landingpage() {

  const categories = [
    { title: 'Coding', subtitle: 'Code and decode', icon: FaLaptopCode, bg: '#d3f9d8', to: '/coding' },
    { title: 'Movies', subtitle: 'Bollywood and extravaganza', icon: MdMovie, bg: '#ffe0e9', to: '/movies' },
    { title: 'Sports', subtitle: 'FIFA,IPL,Olympics lot more... ', icon: GiSoccerBall, bg: '#d0ebff', to: '/sports' },
    { title: 'Science', subtitle: 'Refine Skills Daily', icon: GiAtomicSlashes, bg: '#e5dbff', to: '/science' },
    { title: 'Education', subtitle: 'Battle For Excellence', icon: PiStudentFill, bg: '#fff3bf', to: '/education' },
    { title: 'More', subtitle: '', icon: BsThreeDots, bg: '#fcc2d7', to: '/more' },
  ];




  return (
    <div className="landing-container">

      <Navbar />
      <Herosection />
      <div className="categories">
        <h2>Categories</h2>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <CategoryCard
         
            key={index}
            title={cat.title}
            subtitle={cat.subtitle}
            icon={<cat.icon size={36} />}
            to={cat.to}
            style={{ backgroundColor: cat.bg }}
          />
        ))}
      </div>
      </div>

    </div>
  );
}

export default Landingpage;
