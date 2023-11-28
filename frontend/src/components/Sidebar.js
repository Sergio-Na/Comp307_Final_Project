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
        {/* <ToggleCollapseButton $iscollapsed={isCollapsed} onClick={() => setIsCollapsed(!isCollapsed)}>
            <GoSidebarCollapse  size={25}/>
        </ToggleCollapseButton>
        <>
            <ChannelSubFields>
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
            </ChannelSubFields>
            <NavLink to='/dashboard/profile'>
                <ProfileTab>
                    <GiWalrusHead size={75}/>
                    Profile
                </ProfileTab>
            </NavLink>
        </> */}
        <ChannelsContainer>
            <Channels>
                <ChannelIcon>1</ChannelIcon>
                <ChannelIcon>2</ChannelIcon>
                <ChannelIcon>3</ChannelIcon>
                <ChannelIcon>4</ChannelIcon>
            </Channels>
            <AddChannel>
                <ChannelIcon>
                    +
                </ChannelIcon>
            </AddChannel>
        </ChannelsContainer>
        <SubChannels>
            <SubChannelItem><div>#</div><div>General</div></SubChannelItem>
            <SubChannelItem><div>#</div><div>Homework</div></SubChannelItem>
            <SubChannelItem><div>#</div><div>Midterm</div></SubChannelItem>
            <SubChannelItem><div>#</div><div>Final</div></SubChannelItem>
            <SubChannelItem><div>#</div><div>Q&A</div></SubChannelItem>
        </SubChannels>
        
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    gap: 20px;
`

const SubChannels = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    background-color: var(--main-accent-color);
    margin: 0px 0px 5px 0px;
    border-radius: 10px 0px 0px 10px;
    padding: 20px 0px;
    padding-left: 10px;

`

const SubChannelItem = styled.div`
    display: flex;
    gap: 10px;
    min-width: 200px;
    color: black;
    padding: 5px 15px;
    border-radius: 10px;
    background-color: #ffffff47;
    margin-right: 20px;
    transition: all 1s ease;

    &:hover{
        cursor: pointer;
        transform: scale(1.05);
        font-weight: bold;
    }

`
const AddChannel = styled.div`
    

`

const Channels = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

`

const ChannelsContainer = styled.div`
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20px;
    padding-bottom: 20px;

`

const ChannelIcon = styled.button`
    background-color: var(--main-accent-color);
    padding: 20px 30px;
    width: min-content;
    border-radius: 20px;
    transition: all 1s ease;

    &:hover{
        cursor: pointer;
        transform: scale(1.1)
    }

`

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



// const Container = styled.div`
//     width: ${props => props.$iscollapsed ? '15%' : '20%'};
//     max-width: ${props => props.$iscollapsed ? '60px' : '200px'};
//     transition: width 0.3s ease;
//     position: relative;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     margin-top: 20px;
//     padding: 20px;
//     padding: ${props => props.$iscollapsed ? '20px 10px' : '20px'};

//     transition: all 1s ease;
// `;

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