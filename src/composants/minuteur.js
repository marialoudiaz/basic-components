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
  
  //Définir la minuterie
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // Formater l'entrée pour ajouter les deux-points
  const formatInputValue = (value) => {
    // Enlever tous les caractères non numériques
    const cleaned = value.replace(/\D/g, ''); //regex : retirer tous les caractères non numériques de la chaîne d'entrée.

    // Ajouter les deux-points en fonction de la longueur du texte nettoyé
    if (cleaned.length > 4) {
      return cleaned.replace(/(\d{2})(\d{2})(\d{2})$/, '$1:$2:$3'); // HHMMSS 
      // regex : trois groupes de deux chiffres à la fin de la chaîne. (d = digit)
      // regex : remplace ces groupes par les mêmes chiffres séparés par des ':'
    } else if (cleaned.length > 2) {
      return cleaned.replace(/(\d{2})(\d{2})$/, '$1:$2'); // MMSS
    } else {
      return cleaned; // SS
    }
  };

  // Gérer l'entrée de l'utilisateur
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const formattedInput = formatInputValue(inputValue);
      const timeParts = formattedInput.split(':');
      let totalMilliseconds = 0;

      if (timeParts.length === 3){ // HH:MM:SS
        const inputHours = parseInt(timeParts[0], 10) || 0;
        const inputMinutes = parseInt (timeParts[1], 10) || 0;
        const inputSeconds = parseInt(timeParts[2], 10) || 0;

        totalMilliseconds = (inputHours * 60 * 60 * 1000) + (inputMinutes * 60 * 1000) + (inputSeconds * 1000);
      } else if (timeParts.length === 2) { // MM:SS
        const inputMinutes = parseInt (timeParts[1], 10) || 0;
        const inputSeconds = parseInt(timeParts[2], 10) || 0;

        totalMilliseconds = (inputMinutes * 60 * 1000) + (inputSeconds * 1000);
      } else if (timeParts.length === 1){ //ss
        const inputSeconds = parseInt(timeParts[0], 10) || 0;

        totalMilliseconds = inputSeconds * 1000;
      }

      setTimeRemaining(totalMilliseconds);
      setInputValue('');
  }
};
// const inputTime = parseInt(inputValue, 10)*1000; // secondes => millisec

  //Créer une fonction pour obtenir le temps
  const getTime =()=>{
    const time = timeRemaining;
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  }

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
          ( <div>{`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</div>) 
          :
          ( <input placeholder="hh:mm:ss" value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown}/>)}
        {/* .padSart(n,x)remplir une chaîne de caractères jusqu'à une longueur spécifique */}
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