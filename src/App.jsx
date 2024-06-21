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
import Login from './components/login/Login';
import Footer from './components/footer/Footer';

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
      const response = await fetch(`${backendUrlAccess}/boards`, {
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
      setBoards(prevBoards => [...prevBoards, newBoard]);
      handleCloseModal();

    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  const handleDeleteBoard = async (id) => {
    try {
        const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
        const response = await fetch(`${backendUrlAccess}/boards/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete board');
        }

        setBoards(prevBoards => prevBoards.filter(board => board.id !== id));
        console.log('Board deleted successfully');
    } catch (error) {
        console.error('Error in deleting board:', error);
    }
  };

  const handleFilter = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  }

  useEffect(() => {
    const getBoards = async () => {
      try{
        const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
        const response = await fetch(`${backendUrlAccess}/boards`);
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();
        setBoards(data);
      }
      catch(error) {
        console.error(error);
      }
    };

    getBoards();
  }, []);

  useEffect(() => {
    let updatedBoards = boards;

    if (selectedCategory === 'Recent') {
      updatedBoards = [...boards].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (selectedCategory != 'All') {
      updatedBoards = boards.filter(board => board.category === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      updatedBoards = updatedBoards.filter((board) => board.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    setFilteredBoards(updatedBoards);
    setSuggestions(updatedBoards.map((board) => board.title));
  }, [boards, selectedCategory, searchQuery]);

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
                        <BoardsList boards={filteredBoards} handleDeleteBoard={handleDeleteBoard} />
                        <Footer />
                        <Modal show={showModal} handleClose={handleCloseModal} handleSubmit={handleCreateBoard} />
                    </div>
                } />
                <Route path="/board/:boardId" element={<BoardPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;
