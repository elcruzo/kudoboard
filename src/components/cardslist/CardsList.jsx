import React from 'react';
import Card from '../card/Card';
import './cardslist.css'

function CardsList({ cards }) {
  return (
    <div className='card-list-container'>
      {cards.map(card => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}

export default CardsList;
