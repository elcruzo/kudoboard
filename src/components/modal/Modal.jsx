import React, { useEffect } from 'react';
import './modal.css';

function Modal({ show, handleClose, handleSubmit }) {
  if (!show) return null;

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      title: formData.get('title'),
      category: formData.get('category'),
      author: formData.get('author')
    };
    console.log('Form Data:', data)
    handleSubmit(data);
  };

  const handleOutsideClick = (event) => {
    if (event.target.classList.contains('modal-overlay')) {
        handleClose();
    }
  }

  useEffect(() => {
      window.addEventListener('click', handleOutsideClick);

      return () => {
          window.removeEventListener('click', handleOutsideClick)
      }
  }, [handleClose])

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose}>X</button>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" required />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <select id="category" name="category" required>
                <option value="All"></option>
                <option value="Celebration">Celebration</option>
                <option value="Thank You">Thank You</option>
                <option value="Inspiration">Inspiration</option>
            </select>
          </div>
          <div>
            <label htmlFor="author">Author:</label>
            <input type="text" id="author" name="author" required />
          </div>
          <button type="submit">Create Board</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
