import React, { useState, useEffect } from 'react';
import '../App.css';

function Modal() {

  const [modal, setModal] = useState('');
  const [closebutton, setclosebutton] = useState('')
  const [elementId, setElementId] = useState('initial-id');

  // Le style du modal
  const changeStyle=(props)=>{
    setElementId(props);
    console.log(props)
  }

  //Ouvrir le modal
  const openModal=()=>{
    changeStyle('id-modal-open')
    const textModal= 'je suis un modal';
    setclosebutton('x')
    setModal(textModal)
  }

    //Fermer le modal
    const closeModal=()=>{
      changeStyle('none')
      const textModal= '';
      setclosebutton('')
      setModal(textModal)
    }
  

  useEffect(() => {
  }, []) 

  return (
    <div className='section' style={{display:'flex',flexDirection:'column'}}>
      <h2>Modal</h2>
      <button onClick={()=>openModal('id-modal-open')}>ouvrir le modal</button>

      <div id={elementId}>
      <p onClick={()=>closeModal('none')}>{closebutton}</p>
        <p>{modal}</p>
      </div>
       
      

    </div>
  );
}

export default Modal;
