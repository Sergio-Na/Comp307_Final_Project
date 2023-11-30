import React from 'react'
import { useEffect } from 'react'
import axiosInstance from '../axiosConfig'
import styled from 'styled-components'
import { useState } from 'react'
import decodeToken from '../decodeToken'

const Profile = () => {

  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState({})
  const [imgError, setImgError] = useState(false);



  useEffect(() => {
    const token = window.localStorage.getItem('token')
    const decodedToken = decodeToken(token);
    const userId = decodedToken.userId;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    axiosInstance.get(`/users/${userId}`, config)
    .then(response => {
        setProfile(response.data.user)
        setLoading(false)
    })
    .catch(error => {
      console.error('Error fetching user profile', error)
    })
  }, [])
  return (
    <>
      {loading ? 
        <>
        Loading ...
        </>
        :
        <>
          <ProfileContainer>
            <EditButton>
              Edit
            </EditButton>
          {imgError ? (
              <IconContainer>
                <Icon>👤</Icon>
              </IconContainer>
            ) : (
              <Img
                src={profile?.user?.profilePicture}
                onError={() => setImgError(true)}
              />
            )}
            <Bio>
              {profile?.bio}
            </Bio>
            <NameContainer>

              <Name>{profile?.firstName} {profile?.lastName}</Name>
            </NameContainer>
            <Email>
              {profile?.email}
            </Email>

          </ProfileContainer>
          <ChannelsContainer>
            {profile?.channels.map((channel) => (
              {channel}
            ))}
          </ChannelsContainer>
        </>
    }
    </>
  )
}

const EditButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: var(--main-bg-color);
  padding: 5px 10px;
  color: white;
  border-radius: 5px;
  transition: all 0.5s ease;

  &:hover{
    transform: scale(1.05);
    background-color: var(--main-accent-color);
    color: black;
    cursor: pointer;

  }
`
const IconContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid var(--main-bg-color);
`;

const Icon = styled.span`
  font-size: 3em; // Adjust size as needed
`;




const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  max-width: 800px;
  margin: 30px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Img = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--main-bg-color);
  margin-bottom: 20px;
`;

const NameContainer = styled.div`
  margin-bottom: 10px;
`;

const Name = styled.h1`
  font-size: 1.5em;
  color: #333;
  margin: 0;
`;

const Email = styled.div`
  font-size: 1em;
  color: #555;
  margin-bottom: 15px;
`;

const Bio = styled.div`
  font-size: 1em;
  color: #666;
  margin-bottom: 20px;
  padding: 0 15px;
  text-align: center;
`;

const ChannelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

// Additional Style for Channel Item, if needed
const ChannelItem = styled.div`
  font-size: 1em;
  color: #444;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: fit-content;
`;


export default Profile