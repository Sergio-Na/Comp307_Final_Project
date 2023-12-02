import React, { useState } from 'react'
import styled from 'styled-components';
import axiosInstance from '../axiosConfig';

const ChatInput = ({ token, chatRef, channelID, channelName}) => {
    
    const [input, setInput] = useState('');


    const sendMessage = async (e) => {
        e.preventDefault();

        if(!channelID){
            return false;
        }

        const headers = {
            Authorization: `Bearer ${token}`
        };

        const data = {
            text: input
        }

        try {
            const response = await axiosInstance.post(`/channels/${channelID}/messages`, 
                data, 
                {headers: headers}
            );
            console.log(response.data);
        } catch (error) {
            // Update the error state with the error message
            console.error(error);
        }

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