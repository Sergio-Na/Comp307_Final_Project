import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { BsInfoCircle } from 'react-icons/bs'
import ChatInput from '../components/ChatInput'


const Channel = () => {
    const channelID = useParams().id; 

    const channelName = "General";
    
    return (
        <ChatContainer>
            <Header>
                <HeaderLeft>
                    <h4><strong>#General</strong></h4>
                </HeaderLeft>

                <HeaderRight>
                    <p><BsInfoCircle/> Details</p>
                </HeaderRight>
            </Header>

            <ChatMessages>

            </ChatMessages>

            <ChatInput
                channelID={channelID}
                channelName={channelName}
            />


        </ChatContainer>
        
    )
}

export default Channel

const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
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

`;