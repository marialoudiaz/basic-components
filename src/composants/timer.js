import React, { useState, useEffect } from 'react';
import '../App.css';

function Timer() {

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
    const time = Date.parse(deadline) - Date.now(); // calcule la différence de temps entre deadline et heure actuelle
    //.parse() => convertit en millisecondes depuis le 1/1/70
    //Date.now() => renvoie le nombre de millisecondes écoulées depuis 1/1/70 jusqu'à mtn
    // donc time = nombre de millisecondes restantes jusqu'a ce que deadline soit atteint (resultat positif => deadline futur/ negatif => deadline passée)
    
    // Math.floor() returns largest integer that is less than or equal to specified value
    setDays(Math.floor(time / (1000 * 60 * 60 * 24))); // diviser en millisecondes => minutes => heures => jour (1 day = 24H)
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24)); //diviser par 1000 (secondes) => fois 60 (minutes) => fois 60 (heures) / %24 => reset values to 0 if 86.400.000 passed a millisec (bc equal to 24h)
    setMinutes(Math.floor((time / 1000 / 60) % 60)); //diviser temps par 1000 (millisec => secondes) + diviser par 60 (minutes)
    setSeconds(Math.floor((time / 1000) % 60));
  }

  // timer will roll after every second's passed
  useEffect(() => {
    const interval = setInterval(()=> getTime(deadline),1000);
    return()=> clearInterval(interval);
  }, []) 

  return (
    <div className='section' style={{display:'flex',flexDirection:'column'}}>
      <h2>Compte à rebours</h2>
      <h3>Countdown</h3>

      <div className='box'>
        <p>Avant 31 dec 2024</p>
        <p>jours</p>{days} <p>heures</p>{hours}  <p>minutes</p>{minutes}  <p>secondes</p>{seconds}
      </div>

    </div>
  );
}

export default Timer;