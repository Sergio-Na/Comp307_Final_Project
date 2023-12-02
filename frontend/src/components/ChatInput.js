import React, { useState } from 'react'
import styled from 'styled-components';

const ChatInput = ({ chatRef, channelID, channelName, channelMessages, setHardcodedMessages}) => {

    const date = new Date();
    
    const [input, setInput] = useState('');


    const sendMessage = (e) => {
        e.preventDefault();

        if(!channelID){
            return false;
        }

        setHardcodedMessages(
            [...channelMessages, 
                {
                    message: input, 
                    timestamp: new Date(Date.now()),
                    userName: "Jane Doe",
                    profilePic: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }]);        
        
        chatRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
        })

        setInput("");
    }

    return (
    <InputContainer>
        <form>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Message #${channelName}`}/>
            <button type="submit" style={{display: "none"}} onClick={sendMessage}>
                SEND
            </button>
        </form>
    </InputContainer>
    )
}

export default ChatInput;

const InputContainer = styled.div`
    position: sticky; 
    bottom: 0;
    width: 100%;
    background-color: #EEEEEE;

    > form {        
        position: relative;   
        display:flex;
        justify-content: center;
    }

    > form > input {
        position: relative;    
        width: 100%;   
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }
`;