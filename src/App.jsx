import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import SearchForm from './components/searchform/SearchForm';
import Buttons from './components/buttons/Buttons';
import Create from './components/create/Create';
import BoardsList from './components/boardslist/BoardsList';
import Modal from './components/modal/Modal';
import BoardPage from './components/boardpage/BoardPage';
import NotFoundPage from './components/notfoundpage/NotFoundPage';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [boards, setBoards] = useState([]);
  const [filteredBoards, setFilteredBoards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleCreateBoard = async (data) => {
    try {
      const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
      const response = await fetch(`${backendUrlAccess}/api/boards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const newBoard = await response.json();
      setBoards([...boards, newBoard]);
      handleCloseModal();

      getBoards();
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  const handleFilter = (category) => {
    setSelectedCategory(category);

    if (category === 'All') {
      setFilteredBoards(boards);
    } else if (category === 'Recent') {
      setFilteredBoards([...boards].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } else {
      setFilteredBoards(boards.filter(board => board.category === category));
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredBoards(boards);
      setSuggestions([]);
    } else {
      const filtered = boards.filter(board => board.title.toLowerCase().includes(query.toLowerCase()));
      setFilteredBoards(filtered);
      setSuggestions(filtered.map(board => board.title));
    }
  };

  useEffect(() => {
    getBoards();
  }, []);

  useEffect(() => {
    handleFilter(selectedCategory);
  }, [boards, selectedCategory]);

  async function getBoards() {
    try{
      const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
      const response = await fetch(`${backendUrlAccess}/boards`);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      console.log(data);
      setBoards(data);
    }
    catch(error) {
      console.error(error);
    }
  }

  return (
    <Router>
        <div>
            <Header />
            <Routes>
                <Route path="/" element={
                    <div>
                        <SearchForm handleSearch={handleSearch} suggestions={suggestions} />
                        <div className='buttons-container'>
                            <Buttons handleFilter={handleFilter} />
                            <Create onOpenModal={handleOpenModal} />
                        </div>
                        <BoardsList boards={filteredBoards} />
                        <Modal show={showModal} handleClose={handleCloseModal} handleSubmit={handleCreateBoard} />
                    </div>
                } />
                <Route path="/board/:boardId" element={<BoardPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;
