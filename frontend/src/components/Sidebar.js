import React from 'react'
import styled from 'styled-components'
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import decodeToken from '../decodeToken';





const Sidebar = () => {
    const location = useLocation();
    const pathName = location.pathname;

    const token = window.localStorage.getItem('token')
    const userId = decodeToken(token).userId

    const [channels, setChannels] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
          axiosInstance.get(`/users/${userId}`, config)
            .then(response => {
                if (Array.isArray(response.data.channels)) {
                setChannels(response.data.channels);
                } else {
                setChannels([]); // or handle the error accordingly
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user profile', error);
                setLoading(false);
            });
    }, [])


    const isProfile = location.pathname === '/profile'

    const [isCollapsed, setIsCollapsed] = useState(false);

    const isActive = (itemName) => pathName.includes(itemName);

  return (
    <Container $iscollapsed={isCollapsed}>

        {/* Dummy data for now */}
        <ChannelsContainer>
            {
                loading 
                ?

                <>
                    Loading
                </>
                :

                <Channels $isprofile={isProfile}>
                    {channels.map((channel) => (
                        <NavLink key={channel.id} to={`/dashboard/${channel.id}`}>
                            <ChannelIcon>{channel.name}</ChannelIcon>
                        </NavLink>
                        ))}
                    {/* <NavLink to="/dashboard/channel1"><ChannelIcon>1</ChannelIcon></NavLink>
                    <NavLink to="/dashboard/channel2"><ChannelIcon>2</ChannelIcon></NavLink>
                    <NavLink to="/dashboard/channel3"><ChannelIcon>3</ChannelIcon></NavLink>
                    <NavLink to="/dashboard/channel4"><ChannelIcon>4</ChannelIcon></NavLink> */}
                </Channels>
            }
            
            <BottomSidebar>
                <ChannelIcon>
                    +
                </ChannelIcon>
                <NavLink to='/profile'>
                    <ChannelIcon> 
                        {/* Profile */}
                        P
                    </ChannelIcon>
                </NavLink>
            </BottomSidebar>
        </ChannelsContainer>
        {!location.pathname.includes('/profile')
            &&
            <SubChannels>
                <SubChannelItem><div>#</div><div>General</div></SubChannelItem>
                <SubChannelItem><div>#</div><div>Homework</div></SubChannelItem>
                <SubChannelItem><div>#</div><div>Midterm</div></SubChannelItem>
                <SubChannelItem><div>#</div><div>Final</div></SubChannelItem>
                <SubChannelItem><div>#</div><div>Q&A</div></SubChannelItem>
            </SubChannels>

        }

        
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    /* gap: 20px; */
`

const SubChannels = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    background-color: var(--main-accent-color);
    margin: 0px 0px 5px 0px;
    border-radius: 10px 0px 0px 10px;
    padding: 20px 0px;
    padding-left: 10px;

`

const SubChannelItem = styled.div`
    display: flex;
    gap: 10px;
    min-width: 200px;
    color: black;
    padding: 5px 15px;
    border-radius: 10px;
    background-color: #ffffff47;
    margin-right: 20px;
    transition: all 1s ease;

    &:hover{
        cursor: pointer;
        transform: scale(1.05);
        font-weight: bold;
    }

`
const BottomSidebar = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-right: 30px;

`

const Channels = styled.div`
    display: flex;
    flex-direction: column;
    padding-right: ${props => props.$isprofile ? '30px': '0'};;
    gap: 20px;

`

const ChannelsContainer = styled.div`
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20px;
    padding-bottom: 20px;

`

const ChannelIcon = styled.button`
    background-color: var(--main-accent-color);
    padding: 20px 30px;
    width: min-content;
    border-radius: 20px;
    transition: transform 0.5s ease;

    &:hover{
        cursor: pointer;
        transform: scale(1.1)
    }

`

export default Sidebar