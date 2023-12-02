import React from 'react'
import styled, { keyframes } from 'styled-components'
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import decodeToken from '../decodeToken';
import Modal from './Modal';
import { GiAbstract047 } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";







const Sidebar = () => {
    const location = useLocation();
    const pathName = location.pathname;

    const token = window.localStorage.getItem('token')
    const userId = decodeToken(token).userId

    const [channels, setChannels] = useState([])
    const [loading, setLoading] = useState(true)

    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

    useEffect(() => {
        
          axiosInstance.get(`/user-channels/${userId}`, config)
            .then(response => {
                if (Array.isArray(response.data.channels)) {
                setChannels(response.data.channels);
                
                } else {
                setChannels([]); // or handle the error accordingly
                }
                setTimeout(() => {
                    setLoading(false);
                }, 1000)
                
            })
            .catch(error => {
                console.error('Error fetching user profile', error);
                setLoading(false);
            });
    }, [])


    const isProfile = location.pathname === '/profile'

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [newChannelInfo, setNewChannelInfo] = useState({
        name: ''
    })

    const handleChannelFormChange = (e) => {
        e.preventDefault()

        setNewChannelInfo({
            name: e.target.value
        })

        
    }

    const isActive = (itemName) => pathName.includes(itemName);

    const renderLoadingIcons = () => {
        return Array.from({ length: 4 }, (_, i) => (
            <ChannelIcon 
                key={i} 
                className="loading-icon" 
                style={{ animationDelay: `${i * 0.25}s` }}
            >
                {i + 1}
            </ChannelIcon>
        ));
    };

    const handleChannelCreation = async (e) => {
        e.preventDefault();

        console.log(token)

        const body = {
            name: newChannelInfo.name // Replace with the actual channel name you want to send
        };

        console.log(config)

        try {
            const response = await axiosInstance.post('/channels', body, config);
            console.log(response.data);
        } catch (error) {
            console.error('Error creating channel:', error.response ? error.response.data : error.message);
        }
    }

  return (
    <Container $iscollapsed={isCollapsed}>

        {/* Dummy data for now */}
        <ChannelsContainer>
            {
                loading 
                ?

                    <Channels>
                        {renderLoadingIcons()}
                    </Channels>
                :

                <Channels $isprofile={isProfile}>
                    {channels.map((channel) => (
                        <NavLink key={channel.id} to={`/dashboard/channels/${channel.id}`}>
                             {/* Random icon until we get image */}
                            <ChannelIcon><GiAbstract047 size={24} /></ChannelIcon>
                        </NavLink>
                    ))}
                </Channels>
            }
            
            <BottomSidebar>
                <ChannelIcon onClick={() => setModalOpen(true)}>
                    +
                </ChannelIcon>
                <NavLink to='/profile'>
                    <ChannelIcon> 
                        <CgProfile size={24} color="#84468D" />

                    </ChannelIcon>
                </NavLink>
            </BottomSidebar>
        </ChannelsContainer>
        {!location.pathname.includes('/profile')
            &&
            <SubChannels>
                <SubChannelItem><div>#</div><div>General</div></SubChannelItem>
                <SubChannelItem><div>#</div><div>Homework</div></SubChannelItem>
                <SubChannelItem><div>#</div><div>Midterm</div></SubChannelItem>
                <SubChannelItem><div>#</div><div>Final</div></SubChannelItem>
                <SubChannelItem><div>#</div><div>Q&A</div></SubChannelItem>
            </SubChannels>

        }
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                    <ModalContent>
                        <h1>Channel Creation</h1>
                        <h5>Create Forms Here</h5>
                        <ChannelCreationForm onSubmit={(e) => handleChannelCreation(e)} onChange={(e) => {handleChannelFormChange(e)}}>
                            <Label htmlFor='ChannelName'>
                                Channel Name:
                                <Input id="channelName" name="channelName" />
                            </Label>
                            <Label>
                                Something else here...
                            </Label>

                            <Button type='submit'>
                                Create
                            </Button>
                        </ChannelCreationForm>
                    </ModalContent>
                </Modal>
        
    </Container>
  )
}

const Button = styled.button`
    background-color: var(--main-accent-color);
    padding: 15px;
    border-radius: 10px;
    transition: all 1s ease;
    width: max-content;

    &:hover{
        background-color: var(--main-bg-color);
        cursor: pointer;
        transform: scale(1.05)
    }

`

const ChannelCreationForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const ModalContent = styled.div`
    width: 40vw;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: black;

`

const Label = styled.label`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;

`

const Input = styled.input`
    min-width: 300px;
    border: 1px solid grey;
    outline: none;
    border-radius: 10px;
    padding: 5px 10px;
`

const Container = styled.div`
    display: flex;
    /* gap: 20px; */
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
const BottomSidebar = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-right: 30px;

`

const Channels = styled.div`
    display: flex;
    flex-direction: column;
    padding-right: ${props => props.$isprofile ? '30px': '0'};;
    gap: 20px;

`

const ChannelsContainer = styled.div`
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20px;
    margin-right: 10px;
    padding-bottom: 20px;

`

const colorPulsate = keyframes`
    0%, 100% { background-color: var(--main-accent-color); color: var(--main-accent-color)}
    50% { background-color: white; color: white}
`;

const ChannelIcon = styled.button`
    aspect-ratio: 1 /1 ;
    display: grid;
    place-content: center;
    background-color: var(--main-accent-color);
    padding: 20px 20px;
    width: min-content;
    border-radius: 20px;
    transition: transform 0.5s ease;

    &:hover{
        cursor: pointer;
        transform: scale(1.1)
    }

    &.loading-icon {
        animation: ${colorPulsate} 0.5s ease-in-out infinite;
        background-color: var(--main-accent-color);
        color: var(--main-accent-color)
    }

`



export default Sidebar