import React from 'react';
import { useNavigate } from 'react-router-dom';
import './board.css';

function Board({ id, title, category, handleDeleteBoard }) {
  const navigate = useNavigate();

  const handleViewBoard = () => {
    navigate(`/board/${id}`);
  };

  return (
    <div className='card-container'>
      <div className='img-container'>
        <img src={`https://picsum.photos/200/`} alt={title} />
      </div>
      <div className='board-det'>
        <h2>{title}</h2>
        <p>{category}</p>
        <div className='card-button-cont'>
          <button onClick={handleViewBoard}>View Board</button>
          <button onClick={() => handleDeleteBoard(id)}>Delete Board</button>
        </div>
      </div>
    </div>
  );
}

export default Board;
