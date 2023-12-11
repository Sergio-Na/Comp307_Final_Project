import React, { useState, useEffect } from 'react'
import {PropagateLoader} from 'react-spinners';
import styled from 'styled-components';
import axiosInstance from '../axiosConfig';
import decodeToken from '../decodeToken';
import { GiAbstract047 } from "react-icons/gi";
import Message from '../components/Message';
import { NavLink } from 'react-router-dom';



const Dashboard = () => {
  
  const [channels, setChannels] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const token = window.localStorage.getItem('token')
  const userId = decodeToken(token).userId

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  
  useEffect(() => {      
    axiosInstance.get(`/user-channels/${userId}`, config)
      .then(response => {
          if (Array.isArray(response.data.channels)) {
              setChannels(response.data.channels);
          
          } else {
            setChannels([]); // or handle the error accordingly
          }
          setTimeout(() => {
              setIsLoading(false);
          }, 1000)
          
      })
      .catch(error => {
          console.error('Error fetching user channels', error);
          setIsLoading(false);
      });

  }, [channels]);

  const getLatestMessages = (messages) => {
    const latestMessages = messages.slice(-3); // Get the last three messages

    console.log(latestMessages);

    return latestMessages.map((message) => {
            <Message 
              text={message.text}
              userId={message.user}
              timestamp={new Date(message.timestamp).toDateString()}
              isHighlighted={false}
            />
    });      
    
  };

  const navigateToChannel = (channelId) => {
    // Implement your navigation logic here
    console.log(`Navigating to channel with id: ${channelId}`);
  };

  return (
    <DashboardContainer>
      <h1>My Channels</h1>
      {isLoading ? (
        <Loader>
          <PropagateLoader color="#84468D" />
        </Loader>
      ) : (
        <>
            <ChannelGrid>
                {channels.map((channel) => (
                  <ChannelItem key={channel._id}>
                        {channel.picture ? (
                              <ChannelImage>
                                <img src={channel.picture} alt={channel.name}/>
                              </ChannelImage>
                            ):(
                              <ChannelImage>
                                <GiAbstract047 size={115} color="#84468D" />
                              </ChannelImage>
                              
                            )
                        }
                      <ChannelDetails>
                        <h3>#{channel.name}</h3>
                        <NavLink 
                              key={channel.id} 
                              to={`/dashboard/channels/${channel.id}`}
                        >
                            <NavigateButton>
                              Go to Channel
                            </NavigateButton>
                        </NavLink>
                        
                      </ChannelDetails>
                  </ChannelItem>
                ))}
             </ChannelGrid>

        <h1>Latest Activity</h1>
        </>
        
      )}
    </DashboardContainer>
  );
};

export default Dashboard;

const DashboardContainer = styled.div`
  padding: 50px;
  height: 100vh;
  overflow-y: auto;
`;

const ChannelGrid = styled.div`
  margin-top: 35px;
  margin-bottom: 35px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const ChannelItem = styled.div`
  background-color: #EED2EB;
  border: 2px solid #84468D;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: row;

  @media (max-width: 1100px) {
    width: 100%;
  }

`;

const ChannelImage = styled.div`
  padding: 20px;
  width: 45%;

  > img {
    margin-top: 10px;
    object-fit: cover;
    height: 100px;
    width: 100px;
    border: 1px solid black;
    border-radius: 8px;
  }

`;

const ChannelDetails = styled.div`
  margin-top: 13px;
  padding: 5px;
  text-align: center;
  width: 55%;

  h3 {
    margin-bottom: 40px;
  }
`;

const NavigateButton = styled.button`
  background-color: #84468D;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
    transform: scale(1.03);
  }
`;

const Loader = styled.div`
    width: 100%;
    min-height: 500px;
    display: flex;
    justify-content: center; 
    align-items: center;   

`;