import React, { useEffect } from 'react';
import styled from "styled-components";

const ContextMenu = ({ mouseX, mouseY, onClose, onRemoveUser }) => {

    useEffect(() => {
        const handleClickAway = (event) => {
            // Close the menu if the click is outside
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

// ... styled components ...


const Menu = styled.div`
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    z-index: 1000;
`;

const MenuItem = styled.div`
    padding: 8px 12px;
    cursor: pointer;
    &:hover {
        background: #eee;
    }
`;
