import './buttons.css'

function Buttons({ handleFilter }) {

  return (
    <div className='buttons-container-1'>
      <button onClick={() => handleFilter('All')}>All</button>
      <button onClick={() => handleFilter('Recent')}>Recent</button>
      <button onClick={() => handleFilter('Celebration')}>Celebration</button>
      <button onClick={() => handleFilter('Thank You')}>Thank You</button>
      <button onClick={() => handleFilter('Inspiration')}>Inspiration</button>
    </div>
  )
}

export default Buttons;
