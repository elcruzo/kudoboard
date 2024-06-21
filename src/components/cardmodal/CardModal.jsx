import React, {useEffect} from 'react';
import './cardmodal.css';

function CardModal({ show, handleClose, handleSubmit, children }) {
    if (!show) return null;

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
    }, [])

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
