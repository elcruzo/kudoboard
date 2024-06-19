import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './boardpage.css';
import CardsList from '../cardslist/CardsList';

function BoardPage() {
  const { boardId } = useParams(); // Extract boardId from URL params
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Fetch cards for the board using boardId
    async function fetchCards() {
      try {
        const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
        const response = await fetch(`${backendUrlAccess}/boards/${boardId}/cards`);
        if (!response.ok) {
          throw new Error('Cards not found');
        }
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    }

    fetchCards();
  }, [boardId]);

  return (
    <div className='board-page-container'>
      <h2>Board Page</h2>
      <CardsList cards={cards} />
    </div>
  );
}

export default BoardPage;
