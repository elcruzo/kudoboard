import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './boardpage.css';
import CardsList from '../cardslist/CardsList';
import CardModal from '../cardmodal/CardModal';

function BoardPage() {
    const { boardId } = useParams();
    const [board, setBoard] = useState(null);
    const [cards, setCards] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newCardMessage, setNewCardMessage] = useState('');
    const [newCardGifUrl, setNewCardGifUrl] = useState('');
    const [textMessage, setTextMessage] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        async function fetchBoardDetails() {
            try {
                const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;

                console.log(`Fetching board details from ${backendUrlAccess}/boards/${boardId}`);
                const boardResponse = await fetch(`${backendUrlAccess}/boards/${boardId}`);
                if (!boardResponse.ok) {
                    throw new Error('Board not found');
                }
                const boardData = await boardResponse.json();
                console.log('Board data:', boardData);
                setBoard(boardData);

                console.log(`Fetching cards from ${backendUrlAccess}/boards/${boardId}/cards`);
                const cardsResponse = await fetch(`${backendUrlAccess}/boards/${boardId}/cards`);
                if (!cardsResponse.ok) {
                    throw new Error('Cards not found');
                }
                const cardsData = await cardsResponse.json();
                console.log('Cards data:', cardsData);
                setCards(cardsData.map(card => ({
                    ...card,
                    comments: card.comments || []
                })));
            } catch (error) {
                console.error('Error fetching board details:', error);
            }
        }

        fetchBoardDetails();
    }, [boardId]);

    const handleAddCard = async (e) => {
        e.preventDefault();
        try {
            const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
            const response = await fetch(`${backendUrlAccess}/boards/${boardId}/cards`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: newCardMessage, gifUrl: newCardGifUrl, textMessage: textMessage, author: author })
            });

            if (!response.ok) {
                throw new Error('Error creating card');
            }

            const newCard = await response.json();
            setCards([...cards, {
                ...newCard,
                comments: []
            }]);
            setNewCardMessage('');
            setNewCardGifUrl('');
            setTextMessage('');
            setAuthor('');
            setShowModal(false); // Close the modal after adding the card
        } catch (error) {
            console.error('Error adding card:', error);
        }
    };

    const handleCardUpdate = (updatedCard) => {
        const updatedCards = cards.map(card => {
            if (card.id === updatedCard.id) {
                return {
                    ...updatedCard,
                    comments: card.comments || []
                };
            }
            return card;
        });
        setCards(updatedCards);
    };

    if (!board) {
        return <div>Loading...</div>;
    }

    return (
        <div className='board-page-container'>
            <h2>{board.title}</h2>
            <p>Category: {board.category}</p>

            <button onClick={() => setShowModal(true)} className='add-card-button'>Add Card</button>

            <CardModal show={showModal} handleClose={() => setShowModal(false)} handleSubmit={handleAddCard}>
                <form onSubmit={handleAddCard} className='add-card-form'>
                    <input
                        type='text'
                        value={newCardMessage}
                        onChange={(e) => setNewCardMessage(e.target.value)}
                        placeholder='Enter card message'
                        required
                    />
                    <input
                        type='text'
                        value={newCardGifUrl}
                        onChange={(e) => setNewCardGifUrl(e.target.value)}
                        placeholder='Enter GIF URL'
                        required
                    />
                    <input
                        type="text"
                        placeholder="Optional Text Message"
                        value={textMessage}
                        onChange={(e) => setTextMessage(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                    <button type='submit' className='add-card-button'>Add Card</button>
                </form>
            </CardModal>

            <CardsList cards={cards} onCardUpdate={handleCardUpdate} setCards={setCards} />
        </div>
    );
}

export default BoardPage;
