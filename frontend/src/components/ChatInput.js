import React, { useRef } from 'react'
import styled from 'styled-components';

const ChatInput = ({ channelID, channelName}) => {

    const hardcodedMessages = [
        {message: "This is a message for testing of UI"}
    ]
    const inputRef = useRef(null);
    const sendMessage = (e) => {
        e.preventDefault();

        if(!channelID){

        }
    }

    return (
    <InputContainer>
        <form>
            <input placeholder={`Message #${channelName}`}/>
            <button type="submit" style={{display: "none"}} onClick={sendMessage}>
                SEND
            </button>
        </form>
    </InputContainer>
    )
}

export default ChatInput;

const InputContainer = styled.div`
    border-radius: 10px;

    > form {
        position: relative;
        display: flex;
        justify-content: center;
    }

    > form > input {
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }
`;