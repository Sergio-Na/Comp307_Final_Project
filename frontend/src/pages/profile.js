import React from 'react'
import { useEffect } from 'react'
import axiosInstance from '../axiosConfig'
import styled from 'styled-components'
import { useState } from 'react'
import decodeToken from '../decodeToken'
import { PacmanLoader } from 'react-spinners'

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
    <Container>
      {loading ? 
        <Screen>
          <PacmanLoader color="#84468D" />
        </Screen>
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
                src={profile?.profilePicture}
                onError={() => setImgError(true)}
              />
            )}
            <NameContainer>
              <Name>{profile?.firstName} {profile?.lastName}</Name>
            </NameContainer>
            <Bio>
              {profile?.bio}
            </Bio>

            <Email>
              {profile?.email}
            </Email>

          </ProfileContainer>
          <ChannelsContainer>
            {profile?.channels.map((channel) => (
              <ChannelItem key={channel}>{channel}</ChannelItem>
            ))}
          </ChannelsContainer>
        </>
    }
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const Screen = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;

`

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
  width: 50%;
  min-width: 300px;
  justify-self: center;
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