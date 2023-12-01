import React, { useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { BsInfoCircle } from 'react-icons/bs'
import ChatInput from '../components/ChatInput'
import Message from '../components/Message'


const Channel = () => {

    const date = new Date();

    const chatRef = useRef(null);

    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [])

    const [channelMessages, setChannelMessages] = useState([
        {
            message: "This is a message for testing of UI", 
            timestamp: new Date(Date.now()),
            userName: "Diego Castillo",
            profilePic: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

        },
        {
            message: "Another hardcoded message to test hihi hahahaha", 
            timestamp: new Date(Date.now()),
            userName: "John Doe",
            profilePic: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

        },
            
    ]);

    const channelID = useParams().id; 

    const channelName = "General";
    
    return (
        
        <ChatContainer>
            <div style={{minHeight: "87%"}}>
                <Header>
                    <HeaderLeft>
                        <h4><strong>#General</strong></h4>
                    </HeaderLeft>

                    <HeaderRight>
                        <p><BsInfoCircle/> Details</p>
                    </HeaderRight>
                </Header>

                <ChatMessages>
                    {
                        channelMessages.map( msg => {
                            const {message, timestamp, userName, profilePic} = msg;

                            return (
                                <Message 
                                    message={message} 
                                    timestamp={timestamp} 
                                    userName={userName}
                                    profilePic={profilePic}    
                                />
                            
                            )
                        })
                    }
                </ChatMessages>
            </div>
            
            <ChatInput
                chatRef = {chatRef}
                channelID={channelID}
                channelName={channelName}
                channelMessages={channelMessages}
                setHardcodedMessages={setChannelMessages}
            />

            <ChatBottom ref={chatRef} />

        </ChatContainer>

        
        
        
        
    )
}

export default Channel

const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overgrow-y: scroll;
    height: 100%;
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
    margin-bottom: 50px
`;

const ChatBottom = styled.div`
    padding-bottom: 20px;
`;
