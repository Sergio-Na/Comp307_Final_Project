import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { BsInfoCircle } from 'react-icons/bs'
import ChatInput from '../components/ChatInput'
import Message from '../components/Message'
import axiosInstance from '../axiosConfig';
import {PropagateLoader} from 'react-spinners'
import { CgProfile } from "react-icons/cg";
import { FaCirclePlus } from "react-icons/fa6";
import AlertMessage from '../components/AlertMessage';
import decodeToken from '../decodeToken';
import Modal from '../components/Modal';
import ContextMenu from '../components/ContextMenu';
import SearchMessage from '../components/SearchMessage';



const Channel = ( {socket} ) => {

    const [contextMenu, setContextMenu] = useState({
        mouseX: null,
        mouseY: null,
        userEmail: null,
    });
    
    
    const clearSuccessMessage = () => setSuccessMessage("");
    const clearErrorMessage = () => setErrorMessage("");

    const channelID = useParams().id; 
    const token = window.localStorage.getItem('token')

    const chatRef = useRef(null);

    const [channelMessages, setChannelMessages] = useState([]);
    const [channelImage, setChannelImage] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoaderVisible, setIsLoaderVisible] = useState(true);
    const minLoadingTime = 1000; // 1 second, adjust as needed
    const [userRoles, setUserRoles] = useState([]);
    const [channelName, setChannelName] = useState("");
    const [imageLoadErrors, setImageLoadErrors] = useState({});
    const [userSearching, setUserSearching] = useState(false)
    const [userEmail, setUserEmail] = useState("");
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);

    const [editChannelName, setEditChannelName] = useState("");
    const [editChannelPicture, setEditChannelPicture] = useState("");


    const handleRightClickOnUser = (event, userEmail) => {
        event.preventDefault();
        if (!isCurrentUserAdmin) return;
        
        setContextMenu({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
            userEmail,
        });
    };

    
    const handleRemoveUser = async () => {
        try {
            const response = await axiosInstance.delete(`/channels/${channelID}/users`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { email: contextMenu.userEmail }, // Axios DELETE with body
            });
    
            setSuccessMessage(response.data.message);
            // Update the userRoles state to reflect the removal
            setUserRoles(userRoles.filter((user) => user.email !== contextMenu.userEmail));
        } catch (error) {
            setErrorMessage(error.response?.data?.error || 'Failed to remove user');
        }
    
        setContextMenu({ mouseX: null, mouseY: null, userEmail: null });
    };
    
    

    const handleEditChannel = () => {
        setEditChannelName(channelName);
        setEditChannelPicture(channelImage);
        setIsModalOpen(true);
    };

    const handleChannelUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.patch(`/channels/${channelID}`, {
                name: editChannelName,
                picture: editChannelPicture,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            setSuccessMessage(response.data.message);
            setChannelName(editChannelName); // Update the channel name in the local state
            // Optionally, update the channel picture in the local state if needed
        } catch (error) {
            setErrorMessage(error.response?.data?.error || 'Failed to update channel');
        }
        setIsModalOpen(false);
    };

    const handleDeleteChannel = async () => {
        try {
            const response = await axiosInstance.delete(`/channels/${channelID}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            setSuccessMessage(response.data.message); // Set success message only here
            window.location.href = '/dashboard'; // Redirect after successful deletion
        } catch (error) {
            setErrorMessage(error.response?.data?.error || 'Failed to delete channel');
        } finally {
            setShowDeleteConfirmModal(false); // Close modal regardless of outcome
        }
    };
    
    




    // Handler for image load error
    const handleImageError = (id) => {
        setImageLoadErrors(prevState => ({ ...prevState, [id]: true }));
    };

    const handleAddUserToChannel = async (e) => {
        e.preventDefault();
        if (!userEmail) return;
    
        setIsAddingUser(true);
        try {
            const response = await axiosInstance.post(`/channels/${channelID}/users`, 
                { email: userEmail },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setUserRoles([...userRoles, response.data.user]);
            setSuccessMessage("User added successfully.");
            setErrorMessage(""); // Reset error message
            setUserEmail(""); // Clear input field
            setIsAddingUser(false);
            // Display success message or other UI update


        } catch (error) {
            console.error('Error adding user to channel', error);
            // Display error message
            setIsAddingUser(false);
            setErrorMessage("Error adding user to channel");
            setSuccessMessage(""); // Reset success message

        }
    };
    
    
    const addMessage = (message) => {
        const date = new Date()
        const now = date.toISOString()
        setChannelMessages([...channelMessages, {
            text: message.text,
            user: message.user,
            _id: Math.random() * 300,
            timestamp: now
        }])
    }

    

    useEffect(() => {
        setIsLoading(true)
        setChannelMessages([])
        const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
        };
        setIsLoaderVisible(true);
        const loaderTimeout = setTimeout(() => setIsLoaderVisible(false), minLoadingTime);
        axiosInstance.get(`/channels/${channelID}`, config)
        .then(response => {
            setChannelImage(response.data.channel.picture)
            if (Array.isArray(response.data.channel.messages)) {
                
                setChannelMessages(response.data.channel.messages);
            } else {
                setChannelMessages([]); 
            }

            if (Array.isArray(response.data.channel.userRoles)) {
                setUserRoles(response.data.channel.userRoles);
            } else {
                setUserRoles([]); 
            }

            if(response.data){
                setChannelName(response.data.channel.name);
            }
            setIsLoading(false)
            if (chatRef.current) {
                chatRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                });
            }

        })
        .catch(error => {
            console.error('Error fetching channel information', error);
            setIsLoading(false)
        });
        
        return () => clearTimeout(loaderTimeout);
        
        
    }, [channelID]);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage("");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);
    
    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    useEffect(() => {
        const currentUserId = decodeToken(token).userId; // Decode user ID from token
        const adminCheck = userRoles.some(role => role.id === currentUserId && role.role === 'admin');
        setIsCurrentUserAdmin(adminCheck);
    }, [userRoles, token]);

    const closeContextMenu = () => {
        setContextMenu({ mouseX: null, mouseY: null, userEmail: null });
    };
    
    useEffect(() => {
        socket.on('messageResponse', (data) => {
            addMessage(data);
        });
    }, [socket, channelMessages]);
    

    useLayoutEffect(() => {
        setTimeout(() => {
            if (chatRef.current) {
                const chatElement = chatRef.current;
                chatElement.scrollTop = chatElement.scrollHeight;
            }
        }, 1000); // Adjust delay as needed
    }, [channelMessages]);
    
    return (
        <ChannelContainer>
            <Modal isOpen={showDeleteConfirmModal} onClose={() => setShowDeleteConfirmModal(false)}>
                <ModalContent>
                    <p>Are you sure you want to delete this channel?</p>
                    <ButtonGroup>
                        <ConfirmButton onClick={handleDeleteChannel}>Yes, Delete</ConfirmButton>
                        <CancelButton onClick={() => setShowDeleteConfirmModal(false)}>Cancel</CancelButton>
                    </ButtonGroup>
                </ModalContent>
            </Modal>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalContent>
                

                    <ChannelEditForm onSubmit={handleChannelUpdate}>
                        <Label>
                            Channel Name:
                            <Input type="text" value={editChannelName} onChange={(e) => setEditChannelName(e.target.value)} />
                        </Label>
                        <Label>
                            Picture URL:
                            <Input type="text" value={editChannelPicture} onChange={(e) => setEditChannelPicture(e.target.value)} />
                        </Label>
                        <SubmitButton type="submit">Update Channel</SubmitButton>
                        <DeleteButton type="button" onClick={() => {
                            setSuccessMessage(""); // Reset success message
                            setIsModalOpen(false)
                            setShowDeleteConfirmModal(true);
                        }}>
                            Delete
                        </DeleteButton>
                    </ChannelEditForm>
                </ModalContent>
            </Modal>
            <AlertMessage message={successMessage} type="success" clearMessage={clearSuccessMessage} />
            <AlertMessage message={errorMessage} type="error" clearMessage={clearErrorMessage} />

        
            <ChatContainer>
                {(isLoading || isLoaderVisible) ? (
                    <Loader><PropagateLoader color="#84468D" /></Loader> // Or any loading indicator you prefer
                ) : (
                    <>
                        <Header>
                            <HeaderLeft>
                                <SearchMessage users={userRoles} channelMessages={channelMessages} channelName={channelName}/>
                                <h4><strong># {channelName}</strong></h4>
                            </HeaderLeft>

                            {isCurrentUserAdmin && (
                            <EditButton onClick={handleEditChannel}>
                                Edit
                            </EditButton>
            )}
                        </Header>

                        <ChatMessages ref={chatRef}>
                            {
                                channelMessages.map( msg => {
                                    const { text, user, _id, timestamp } = msg;
                                    return (
                                        <Message 
                                            key={_id}
                                            text={text} 
                                            userId={user}
                                            timestamp={new Date(timestamp).toUTCString()}
                                        />
                                    
                                    )
                                })
                            }
                        </ChatMessages>
                
                <ChatInput
                    socket= {socket}
                    token = {token}
                    chatRef = {chatRef}
                    channelID={channelID}
                    channelName={channelName}
                    channelMessages={channelMessages}
                    setChannelMessages={setChannelMessages}
                    addMessage={addMessage}
                />

                {/* <ChatBottom ref={chatRef}/> */}
                </>
                )}
                <AlertMessage message={successMessage} type="success" clearMessage={clearSuccessMessage} />
                <AlertMessage message={errorMessage} type="error" clearMessage={clearErrorMessage} />
            </ChatContainer>
            <UsersContainer>

                <UsersHeading>
                <ContextMenu 
                    mouseX={contextMenu.mouseX}
                    mouseY={contextMenu.mouseY}
                    onClose={closeContextMenu}
                    onRemoveUser={handleRemoveUser}
                />

                    <div>Users</div>
                    <div>
                        <AddUserButton>
                            <FaCirclePlus size={28} onClick={() => setUserSearching(!userSearching)}/>
                        </AddUserButton>
                    </div>
                </UsersHeading>
                {
                    userSearching &&
                    <SearchForm onSubmit={handleAddUserToChannel}>
                        <SearchInput 
                            type="email" 
                            placeholder="Enter user email" 
                            value={userEmail} 
                            onChange={(e) => setUserEmail(e.target.value)} 
                        />
                        <SearchButton type="submit" disabled={isAddingUser}>
                            {isAddingUser ? "Adding..." : "Add"}
                        </SearchButton>

                    </SearchForm>
                }
                {userRoles.map((userRole) => (
                    <UserRole key={userRole.id} onContextMenu={(e) => handleRightClickOnUser(e, userRole.email)}>
                        <UserImageBox>
                            {!imageLoadErrors[userRole.id] && userRole.profilePicture ? (
                                <UserImage 
                                    src={userRole.profilePicture} 
                                    onError={() => handleImageError(userRole.id)}
                                    alt={`${userRole.firstName}'s Profile`} 
                                />
                            ) : (
                                <CgProfile size={40} color="#84468D" /> // Adjust icon size and color as needed
                            )}
                        </UserImageBox>
                        <UserInfo>
                            <UserName>{userRole.firstName} {userRole.lastName}</UserName>
                            <UserRoleInfo>{userRole.role}</UserRoleInfo>
                            
                        </UserInfo>
                    </UserRole>
                ))}
            </UsersContainer>
        </ChannelContainer>
        

    )
}





