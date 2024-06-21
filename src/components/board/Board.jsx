import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './board.css';

function Board({ id, title, category, handleDeleteBoard }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // State to track image loading

  const handleViewBoard = () => {
    navigate(`/board/${id}`);
  };

  const handleImageLoad = () => {
    setIsLoading(false); // Update loading state when image has loaded
  };

  const handleImageError = (e) => {
    console.error('Error loading image:', e);
    setIsLoading(false); // Ensure loading indicator is removed on error
  };

  useEffect(() => {
    fetch('https://picsum.photos/v2/list')
      .then(response => response.json())
      .then(data => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomImageId = data[randomIndex].id;
        setImageId(randomImageId);
      })
      .catch(error => {
        console.error('Error fetching image:', error);
      });
  }, []);

  return (
    <div className='card-container'>
      <div className='img-container'>
        {isLoading && (
          <div className="loading-indicator">
            <div className="loading-spinner"></div>
          </div>
        )}
        <img
          src={`https://picsum.photos/id/${id}/200/300`}
          alt={title}
          onLoad={handleImageLoad}
          onError={handleImageError} // Handle image loading errors
          style={{ display: isLoading ? 'none' : 'block' }} // Show image when loaded
        />
      </div>
      <div className='board-det'>
        <h2>{title}</h2>
        <p>Category: {category}</p>
        <div className='card-button-cont'>
          <button onClick={handleViewBoard}>View Board</button>
          <button onClick={() => handleDeleteBoard(id)}>Delete Board</button>
        </div>
      </div>
    </div>
  );
}

export default Board;
