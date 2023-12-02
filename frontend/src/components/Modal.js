import React, { useEffect } from 'react';
import styled from 'styled-components';

const Modal = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) onClose(); // 27 is the escape key
        };

        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    // Handle backdrop click
    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <ModalBackdrop onClick={handleBackdropClick}>
            <ModalContainer>
                <CloseButton onClick={onClose}>×</CloseButton>
                {children}
            </ModalContainer>
        </ModalBackdrop>
    );
};

const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
`;

const ModalContainer = styled.div`
    position: relative;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    z-index:10000;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: none;
    font-size: 20px;
    cursor: pointer;
`;

export default Modal;
 

/**
 * Example Usage
 * 
 * import React, { useState } from 'react';
    import Modal from './Modal';

    const App = () => {
        const [isModalOpen, setModalOpen] = useState(false);

        return (
            <div>
                <button onClick={() => setModalOpen(true)}>Open Modal</button>
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                    <p>This is the modal content!</p>
                </Modal>
            </div>
        );
    };

    export default App;

 */