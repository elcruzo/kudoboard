import React, { useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import SearchForm from './components/searchform/SearchForm';
import Buttons from './components/buttons/Buttons';
import Create from './components/create/Create';
import CardList from './components/cardlist/CardList';
import Modal from './components/modal/Modal';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [boards, setBoards] = useState([]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleCreateBoard = async (data) => {
    try {
      const response = await fetch('/api/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const newBoard = await response.json();
      setBoards([...boards, newBoard]);
      handleCloseModal();
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  return (
    <div>
      <Header />
      <SearchForm />
      <div className='buttons-container'>
        <Buttons />
        <Create onOpenModal={handleOpenModal} />
      </div>
      <CardList boards={boards} />
      <Modal show={showModal} handleClose={handleCloseModal} handleSubmit={handleCreateBoard} />
    </div>
  );
}

export default App;
