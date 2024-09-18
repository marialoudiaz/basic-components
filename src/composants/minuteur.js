import React, { useState, useEffect } from 'react';
import '../App.css';

function Minuteur() {

  const [playPause, setPlayPause]= useState(['play','pause']);
  
  const playPauseChange =()=>{
    setPlayPause()
  }

  //Unités de mesure
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [days, setDays] = useState(0);

  // Créer une deadline
  const deadline = '2024-12-31'; // variable doit être une chaine de caractères

  //Créer une fonction pour obtenir le temps
  const getTime =()=>{
    const time = Date.parse(deadline) - Date.now();
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  }

  // timer will roll after every second's passed
  useEffect(() => {
    const interval = setInterval(()=> getTime(deadline),1000);
    return()=> clearInterval(interval);
  }, []) 

  return (
    <div className='section' style={{display:'flex',flexDirection:'column'}}>

      <div className='box'>
        <h2>Minuteur</h2>
        {days} {hours}  {minutes}  {seconds}
        <div className='flex-wrap'>
          <button><p>+0:30</p></button>
          <button><p>+1:00</p></button>
          <button><p>+5:00</p></button>
        </div>

        <div className='flex-wrap'>
         <button onClick={()=>playPauseChange()}><p>{playPause}</p></button>
         <button><p>+0:30</p></button>
        </div>
      </div>

    </div>
  );
}

export default Minuteur;