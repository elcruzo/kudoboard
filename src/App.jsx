import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/Header';
import SearchForm from './components/searchform/SearchForm';
import Buttons from './components/buttons/Buttons';
import Create from './components/create/Create';
import BoardsList from './components/boardslist/BoardsList';
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

  useEffect(() => {
    getBoards();
  }, []);

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
    <div>
      <Header />
      <SearchForm />
      <div className='buttons-container'>
        <Buttons />
        <Create onOpenModal={handleOpenModal} />
      </div>
      <BoardsList boards={boards} />
      <Modal show={showModal} handleClose={handleCloseModal} handleSubmit={handleCreateBoard} />
    </div>
  );
}

export default App;
