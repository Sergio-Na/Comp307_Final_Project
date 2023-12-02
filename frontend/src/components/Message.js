import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axiosInstance from '../axiosConfig'

const Message = ({ text, userId, timestamp }) => {

    const [user, setUser] = useState({})

    const getUserInfo = async (userId) => {
        const token = window.localStorage.getItem('token')

        const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
        };
        console.log(text);

        axiosInstance.get(`/users/${userId}`, config)
        .then(response => {
            setUser(response.data.user);
        })
        .catch(error => {
            console.error('Error fetching user info for message display', error)
        })
    }

    useEffect(() => {
        getUserInfo(userId);
    }, []);

    return (
            <MessageContainer>
                <img src={user.profilePicture} alt=""/>

                <MessageInfo>
                    <h4>
                        {`${user.firstName} ${user.lastName}`}{' '}
                        <span>{timestamp}</span>
                    </h4>
                    <p>{text}</p>
                </MessageInfo>
            </MessageContainer>
    )
}

export default Message

const MessageContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    width: 100%;
    box-shadow: 0px 24px 3px -24px lightgray;
    
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
