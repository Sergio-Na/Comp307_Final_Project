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
  }, []);

  const getLatestMessages = (channel) => {
    const latestMessages = channel.messages.slice(-2); // Get the last three messages

    if (latestMessages.length > 0) {
        return latestMessages.map( msg => {
          const { text, user, _id, timestamp } = msg;
          return (
              <div message-id={_id}>
                  <NavLink 
                              key={channel.id} 
                              to={`/dashboard/channels/${channel.id}`}
                  >
                      <Message 
                        key={_id}
                        text={text} 
                        userId={user}
                        timestamp={new Date(timestamp).toUTCString()}
                        isHighlighted={false}
                      />          
                  </NavLink>
                  
              </div>
          )
      })      
    }
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
          {channels.length > 0 ? (
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
          {
            channels.slice(0, 3).map((channel) => (
                channel.messages.length > 0 &&
                  <RecentMessages>
                    <h4>#{channel.name}</h4>
                    <NavLink 
                              key={channel.id} 
                              to={`/dashboard/channels/${channel.id}`}
                        >
                            <NavigateButton>
                              Go to Channel
                            </NavigateButton>
                      </NavLink>
                    {getLatestMessages(channel)} 
                  </RecentMessages>
                
            )) 
          }
            </>
          ) : (
            <>
              <EmptyStateContainer>
            <EmptyStateMessage>Welcome to McChats!</EmptyStateMessage>
            <EmptyStateSubtext>
              It looks like you're not in any channels yet. Start by joining or creating a new channel to connect with others.
            </EmptyStateSubtext>
          </EmptyStateContainer>
            </>
          )}
            
        </>
        
      )}
    </DashboardContainer>
  );
};

export default Dashboard;

const EmptyStateContainer = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const EmptyStateMessage = styled.h2`
  color: #84468D;
  margin-bottom: 20px;
`;

const EmptyStateSubtext = styled.p`
  color: #666;
  margin-bottom: 30px;
`;

const CreateChannelButton = styled(NavLink)`
  background-color: #84468D;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    background-color: #9b6ab0;
    transition: background-color 0.3s ease;
  }
`;


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

const RecentMessages = styled.div`
  border: 2px solid #84468D;
  border-radius: 8px;
  margin-bottom: 40px;
  padding: 25px;

  > div {
    margin: 12px;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #EED2EB;

    &:hover {
        transform: scale(1.03);
        transition: all 0.5s;
        cursor: pointer;
        background-color: #EED2EB;
    }
  }

  > h4 {
    display: inline;
    margin-right: 40px;
  }
`;