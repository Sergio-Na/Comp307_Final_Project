import React from 'react'
import styled from 'styled-components'
import { GrChannel } from "react-icons/gr";
import { FaRegMessage } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";
import { GiWalrusHead } from "react-icons/gi"
import { NavLink, useLocation } from 'react-router-dom';





const Sidebar = () => {
    const location = useLocation();
    const pathName = location.pathname

    const isActive = (itemName) => pathName.includes(itemName);

  return (
    <Container>
        <Menu>
            <NavLink to="/dashboard/channels">
                <MenuItem active={isActive('channels')}>
                    <Icon><GrChannel/></Icon>
                    <ItemName>Channels</ItemName>
                </MenuItem>
            </NavLink>
            <NavLink to="/dashboard/dms">
                <MenuItem active={isActive('dms')}>
                    <Icon><FaRegMessage /></Icon>
                    <ItemName>Direct messages</ItemName>
                </MenuItem>
            </NavLink>
            <NavLink to="/">
                <MenuItem active={isActive('///')}>
                    <Icon><FaQuestion /></Icon>
                    <ItemName>SOmething else</ItemName>
                </MenuItem>
            </NavLink>
            <NavLink to="/">
                <MenuItem active={isActive('///')}>
                    <Icon><FaQuestion /></Icon>
                    <ItemName>Something else</ItemName>
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


const Container = styled.div`
    width: 20%;
    max-width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
`

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
    color: ${props => props.active ? 'black' : 'white'};
    background-color: ${props => props.active ? 'white' : 'transparent'};

    transition: all 1s ease;

    &:hover {
        color: black;
        background-color: var(--main-accent-color);
    }
`;

const ItemName = styled.div`
    display: flex;
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