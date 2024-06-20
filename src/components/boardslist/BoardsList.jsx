import './boardslist.css';
import Board from '../board/Board';
import { useEffect, useState } from 'react';

function BoardsList() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    async function fetchBoards() {
      try {
        const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
        const response = await fetch(`${backendUrlAccess}/boards`);
        if (!response.ok) {
          throw new Error('Boards not found');
        }
        const data = await response.json();
        setBoards(data);
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    }

    fetchBoards();
  }, [])

  return (
    <div className='boards-container'>
          {boards.map(board => (
            <Board
              key={board.id}
              id={board.id}
              title={board.title}
              category={board.category}
            />
        )
      )}
    </div>
    )
  }

export default BoardsList;
