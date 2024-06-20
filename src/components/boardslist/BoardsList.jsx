import './boardslist.css';
import Board from '../board/Board';
import { useEffect, useState } from 'react';

function BoardsList({ boards, handleDeleteBoard }) {
  return (
    <div className='boards-container'>
      {boards.map((board) => (
        <Board
          key={board.id}
          id={board.id}
          title={board.title}
          category={board.category}
          handleDeleteBoard={handleDeleteBoard}
        />
      ))}
    </div>
  );
}

export default BoardsList;
