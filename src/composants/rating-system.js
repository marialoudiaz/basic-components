import React, { useState, useEffect } from 'react';
import '../App.css';

function RatingSystem() {

  // Le nombre d'étoiles à colorer 
  const [rating, setRating]=useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);

    // Quand hover sur 'n' étoiles : modifie couleur pour toutes celles avant
    const starHover = (index) => {
      setHoveredStar(index);
    };
    // Réinitialiser le hover quand la souris quitte une étoile
    const starLeave = () => {
      setHoveredStar(0);
    };
    //Clic sur 'n' étoile : modifie rating en fonction numéro de l'index
    const modifyRating = (index) => {
      setRating(index)
    }

  useEffect(() => {
  }, []) 

  return (
    <div className='section' style={{display:'flex',flexDirection:'column'}}>

      <div className='stars'> 
      {Array.from({ length: 5 }).map((_, index) => (
          <svg
            key={index} // Ajoutez une clé unique pour chaque élément
            className="star-svg"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="24px"
            height="24px"
            onClick={()=>modifyRating(index+1)}
            onMouseEnter={() => starHover(index + 1)}
            onMouseLeave={starLeave}
            style={{
              cursor: 'pointer',
              fill: index < (hoveredStar || rating) ? 'gold' : 'gray', //l'index actuel (donc pour tous element rendu par la fonction map) est-il inferieur a hoveredStar si oui > colore en or
            }}
          >
            <path d="M0,0.054V20h21V0.054H0z M15.422,18.129l-5.264-2.768l-5.265,2.768l1.006-5.863L1.64,8.114l5.887-0.855l2.632-5.334l2.633,5.334l5.885,0.855l-4.258,4.152L15.422,18.129z" />
          </svg>
        ))}
      
      </div>
      <div>{rating}</div>
    </div>
  );
}

export default RatingSystem;