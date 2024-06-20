import React from 'react';
import './create.css';

function Create({ onOpenModal }) {
  return (
    <div className='buttons-container-2'>
      <div className='create-container'>
        <button onClick={onOpenModal}>Create a New Board</button>
      </div>
    </div>
  );
}

export default Create;
