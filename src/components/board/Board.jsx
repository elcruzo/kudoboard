import React from 'react';
import './board.css';

function Board({ id, title, category }) {
  return (
    <div className='card-container'>
      <div className='img-container'>
        <img src={`https://picsum.photos/200/`} alt={title} />
      </div>
      <div>
        <h2>{title}</h2>
        <p>{category}</p>
        <div className='card-button-cont'>
          <button>View Board</button>
          <button>Delete Board</button>
        </div>
      </div>
    </div>
  );
}

export default Board;
