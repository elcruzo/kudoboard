import React, {useState} from 'react';
import './card.css';

function Card({ card, onCardUpdate, onCardDelete }) {
    const [newComment, setNewComment] = useState('');

    const handleToggleSign = async () => {
        try {
            const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
            const response = await fetch(`${backendUrlAccess}/cards/${card.id}/sign`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
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

    const handleAddComment = async (e) => {
        e.preventDefault();
        try {
            const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
            const response = await fetch(`${backendUrlAccess}/cards/${card.id}/comments`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: newComment })
            });

            if (!response.ok) {
                throw new Error('Error adding comment');
            }

            const updatedCard = await response.json();
            onCardUpdate(updatedCard);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className='card-container'>
            <img src={card.gifUrl} alt='GIF' />
            <p>{card.message}</p>
            {card.textMessage && <p>{card.textMessage}</p>}
            <p><strong>By: {card.author}</strong></p>
            <div className='comments-section'>
                <h4>Comments:</h4>
                <ul>
                    {card.comments && card.comments.map(comment => (
                        <li key={comment.id}>{comment.content}</li>
                    ))}
                </ul>
                <form onSubmit={handleAddComment}>
                    <input
                        type='text'
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder='Add a comment'
                        required
                    />
                    <button type='submit'>Add Comment</button>
                </form>
            </div>
            <div className='card-actions'>
                <button onClick={handleUpvote}>Upvote: {card.upvotes}</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}

export default Card;
