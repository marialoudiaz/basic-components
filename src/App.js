import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import Carousel from './composants/carousel.js'
import Modal from './composants/modal.js';
import RatingSystem from './composants/rating-system.js'

function App() {


  return (
    <div>
       <Carousel />
       <Modal />
       <RatingSystem />
    </div>
  );
}

export default App;
