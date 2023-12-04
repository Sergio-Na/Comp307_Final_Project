// AlertMessage.jsx
import styled from 'styled-components';
import { useEffect } from 'react';

const Alert = styled.div`
    padding: 10px 20px;
    border-radius: 4px;
    color: white;
    text-align: center;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
`;

const SuccessAlert = styled(Alert)`
    background-color: #4CAF50; // Green
`;

const ErrorAlert = styled(Alert)`
    background-color: #F44336; // Red
`;

const AlertMessage = ({ message, type, clearMessage }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            clearMessage("");
        }, 2000);
        return () => clearTimeout(timer);
    }, [message, clearMessage]);

    return (
        <>
            {type === 'success' && message && <SuccessAlert>{message}</SuccessAlert>}
            {type === 'error' && message && <ErrorAlert>{message}</ErrorAlert>}
        </>
    );
}

export default AlertMessage;