export default Channel

const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
`;

const ConfirmButton = styled.button`
    background-color: #FF6347;
    padding: 10px 20px;
    border-radius: 5px;
    color: white;

    &:hover{
        cursor: pointer;
    }
    // ... additional styles ...
`;

const CancelButton = styled.button`
    background-color: #808080; // Grey color
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
    &:hover{
        cursor: pointer;
    }
    // ... additional styles ...
`;

const ChannelEditForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Label = styled.label`
    display: block;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-sizing: border-box;
`;

const SubmitButton = styled.button`
    background-color: var(--main-bg-color);
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: var(--main-accent-color);
        color: black;
    }
`;
const DeleteButton = styled(SubmitButton)`
    background-color: red;
`


const ModalContent = styled.div`
    width: 40vw;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: black;

`


const SearchForm = styled.form`
    display: flex;
    gap: 10px;
    margin-top: 10px;
`;

const SearchInput = styled.input`
    flex-grow: 1;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
`;

const SearchButton = styled.button`
    padding: 10px 15px;
    background-color: #84468D;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #763d7a;
    }
`;

const ChannelContainer = styled.div`
    display: flex;
    gap: 10px;
    height: 100%; // Make sure the container takes full height if needed
`;

const EditButton = styled.button`
display: flex;
align-items: center;
  background-color: var(--main-bg-color); // A pleasant blue color
  color: white;
  font-size: 12px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  /* margin-top: 10px; */
  align-self: flex-start; // Aligns the button to the start of its container

  &:hover {
    background-color: var(--main-accent-color); // Slightly darker shade of blue on hover
    color: black;
  }

  &:active {
    background-color: var(--main-bg-color);
    transform: translateY(1px); 
  }
