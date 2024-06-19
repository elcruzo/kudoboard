import './boardslist.css';
import Board from '../board/Board';

function BoardList({boards}) {

  const boardLst = boards.map((board) => {
    return (
      <Board
        key={board.id}
        title={board.title}
        category={board.category}
      />
    );
  });

  return (
    <div className='board-container'>
        <div className="board-list">
            {boardLst}
        </div>
    </div>
    )
  }

export default BoardList;
