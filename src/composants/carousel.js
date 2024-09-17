import React, { useState, useEffect } from 'react';
import '../App.css';

function Carousel() {

  const items =['item1','item2','item3','item4'];
  const [currentItem, setCurrentItem] = useState(items[0])

  //fonction du carousel
    const prev = (index) => {
      // recupère l'id de limage actuel (dans l'array) 
      const currentIndex = items.indexOf(currentItem);
      // verifie si index = 0 > si oui (revenir fin tableau) > sinon decrementer
      const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
      // Mise a jour avev nouvel index
      setCurrentItem(items[prevIndex])
    }
    const next = () => {
      const currentIndex = items.indexOf(currentItem);
      const nextIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
      setCurrentItem(items[nextIndex]);
    };

  //Actualiser valeur currentItem lorsque modifié
  useEffect(() => {
  }, [currentItem]) 

  return (
    <div>
        {currentItem}     
        <button onClick={prev}>Prev</button>
        <button onClick={next}>Next</button>
    </div>
  );
}

export default Carousel;
