import React from 'react'
import styled, { keyframes } from 'styled-components'
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import decodeToken from '../decodeToken';
import Modal from './Modal';
import AlertMessage from './AlertMessage';
import { GiAbstract047 } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";



const Sidebar = () => {

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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
        name: '',
        picture: '',
    })
    const [hasImageError, setHasImageError] = useState(false);

    const handleChannelFormChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setNewChannelInfo(prevState => ({
            ...prevState,
            [name]: value,
        }));

        
    }

    const handleImageError = (e) => {
        e.target.onerror = null; // Prevents infinite callback loop
        e.target.style.display = 'none'; // Hides the broken image
    };


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

        const body = {
            name: newChannelInfo.name, // Replace with the actual channel name you want to send
            picture: newChannelInfo.picture
        };


        try {
            const response = await axiosInstance.post('/channels', body, config);
            setSuccessMessage('Channel created successfully!');
            setErrorMessage('');
            setChannels([
                ...channels,
                {
                    name: newChannelInfo.name,
                    picture: newChannelInfo.picture,
                    id: response.data.channelId

                }
            ])
            setModalOpen(false)
             // Clear any previous error messages
            // window.location.reload()

        } catch (error) {
            console.error('Error creating channel:', error.response ? error.response.data : error.message);
            setErrorMessage('Error creating channel: ' + (error.response ? error.response.data : error.message));
            setSuccessMessage(''); // Clear any previous success messages
        }
    }

    const handleNavLinkClick = (e, channelPath) => {
        if (location.pathname === channelPath) {
            e.preventDefault();
        }
    };

  return (
    <Container $iscollapsed={isCollapsed}>
        <AlertMessage message={successMessage} type="success" clearMessage={setSuccessMessage} />
        <AlertMessage message={errorMessage} type="error" clearMessage={setErrorMessage} />

        <ChannelsContainer>
        {loading ? (
                    <Channels>
                        {renderLoadingIcons()}
                    </Channels>
                ) : (
                    <Channels $isprofile={isProfile}>
                        {channels.map((channel) => (
                        <NavLink 
                            key={channel.id} 
                            to={`/dashboard/channels/${channel.id}`}
                            onClick={(e) => handleNavLinkClick(e, `/dashboard/channels/${channel.id}`)}
                        >
                            <ChannelIcon 
                            $isactive={location.pathname === `/dashboard/channels/${channel.id}`}
                            data-channel-name={channel.name} // Pass channel name here
                            >
                            {
                                channel.picture ?
                                <ChannelImage 
                                src={channel.picture} 
                                onError={handleImageError}
                                />
                                :
                                <GiAbstract047 size={32} color="#84468D" />
                            }
                            </ChannelIcon>
                        </NavLink>
                        ))}

                    </Channels>

                )}
            
            <BottomSidebar>
                <ChannelIcon onClick={() => setModalOpen(true)} data-channel-name="New Channel">
                    +
                </ChannelIcon>
                <NavLink to='/profile'>
                    <ChannelIcon $isactive={location.pathname === `/profile`} data-channel-name="Profile"> 
                        <CgProfile size={24} color="#84468D" />

                    </ChannelIcon>
                </NavLink>
            </BottomSidebar>
        </ChannelsContainer>
        {/* {!location.pathname.includes('/profile')
            &&
            <SubChannels>
                <SubChannelItem><div>#</div><div>General</div></SubChannelItem>
                <SubChannelItem><div>#</div><div>Homework</div></SubChannelItem>
                <SubChannelItem><div>#</div><div>Midterm</div></SubChannelItem>
                <SubChannelItem><div>#</div><div>Final</div></SubChannelItem>
                <SubChannelItem><div>#</div><div>Q&A</div></SubChannelItem>
            </SubChannels>

        } */}
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                    <ModalContent>
                        <h1>Channel Creation</h1>
                        <h5>Create Forms Here</h5>
                        <ChannelCreationForm onSubmit={(e) => handleChannelCreation(e)} onChange={(e) => {handleChannelFormChange(e)}}>
                            <Label htmlFor='name'>
                                Channel Name:
                                <Input id="name" name="name" />
                            </Label>
                            <Label htmlFor='picture'>
                                Picture:
                                <Input type="url" id="picture" name="picture" />
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

const ChannelImage = styled.img`
  width: 100%;  // Fill the entire width of the container
  height: 100%; // Fill the entire height of the container
  object-fit: cover; // Cover the entire area, cropping if necessary
  border-radius: 10px; // Match the border-radius of the container
`;

const colorPulsate = keyframes`
    0%, 100% { background-color: var(--main-accent-color); color: var(--main-accent-color)}
    50% { background-color: white; color: white}
`;

const ChannelIcon = styled.button`
  width: 60px;
  height: 60px;
  border-radius: ${props => props.$isactive ? '10px' : '50%'};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--main-accent-color);
  transition: border-radius 0.5s ease;

  &::before {
    content: '${props => props.$isactive ? '•' : ''}';
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    transform: translate(-47px, -3px);
    font-size: 20px;
    z-index: 1000;
    color: white;
    // Additional styles for positioning, size, color, etc.
  }

  &::after {
    display: none;
    content: attr(data-channel-name); // Use attribute for channel name
    position: absolute;
    left: 80px;
    background-color: white;
    color: var(--main-bg-color);
    padding: 5px 10px;
    border-radius: 5px;
    white-space: nowrap;
    visibility: none;
    opacity: 0;
    transition: all 0.3s ease;
    margin-left: 10px; // Gap between icon and tooltip
    z-index: 1;
  }

  &:hover::after {
    display: block;
    visibility: visible;
    opacity: 1;
  }

  &:hover {
    cursor: pointer;
    border-radius: 10px;
  }

  &.loading-icon {
        animation: ${colorPulsate} 0.5s ease-in-out infinite;
        background-color: var(--main-accent-color);
        color: var(--main-accent-color);
    }
`;



const activeStyle = {
    backgroundColor: '#FFFFFF', // Inverted color for active state
    color: 'var(--main-accent-color)' // Adjust as needed
};

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
    min-width: 350px;
    border: 1px solid grey;
    outline: none;
    border-radius: 10px;
    padding: 5px 10px;
    width: 100%;
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
    /* margin-right: 10px; */
    padding-bottom: 20px;

`






export default Sidebar