import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axiosInstance from "../axiosConfig";
import { CgProfile } from "react-icons/cg";
import Modal from "./Modal";

const Message = ({ text, userId, timestamp, isHighlighted }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedMessageUser, setSelectedMessageUser] = useState(null);

  const handleImageError = (e) => {
    e.preventDefault();
    setImageError(true);
  };

  const handleImageClick = (user) => {
    console.log(user);
    setSelectedMessageUser(user);
    setIsProfileModalOpen(true);
  };

  const getUserInfo = async (userId) => {
    const token = window.localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setIsLoading(true); // Start loading

    axiosInstance
      .get(`/users/${userId}`, config)
      .then((response) => {
        setUser(response.data.user);
        setIsLoading(false); // Stop loading after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching user info for message display", error);
        setIsLoading(false); // Stop loading in case of error
      });
  };

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
    <MessageContainer $isHighlighted={isHighlighted}>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          {!imageError ? (
            <Img
              src={user.profilePicture}
              alt=""
              onError={handleImageError}
              onClick={() => handleImageClick(user)}
            />
          ) : (
            <CgProfile size={40} color="#84468D" />
          )}

          <MessageInfo>
            <h4>
              {`${user.firstName} ${user.lastName}`} <span>{timestamp}</span>
            </h4>
            <p>{text}</p>
          </MessageInfo>
        </>
      )}
      {isProfileModalOpen && (
        <Modal isOpen={true} onClose={() => setIsProfileModalOpen(false)}>
          <ModalContent>
            <Img src={user.profilePicture} />
            <h2>
              {user.firstName} {user.lastName}{" "}
            </h2>
            <PII>
              <h3>Email: {user.email}</h3>
              <h3>Bio: {user.bio}</h3>
            </PII>
          </ModalContent>
        </Modal>
      )}
    </MessageContainer>
  );
};

export default Message;

const PII = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

  ${(props) =>
    props.$isHighlighted &&
    `
          background-color: #ebceed;
          border: 2px solid #84468d; 
          border-radius: 8px;
    `}

  transition: background-color 0.6s ease, border 0.6s ease, border-radius 0.6s ease;
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

const Img = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;
