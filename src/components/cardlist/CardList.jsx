import React from 'react';
import Card from '../card/Card';
import './cardlist.css';

function CardList({ boards }) {
  return (
    <div>
      {boards.map(board => (
        <Card key={board.id} board={board} />
      ))}
    </div>
  );
}

export default CardList;
