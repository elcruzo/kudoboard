import { useState } from 'react';
import { debounce } from 'lodash';
import './searchform.css'
import Suggestions from '../suggestions/Suggestions';

function SearchForm({ handleSearch, suggestions }) {
  const [searchQuery, setSearchQuery] = useState('');

  const debounceHandleSearch = debounce((query) => {
    handleSearch(query);
  }, 300);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    debounceHandleSearch(query);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
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
