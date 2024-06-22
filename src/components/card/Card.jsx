import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import './card.css';

function Card({ card, onCardUpdate, onCardDelete }) {
    const [newComment, setNewComment] = useState('');
    const [gifUrl, setGifUrl] = useState('');
    const [gifTitle, setGifTitle] = useState('');
    const [searchGifQuery, setSearchGifQuery] = useState('');

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

    const fetchGif = async (query) => {
        const apiKey = import.meta.env.VITE_API_KEY;
        const apiURL = query
        ? `https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(query)}&api_key=${apiKey}&limit=1&rating=g`
        : `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&rating=g`;

        try {
            const response = await fetch(apiURL);
            if (!response.ok) {
                throw new Error('Failed to fetch GIF');
            }
            const data = await response.json();

            if (data.data) {
                const gif = query ? data.data[0] : data.data;
                setGifUrl(gif.images.original.url);
                setGifTitle(gif.title || 'GIF');
            } else {
                console.error('No GIFs found in the response');
            }
        } catch (error) {
            console.error('Error fetching the GIF:', error);
        }
    };

    useEffect(() => {
        fetchGif(card.text); // Fetch initial GIF based on card text
    }, [card.text]);

    const handleSearchGif = (e) => {
        e.preventDefault();
        fetchGif(searchGifQuery);
    };

    return (
        <div className='card-container'>
            <div className='gif-container'>
                {gifUrl && <img src={gifUrl} alt={gifTitle} />}
            </div>
            <div className='card-cont-text'>
                <p>{card.message}</p>
                {card.textMessage && <p>{card.textMessage}</p>}
                <p><strong>By: {card.author}</strong></p>
                <div className='gif-search-section'>
                    <form onSubmit={handleSearchGif}>
                        <input
                            type='text'
                            value={searchGifQuery}
                            onChange={(e) => setSearchGifQuery(e.target.value)}
                            placeholder='Search for a GIF'
                        />
                        <button type='submit'>Search GIF</button>
                    </form>
                </div>
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
                    </form>
                </div>
                <div className='card-actions'>
                    <button onClick={handleUpvote}>Upvote<FontAwesomeIcon icon={faArrowUp} />: {card.upvotes}</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default Card;
