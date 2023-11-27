import React from 'react'
import styled from 'styled-components'

const Dms = () => {
    return (
      <Container>
          <Heading>
              <h1>Direct Messages</h1>
              <Button>Create New</Button>
          </Heading>

          <p>Button will enter dm creation page kinda like imessage or instagram dm</p>

          <br />

          <p>Search bar for user to message, blank space, textbox to write message</p>

          <p>Can add functionality for file and image sending but will need storage to achieve</p>
          
          <p>View, Enter, Delete Dms --{'>'} these are dummy dms hard coded in</p>
          <br />
          <ChannelsContainer>
            <p>On click of one of these, navigate to dms/dm_id, below here turns into convo, nav buttons appear to get back here</p>
              <Channel>Dave</Channel>
              <Channel>Paul</Channel>
              <Channel>Charles</Channel>
          </ChannelsContainer>
      </Container>
    )
}

const Container = styled.div`
    padding: 10px;
    width: 50%;

`

const Channel = styled.div`
    padding: 10px 20px;
    background-color: var(--main-accent-color);
    font-weight: bold;
    border-radius: 10px;


`

const ChannelsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

`

const Heading = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
`

const Button = styled.button`
    background-color: var(--main-accent-color);
    padding: 15px;
    border-radius: 10px;
    transition: all 1s ease;
    width: max-content;

    &:hover{
        background-color: var(--main-bg-color);
        cursor: pointer;
        transform: scale(1.05)
    }

`

export default Dms