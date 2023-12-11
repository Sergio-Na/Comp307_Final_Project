import React from 'react'
import { useEffect } from 'react'
import axiosInstance from '../axiosConfig'
import styled from 'styled-components'
import { useState } from 'react'
import decodeToken from '../decodeToken'
import { PacmanLoader } from 'react-spinners'
import Modal from '../components/Modal'
import AlertMessage from '../components/AlertMessage'

const Profile = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState({})
  const [channels, setChannels] = useState([])
  const [imgError, setImgError] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editProfile, setEditProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
});
const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);


const handleEditSubmit = async (e) => {
  e.preventDefault();

  const token = window.localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  try {
    const response = await axiosInstance.put("/update-profile", editProfile, config);
    // Update profile state with new data
    setProfile(response.data.user);

    // Close modal and reset any error states if needed
    setSuccessMessage('Profile Edited successfully!');
    setErrorMessage(''); // Clear any previous error messages
    setIsEditModalOpen(false);
    setImgError(false);

    // You can also add a success message or toast notification here
    console.log('Profile updated successfully');
  } catch (error) {
    setErrorMessage('Error editing profile: ' + (error.response ? error.response.data : error.message));
    setSuccessMessage('');
    console.error('Error updating profile:', error);
    // Handle error state here, like showing error messages or notifications
  }
};



const handleChange = (e) => {
  const { name, value } = e.target;
  setEditProfile(prevState => ({
      ...prevState,
      [name]: value,
  }));
};


useEffect(() => {
  const token = window.localStorage.getItem('token');
  const decodedToken = decodeToken(token);
  const userId = decodedToken.userId;

  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };

  axiosInstance.get(`/users/${userId}`, config)
      .then(response => {
          setProfile(response.data.user);
          return axiosInstance.get(`/user-channels/${userId}`, config);
      })
      .then(channelsRes => {
          setChannels(channelsRes.data.channels);
      })
      .catch(error => {
          console.error('Error fetching data', error);
      })
      .finally(() => {
          setLoading(false);
      });

}, []); // Empty dependency array to run only on mount

const handleDeleteAccount = async () => {
  const token = window.localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  try {
    await axiosInstance.delete("/delete-account", config);
    window.localStorage.removeItem('token'); // Remove token from local storage
    setSuccessMessage("Your account has been deleted successfully.");
    // Redirect user to login or home page
    window.location.href = '/signin'; // Adjust as necessary
  } catch (error) {
    setErrorMessage("Failed to delete account. Please try again.");
  }
};


useEffect(() => {
  if (profile) {
      setEditProfile({
          firstName: profile.firstName || '',
          lastName: profile.lastName || '',
          email: profile.email || '',
          bio: profile.bio || '',
          profilePicture: profile.profilePicture || '',
      });
  }
}, [profile]); // Run this effect when profile changes


  return (
    <Container>
        <AlertMessage message={successMessage} type="success" clearMessage={setSuccessMessage} />
        <AlertMessage message={errorMessage} type="error" clearMessage={setErrorMessage} />
      {loading ? 
        <Screen>
          <PacmanLoader color="#84468D" />
        </Screen>
        :
        <>
          <ProfileContainer>
            <EditButton onClick={() => setIsEditModalOpen(true)}>
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
            <DeleteAccountButton onClick={() => setShowDeleteAccountModal(true)}>
              Delete Account
            </DeleteAccountButton>
          </ProfileContainer>
          <Modal isOpen={showDeleteAccountModal} onClose={() => setShowDeleteAccountModal(false)}>
            <ModalContent>
              <p>Are you sure you want to delete your account? This action cannot be undone.</p>
              <ButtonGroup>
                <ConfirmButton onClick={handleDeleteAccount}>Yes, Delete</ConfirmButton>
                <CancelButton onClick={() => setShowDeleteAccountModal(false)}>Cancel</CancelButton>
              </ButtonGroup>
            </ModalContent>
          </Modal>
          <ChannelsContainer>
            {channels.map((channel) => (
              <ChannelItem key={channel.id}>{channel.name}</ChannelItem>
            ))}
          </ChannelsContainer>
        </>
    }
    <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
      <EditForm onSubmit={handleEditSubmit}>
          <FormLabel htmlFor="firstName">First Name
          <FormInput 
              id="firstName"
              type="text" 
              name="firstName"
              value={editProfile.firstName} 
              onChange={handleChange}
          />
          </FormLabel>

          <FormLabel htmlFor="lastName">Last Name
          <FormInput 
              id="lastName"
              type="text" 
              name="lastName"
              value={editProfile.lastName} 
              onChange={handleChange}
          />
          </FormLabel>

          <FormLabel htmlFor="email">Email
          <FormInput 
              id="email"
              type="email" 
              name="email"
              value={editProfile.email} 
              onChange={handleChange}
          />
          </FormLabel>

          <FormLabel htmlFor="profilePicture">Picture
          <FormInput 
              id="profilePicture"
              type="profilePicture" 
              name="profilePicture"
              value={editProfile.profilePicture} 
              onChange={handleChange}
          />
          </FormLabel>

          <FormLabel htmlFor="bio">Bio
          <FormTextArea 
              id="bio"
              name="bio"
              value={editProfile.bio} 
              onChange={handleChange}
          />
          </FormLabel>

          <FormButton type="submit">Save Changes</FormButton>
          <FormButton type="button" onClick={() => setIsEditModalOpen(false)}>Cancel</FormButton>
      </EditForm>
    </Modal>
    </Container>
  )
}

const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
`;

const ConfirmButton = styled.button`
    background-color: #FF6347;
    padding: 10px 20px;
    border-radius: 5px;
    color: white;

    &:hover{
        cursor: pointer;
    }
    // ... additional styles ...
`;

const CancelButton = styled.button`
    background-color: #808080; // Grey color
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
    &:hover{
        cursor: pointer;
    }
    // ... additional styles ...
`;

const ModalContent = styled.div`
    width: 40vw;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: black;

`

const DeleteAccountButton = styled.button`
  background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkred;
  }
`;


const FormLabel = styled.label`
  display: flex;
  flex-wrap: wrap;
  font-size: 1em;
  color: #333;
  margin-bottom: 5px;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  min-width: 500px;
`;

const FormInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
  color: #333;
  width: 100%;

  &:focus {
    outline: none;
    border-color: var(--main-accent-color);
    box-shadow: 0 0 3px #aaa;
  }
`;

const FormTextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
  color: #333;
  min-height: 100px;
  width: 100%;

  &:focus {
    outline: none;
    border-color: var(--main-accent-color);
    box-shadow: 0 0 3px #aaa;
  }
`;

const FormButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:first-of-type {
    background-color: var(--main-bg-color);
    color: white;

    &:hover {
      background-color: var(--main-accent-color);
    }
  }

  &:last-of-type {
    background-color: #ddd;
    color: #333;

    &:hover {
      background-color: #ccc;
    }
  }
`;




const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  font-size: 3em; 
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

  @media (max-width: 500px) {
    margin: 0;
    margin-top: 20px;
    padding: 20px;
  }
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
  min-width: 200px;
`;

const ChannelItem = styled.div`
  font-size: 1em;
  color: #444;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;

  &::before{
    content: '# '
  }
`;


export default Profile