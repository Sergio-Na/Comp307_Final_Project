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



const Channel = () => {

    const clearSuccessMessage = () => setSuccessMessage("");
    const clearErrorMessage = () => setErrorMessage("");



    const channelID = useParams().id; 
    const token = window.localStorage.getItem('token')

    const chatRef = useRef(null);

    const [channelMessages, setChannelMessages] = useState([]);
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
            <AlertMessage message={successMessage} type="success" clearMessage={clearSuccessMessage} />
            <AlertMessage message={errorMessage} type="error" clearMessage={clearErrorMessage} />

        
            <ChatContainer>
                {(isLoading || isLoaderVisible) ? (
                    <Loader><PropagateLoader color="#84468D" /></Loader> // Or any loading indicator you prefer
                ) : (
                    <>
                        <Header>
                            <HeaderLeft>
                                <h4><strong># {channelName}</strong></h4>
                            </HeaderLeft>

                            <HeaderRight>
                                <p><BsInfoCircle/> Details</p>
                            </HeaderRight>
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
                    token = {token}
                    chatRef = {chatRef}
                    channelID={channelID}
                    channelName={channelName}
                    channelMessages={channelMessages}
                    setChannelMessages={setChannelMessages}
                />

                {/* <ChatBottom ref={chatRef}/> */}
                </>
                )}
            </ChatContainer>
            <UsersContainer>

                <UsersHeading>
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
                    <UserRole key={userRole.id}>
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

`

const UserImageBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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
    padding: 20px;
    border-bottom: 1px solid lightgray
`;

const HeaderLeft = styled.div`
    display: flex;
    >h4 {
        display: flex;
    }
`;

const HeaderRight= styled.div`
    > p {
        display: flex;
        align-items: center;
        font-size: 14px;
    }
`;

const ChatMessages = styled.div`
    //  margin-bottom: 53px
    flex-grow: 1; // Allow this component to grow and fill the space
    overflow-y: auto; // If messages overflow, they can be scrolled
`;

const ChatBottom = styled.div`
    /* padding-bottom: 20px; */
`;
