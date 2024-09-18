import React, { useState, useEffect } from 'react';
import '../App.css';

function Minuteur() {

  const [timeRemaining, setTimeRemaining] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [playPause, setPlayPause]= useState('play');
  
  //Unités de mesure
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  
  //Créer une fonction pour obtenir le temps
  const getTime =()=>{
    const time = Date.parse(timeRemaining) - Date.now();
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  }

  //Définir la minuterie
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const inputTime = parseInt(inputValue, 10)*1000; // secondes => millisec
      setTimeRemaining(inputTime);
      setInputValue('');
    }
  };

  //Play/Pause 
  const playPauseChange =()=>{
    setPlayPause((prevState)=> (prevState === 'play' ? 'pause' :'play'));
  }
  // Redémarrer le minuteur
  const restart =()=>{
    setTimeRemaining(0)
  }


  // Mettre à jour le minuteur
  useEffect(() => {
    let timer;
    if (playPause === 'play' && timeRemaining > 0) { // gere en meme temps le play/pause par conditionnel
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          const newTime = prevTime - 1000;
          if (newTime <= 0) {
            clearInterval(timer);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [playPause, timeRemaining]);


  // Lancer le minuteur dès que l'input est validé
  useEffect(() => {
    getTime()
  }, [timeRemaining]) 


  return (
    <div className='section' style={{display:'flex',flexDirection:'column'}}>

      <div className='box'>
        <h2>Minuteur</h2>
        <h3>Timer</h3>

        <>
          {timeRemaining > 0 
          ? 
          ( <div>{timeRemaining/1000}</div>) 
          :
          ( <input placeholder="0" value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown}/>)}
        
          {timeRemaining <=1 &&(
            <p>🔥boom</p>
          )}
          </>
         
        <div className='flex-wrap'>
         <button onClick={()=>playPauseChange()}><p>{playPause}</p></button>
         <button onClick={()=>restart()}><p>restart</p></button>
        </div>
      </div>

    </div>
  );
}

export default Minuteur;