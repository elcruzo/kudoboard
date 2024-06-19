import React from 'react';
import './card.css'; // Style your card component here

function Card({ card }) {
  const handleSignCard = () => {
    // Implement signing the card logic
  };

  const handleUpvote = () => {
    // Implement upvoting the card logic
  };

  const handleDelete = () => {
    // Implement deleting the card logic
  };

  return (
    <div className='card-container'>
      <img src={card.gifUrl} alt='GIF' />
      <p>{card.message}</p>
      <div className='card-actions'>
        <button onClick={handleSignCard}>Sign</button>
        <button onClick={handleUpvote}>Upvote</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default Card;
