import React from 'react';
import Card from '../card/Card';
import './cardslist.css';

function CardsList({ cards, setCards }) {
    const handleCardUpdate = (updatedCard) => {
        setCards(cards.map(card => card.id === updatedCard.id ? updatedCard : card));
    };

    const handleCardDelete = (deletedCardId) => {
        setCards(cards.filter(card => card.id !== deletedCardId));
    };

    return (
        <div className='card-list-container'>
            {cards.map(card => (
                <Card
                    key={card.id}
                    card={card}
                    onCardUpdate={handleCardUpdate}
                    onCardDelete={handleCardDelete}
                />
            ))}
        </div>
    );
}

export default CardsList;