`;

const AddUserButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--main-bg-color);
    color: white;
    border-radius: 50%;
    transition: all 1s ease;

    &:hover{
        transform: scale(1.05);
        cursor: pointer;
    }
`



const UserRole = styled.div`
    width: 100%;
    border-bottom: 1px solid lightgray;
    display: flex;
    gap: 20px;
    align-items: center;
    padding: 10px 0;
    border-radius: 5px;

    &:hover{
        cursor: pointer;
        background-color: var(--main-accent-color)
    }

`

const UserImageBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
`

const UserImage = styled.img`
    object-fit: cover;
    width: 40px;
    height: 40px;
    border-radius: 5px;

`

const UserName = styled.div`

`

const UserRoleInfo = styled.div`
    font-size: 12px;
    color: #959595;

`

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const UsersHeading = styled.h3`
    display: flex;
    justify-content: space-between;
`

const Loader = styled.div`
    width: 100%;
    min-height: 500px;
    display: flex;
    justify-content: center; 
    align-items: center;   

`

const ChatContainer = styled.div`
    flex: 2; 
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    max-height: 87vh;

    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const UsersContainer = styled.div`
    flex: 1; // Takes 1 part of the available space
    padding: 10px 0px 10px 10px;
    border-left: 1px solid lightgray;
    overflow-y: auto; // Enable scrolling if the content overflows
`;


const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid lightgray
`;

const HeaderLeft = styled.div`
    width: 100%;
    display: flex-block;
    >h4 {
        display: flex;
    }
`;

const ChatMessages = styled.div`
    //  margin-bottom: 53px
    flex-grow: 1; 
    overflow-y: auto;
`;
