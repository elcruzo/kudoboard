import React from 'react';
import './cardmodal.css';

function CardModal({ show, handleClose, handleSubmit, children }) {
    if (!show) return null;

    return (
        <div className='modal-overlay'>
            <div className='modal'>
                <button className='modal-close-button' onClick={handleClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}

export default CardModal;
