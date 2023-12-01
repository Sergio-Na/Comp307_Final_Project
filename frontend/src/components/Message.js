import React from 'react'
import styled from 'styled-components'

const Message = ({ message, timestamp, userName, profilePic }) => {
    return (
        <MessageContainer>
            <img src={profilePic} alt=""/>

            <MessageInfo>
                <h4>
                    {userName}{' '}
                    <span>{timestamp.toUTCString()}</span>
                </h4>
                <p>{message}</p>
            </MessageInfo>
        </MessageContainer>
    )
}

export default Message

const MessageContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;

    > img {
        object-fit: cover;
        height: 50px;
        width: 50px;
        border-radius: 8px;
    }
`;

const MessageInfo = styled.div`
    margin-left: 10px;

    > h4 > span {
        color: gray;
        font-weight: 300;
        margin-left: 4px;
        font-size: 12px;
    }
`;
