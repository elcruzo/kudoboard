import React from 'react';
import './card.css';

function Card({ card, onCardUpdate, onCardDelete }) {
    const handleSignCard = async () => {
        try {
            const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
            const response = await fetch(`${backendUrlAccess}/cards/${card.id}/sign`, {
                method: 'PUT'
            });

            if (!response.ok) {
                throw new Error('Error signing card');
            }

            const updatedCard = await response.json();
            onCardUpdate(updatedCard);
        } catch (error) {
            console.error('Error signing card:', error);
        }
    };

    const handleUpvote = async () => {
        try {
            const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
            const response = await fetch(`${backendUrlAccess}/cards/${card.id}/upvote`, {
                method: 'PUT'
            });

            if (!response.ok) {
                throw new Error('Error upvoting card');
            }

            const updatedCard = await response.json();
            onCardUpdate(updatedCard);
        } catch (error) {
            console.error('Error upvoting card:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
            const response = await fetch(`${backendUrlAccess}/cards/${card.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Error deleting card');
            }

            onCardDelete(card.id);
        } catch (error) {
            console.error('Error deleting card:', error);
        }
    };

    return (
        <div className='card-container'>
            <img src={card.gifUrl} alt='GIF' />
            <p>{card.message}</p>
            {card.textMessage && <p>{card.textMessage}</p>}
            <div className='card-actions'>
                <button onClick={handleSignCard}>Sign</button>
                <button onClick={handleUpvote}>Upvote</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}

export default Card;
