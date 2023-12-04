import React, { useEffect } from 'react';
import styled from "styled-components";

const ContextMenu = ({ mouseX, mouseY, onClose, onRemoveUser }) => {
    useEffect(() => {
        const handleClickAway = (event) => {
            if (!event.target.closest('.context-menu')) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickAway);
        return () => {
            document.removeEventListener('mousedown', handleClickAway);
        };
    }, [onClose]);

    if (mouseX === null) return null;

    return (
        <Menu className="context-menu" style={{ top: mouseY, left: mouseX }}>
            <MenuItem onClick={onRemoveUser}>Remove User</MenuItem>
        </Menu>
    );
};

export default ContextMenu;

const Menu = styled.div`
    position: absolute;
    background: white;
    border: 1px solid var(--main-accent-color);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    z-index: 1000;
    overflow: hidden; // Ensures the border-radius is applied to child elements
`;

const MenuItem = styled.div`
    padding: 10px 15px;
    cursor: pointer;
    color: var(--main-bg-color);
    font-size: 14px;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

    &:hover {
        background: var(--main-accent-color);
        color: white;
    }
`;
