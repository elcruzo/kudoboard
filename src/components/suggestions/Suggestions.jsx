import React from 'react';
import './suggestions.css'; // You can style suggestions here

function Suggestions({ suggestions, handleSuggestionClick }) {
  return (
    <ul className='suggestions-list'>
      {suggestions.map((suggestion, index) => (
        <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
          {suggestion}
        </li>
      ))}
    </ul>
  );
}

export default Suggestions;
