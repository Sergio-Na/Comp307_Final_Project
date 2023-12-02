import React, { useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { BsInfoCircle } from 'react-icons/bs'
import ChatInput from '../components/ChatInput'
import Message from '../components/Message'
import axiosInstance from '../axiosConfig';



const Channel = () => {

    const channelID = useParams().id; 
    const token = window.localStorage.getItem('token')
    const chatRef = useRef(null);

    const [channelMessages, setChannelMessages] = useState([]);
    const [userRoles, setUserRoles] = useState([]);
    const [channelName, setChannelName] = useState("");
    

    useEffect(() => {

        const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
        };

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


        })
        .catch(error => {
            console.error('Error fetching channel information', error);
        });

        chatRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, []);
    
    return (
        
        <ChatContainer>
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
                            console.log(msg);
                            return (
                                <Message 
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

        </ChatContainer>

    )
}

export default Channel

const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    height: 86vh;
    display: block;
    overflow: scroll;
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
    padding-bottom: 20px;
`;
