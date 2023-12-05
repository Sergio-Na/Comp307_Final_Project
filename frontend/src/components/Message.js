import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axiosInstance from '../axiosConfig'
import { CgProfile } from "react-icons/cg";


const Message = ({ text, userId, timestamp }) => {

    console.log(text, userId, timestamp)

    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    const handleImageError = (e) => {
        e.preventDefault()
        setImageError(true)
    }


    const getUserInfo = async (userId) => {
        const token = window.localStorage.getItem('token')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    
        setIsLoading(true); // Start loading
    
        axiosInstance.get(`/users/${userId}`, config)
        .then(response => {
            setUser(response.data.user);
            setIsLoading(false); // Stop loading after data is fetched
        })
        .catch(error => {
            console.error('Error fetching user info for message display', error);
            setIsLoading(false); // Stop loading in case of error
        })
    }
    

    useEffect(() => {
        getUserInfo(userId);
    }, []);

    const SkeletonLoader = () => (
        <SkeletonContainer>
            <div className="skeleton-avatar"></div>
            <div className="skeleton-content">
                <div className="skeleton-text short"></div>
                <div className="skeleton-text long"></div>
            </div>
        </SkeletonContainer>
    );
    

    return (
        <MessageContainer>
            {isLoading ? (
                <SkeletonLoader />
            ) : (
                <>
                    {
                        !imageError ? 
                        <img src={user.profilePicture} alt="" onError={handleImageError}/>
                        :
                        <CgProfile size={40} color="#84468D" />
                    }
                    
    
                    <MessageInfo>
                        <h4>
                            {`${user.firstName} ${user.lastName}`}{' '}
                            <span>{timestamp}</span>
                        </h4>
                        <p>{text}</p>
                    </MessageInfo>
                </>
            )}
        </MessageContainer>
    );
    
}

export default Message

const SkeletonContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    width: 100%;

    .skeleton-avatar {
        background: lightgray;
        height: 50px;
        width: 50px;
        border-radius: 8px;
    }

    .skeleton-content {
        margin-left: 10px;
        width: 100%;

        .skeleton-text {
            background: lightgray;
            height: 12px;
            border-radius: 4px;
            margin: 5px 0;

            &.short {
                width: 30%;
            }

            &.long {
                width: 70%;
            }
        }
    }
`;


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
