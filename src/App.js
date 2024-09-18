import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import Carousel from './composants/carousel.js'
import Modal from './composants/modal.js';
import RatingSystem from './composants/rating-system.js';
import Timer from './composants/timer.js';
import Minuteur from './composants/minuteur.js';

function App() {


  return (
    <>
<h1>Composants React de bases</h1>
       <Carousel />
       <Modal />
       <RatingSystem />
       <Timer />
       <Minuteur />
    </>
  );
}

export default App;
