import React, { useState } from "react";
import styled from "styled-components";
import axiosInstance from "../axiosConfig";
import { IoSend } from "react-icons/io5";
import decodeToken from "../decodeToken";

const ChatInput = ({
  socket,
  token,
  chatRef,
  channelID,
  channelName,
  addMessage,
}) => {
  const [input, setInput] = useState("");

  const userId = decodeToken(token).userId;

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!channelID) {
      return false;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const data = {
      text: input,
    };

    try {
      const response = await axiosInstance.post(
        `/channels/${channelID}/messages`,
        data,
        { headers: headers }
      );

      console.log(response.data);

      socket.emit("message", {
        text: input,
        user: userId,
      });
    } catch (error) {
      // Update the error state with the error message
      console.error(error);
    }

    chatRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });

    setInput("");
  };

  return (
    <InputContainer>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName}`}
        />
        <SendButton type="submit" onClick={sendMessage}>
          <IoSend size={24} color="#84468D" />
        </SendButton>
      </form>
    </InputContainer>
  );
};

export default ChatInput;

const InputContainer = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
  background-color: #eeeeee;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: relative;
    width: 100%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;

    @media (max-width: 800px) {
      width: 95%;
    }
  }
`;

const SendButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);

  &:hover {
    color: #00a8ff; // change color on hover
  }

  svg {
    color: #333; // default color of icon
  }

  @media (max-width: 800px) {
    right: 25px;
  }
`;
