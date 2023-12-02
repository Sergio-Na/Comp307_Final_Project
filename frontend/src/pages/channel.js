import React, { useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { BsInfoCircle } from 'react-icons/bs'
import ChatInput from '../components/ChatInput'
import Message from '../components/Message'
import axiosInstance from '../axiosConfig';
import {PropagateLoader} from 'react-spinners'



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
    
    return (
        
        <ChatContainer>
            {(isLoading || isLoaderVisible) ? (
                <Loader><PropagateLoader color="#84468D" /></Loader> // Or any loading indicator you prefer
            ) : (
                <>
                <div style={{minHeight: "80%"}}>
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
                                // console.log(msg);
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
                </div>
            
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
        

    )
}

export default Channel

const Loader = styled.div`
    width: 100%;
    min-height: 500px;
    display: flex;
    justify-content: center; 
    align-items: center;   

`

const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    height: 86vh;
    display: block;
    overflow-y: scroll; // Enable vertical scrolling

    // Hide scrollbar for Chrome, Safari and Opera
    &::-webkit-scrollbar {
        display: none; // Hide scrollbar in Webkit browsers
    }

    // Hide scrollbar for IE, Edge, and Firefox
    -ms-overflow-style: none;  // IE and Edge
    scrollbar-width: none;  // Firefox
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
`;

const ChatBottom = styled.div`
    /* padding-bottom: 20px; */
`;
