import React from 'react';
import './cardmodal.css';

function Modal({ show, handleClose, handleSubmit, children }) {
    if (!show) return null;

    return (
        <div className='modal-overlay'>
            <div className='modal'>
                <button className='modal-close-button' onClick={handleClose}>
                    &times;
                </button>
                {children}
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default Modal;
