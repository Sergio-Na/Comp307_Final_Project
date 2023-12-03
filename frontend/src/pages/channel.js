import React, { useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { BsInfoCircle } from 'react-icons/bs'
import ChatInput from '../components/ChatInput'
import Message from '../components/Message'
import axiosInstance from '../axiosConfig';
import {PropagateLoader} from 'react-spinners'
import { CgProfile } from "react-icons/cg";



const Channel = () => {

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

    // Handler for image load error
    const handleImageError = (id) => {
        setImageLoadErrors(prevState => ({ ...prevState, [id]: true }));
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
                console.log(response.data.channel.userRoles)
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
        if (chatRef.current) {
            chatRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
    }, [channelMessages]);
    
    return (
        <ChannelContainer>

        
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

                        <ChatMessages>
                            {
                                channelMessages.map( msg => {
                                    const { text, user, id, timestamp } = msg;
                                    return (
                                        <Message 
                                            key={Math.random()}
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

                <ChatBottom ref={chatRef}/>
                </>
                )}
            </ChatContainer>
            <UsersContainer>
                <UsersHeading>Users</UsersHeading>
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

const ChannelContainer = styled.div`
    display: flex;
    gap: 10px;
    height: 100%; // Make sure the container takes full height if needed
`;



const UserRole = styled.div`
    width: 100%;
    border-bottom: 1px solid lightgray;
    display: flex;
    gap: 20px;
    align-items: center;
    padding: 10px;

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

`

const Loader = styled.div`
    width: 100%;
    min-height: 500px;
    display: flex;
    justify-content: center; 
    align-items: center;   

`

const ChatContainer = styled.div`
    flex: 3; // Takes 3 parts of the available space
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
    padding: 10px 20px;
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
