import { useState } from 'react';
import './searchform.css'
import Suggestions from '../suggestions/Suggestions';

function SearchForm({ handleSearch, suggestions }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion); // Update input field with selected suggestion
    handleSearch(suggestion); // Trigger search with selected suggestion
  };

  return (
    <div className='searchform-container'>
      <input
        type="text"
        placeholder='Search boards...'
        value={searchQuery}
        onChange={handleInputChange}
        />
        {searchQuery && (
          <Suggestions suggestions={suggestions} handleSuggestionClick={handleSuggestionClick} />
      )}
    </div>
  )
}

export default SearchForm
