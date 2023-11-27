import React from 'react'
import styled from 'styled-components'
import Modal from '../components/Modal'
import { useState } from 'react'

const Channels = () => {

    const [isModalOpen, setModalOpen] = useState(false);
  return (
    <Container>
        <Heading>
            <h1>Channels</h1>
            <Button onClick={() => setModalOpen(true)}>Create New</Button>
        </Heading>
        
        <p>View, Edit, Add Channels --{'>'} these are dummy channels hard coded in</p>
        <br />
        <ChannelsContainer>
            <Channel>Channel 1</Channel>
            <Channel>Channel 2</Channel>
            <Channel>Channel 3</Channel>
        </ChannelsContainer>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <ModalContent>
                <h1>Channel Creation</h1>
                <h5>Create Forms Here</h5>
                <ChannelCreationForm>
                    <Label htmlFor='ChannelName'>
                        Channel Name:
                        <Input></Input>
                    </Label>
                    <Label>
                        Something else here...
                    </Label>

                    <Button type='submit'>
                        Create
                    </Button>
                </ChannelCreationForm>
            </ModalContent>
        </Modal>
    </Container>
  )
}

const Label = styled.label`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;

`

const Input = styled.input`
    min-width: 300px;
    border: 1px solid grey;
    outline: none;
    border-radius: 10px;
    padding: 5px 10px;
`

const ModalContent = styled.div`
    width: 40vw;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 20px;

`

const ChannelCreationForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

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

export default Channels