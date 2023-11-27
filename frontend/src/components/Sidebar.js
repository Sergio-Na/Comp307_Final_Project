import React from 'react'
import styled from 'styled-components'
import { GrChannel } from "react-icons/gr";
import { FaRegMessage } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";
import { GiWalrusHead } from "react-icons/gi"
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { GoSidebarCollapse } from "react-icons/go";





const Sidebar = () => {
    const location = useLocation();
    const pathName = location.pathname

    const [isCollapsed, setIsCollapsed] = useState(false);

    const isActive = (itemName) => pathName.includes(itemName);

  return (
    <Container $iscollapsed={isCollapsed}>
        <ToggleCollapseButton $iscollapsed={isCollapsed} onClick={() => setIsCollapsed(!isCollapsed)}>
            <GoSidebarCollapse  size={25}/>
        </ToggleCollapseButton>
        <Menu>
            <NavLink to="/dashboard/channels">
                <MenuItem $active={isActive('channels')}>
                    <Icon><GrChannel/></Icon>
                    <ItemName $iscollapsed={isCollapsed}>Channels</ItemName>
                </MenuItem>
            </NavLink>
            <NavLink to="/dashboard/dms">
                <MenuItem $active={isActive('dms')}>
                    <Icon><FaRegMessage /></Icon>
                    <ItemName $iscollapsed={isCollapsed}>Direct messages</ItemName>
                </MenuItem>
            </NavLink>
            <NavLink to="/">
                <MenuItem $active={isActive('///')}>
                    <Icon><FaQuestion /></Icon>
                    <ItemName $iscollapsed={isCollapsed}>SOmething else</ItemName>
                </MenuItem>
            </NavLink>
            <NavLink to="/">
                <MenuItem $active={isActive('///')}>
                    <Icon><FaQuestion /></Icon>
                    <ItemName $iscollapsed={isCollapsed}>Something else</ItemName>
                </MenuItem>
            </NavLink>
        </Menu>
        <ProfileTab>
            <GiWalrusHead size={75}/>
            Profile
        </ProfileTab>
        
    </Container>
  )
}

const ToggleCollapseButton = styled.button`
    position: absolute;
    top: -15px;
    right: 15px;
    padding: 5px;

    transition: all 1s ease;

    transform: rotate(${props => props.$iscollapsed ? '0deg' : '180deg'});

    &:hover{
        cursor: pointer;
    }

`;



const Container = styled.div`
    width: ${props => props.$iscollapsed ? '15%' : '20%'};
    max-width: ${props => props.$iscollapsed ? '60px' : '200px'};
    transition: width 0.3s ease;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 20px;
    padding: 20px;
    padding: ${props => props.$iscollapsed ? '20px 10px' : '20px'};

    transition: all 1s ease;
`;

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

`

const MenuItem = styled.div`
    border:none;
    border-radius: 10px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    gap: 15px;
    color: ${props => props.active ? 'white' : 'black'};
    background-color: ${props => props.$active ? 'white' : 'transparent'};
    &:hover {
        background-color: ${props => props.$iscollapsed ? 'transparent' : 'var(--main-accent-color)'};
    }

    transition: all 1s ease;

    &:hover {
        color: black;
        background-color: ${props => props.iscollapsed ? 'transparent' : 'var(--main-accent-color)'};
    }
`;

const ItemName = styled.div`
    transition: all 1s ease;
    display: ${props => props.$iscollapsed ? 'none' : 'flex'};

    padding-top: 3px;
    align-items: center;

`

const ProfileTab = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: 20px;

`

const Icon = styled.div`
    display: flex;
    align-items: center;

`

export default Sidebar