import React from 'react';
import { useNavigate } from 'react-router-dom';
import './board.css';

function Board({ id, title, category }) {
  const navigate = useNavigate();

  const handleViewBoard = () => {
    navigate(`/board/${id}`);
  };

  const handleDeleteBoard = async () => {
    try {
        const backendUrlAccess = import.meta.env.VITE_BACKEND_ACCESS;
        const response = await fetch(`${backendUrlAccess}/boards/id`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            throw new Error('Error deleting board');
        }
    } catch (error) {
        console.error('Error deleting board:', error)
    }
  }

  return (
    <div className='card-container'>
      <div className='img-container'>
        <img src={`https://picsum.photos/200/`} alt={title} />
      </div>
      <div>
        <h2>{title}</h2>
        <p>{category}</p>
        <div className='card-button-cont'>
          <button onClick={handleViewBoard}>View Board</button>
          <button onClick={handleDeleteBoard}>Delete Board</button>
        </div>
      </div>
    </div>
  );
}

export default Board;
