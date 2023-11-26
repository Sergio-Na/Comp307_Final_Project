import React from 'react'
import styled from 'styled-components'
import { GrChannel } from "react-icons/gr";
import { FaRegMessage } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";
import { GiWalrusHead } from "react-icons/gi";





const Sidebar = () => {
  return (
    <Container>
        <Menu>
            <MenuItem><Icon><GrChannel/></Icon><ItemName>Channels</ItemName></MenuItem>
            <MenuItem><Icon><FaRegMessage /></Icon><ItemName>Direct messages</ItemName></MenuItem>
            <MenuItem><Icon><FaQuestion /></Icon><ItemName>SOmething else</ItemName></MenuItem>
            <MenuItem><Icon><FaQuestion /></Icon><ItemName>Something else</ItemName></MenuItem>
        </Menu>
        <ProfileTab>
            <GiWalrusHead size={75}/>
            Profile
        </ProfileTab>
        
    </Container>
  )
}


const Container = styled.div`
    background-color: #b9b9b9;
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
    display: flex;
    gap: 15px;
`

const ItemName = styled.div`
    

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
    

`

export default Sidebar