import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi"; // Import the search icon
import { CiMinimize1 } from "react-icons/ci";

const SearchMessage = ({
  users,
  channelMessages,
  channelName,
  chatRef,
  setHighlightedMessage,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [channelUsers, setChannelUsers] = useState({});
  const [isFocused, setIsFocused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    let usersMap = {};

    for (let user of users) {
      usersMap[user.id] = `${user.firstName} ${user.lastName}`;
    }
    setChannelUsers(usersMap);
  }, []);

  const handleSelectResult = (result) => {
    if (chatRef.current) {
      const messageElement = chatRef.current.querySelector(
        `[message-id="${result._id}"]`
      );

      if (messageElement) {
        messageElement.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }

      setHighlightedMessage(result._id);
      // Clear the highlight after 5 seconds
      setTimeout(() => {
        setHighlightedMessage(null);
      }, 10000);
    }
    // Clear search results after selecting a result
    setSearchQuery("");
    setFilteredMessages([]);
  };

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);

    // Assuming you have a list of all messages in the variable 'allMessages'
    if (newQuery.length > 0) {
      const filteredResults = channelMessages.filter((message) =>
        message.text.toLowerCase().includes(newQuery.toLowerCase())
      );

      setFilteredMessages(filteredResults);
    } else {
      setFilteredMessages([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Assuming you have a list of all messages in the variable 'allMessages'
    if (searchQuery.length > 0) {
      const filteredResults = channelMessages.filter((message) =>
        message.text.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredMessages(filteredResults);
    } else {
      setFilteredMessages([]);
    }
  };

  return (
    <>
      <SearchBar onSubmit={(e) => handleSearch(e)}>
        {isExpanded && (
          <SearchInput
            type="text"
            placeholder={`Search in #${channelName}`}
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        )}

        <SearchButton onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <CiMinimize1 size={26} /> : <FiSearch size={26} />}
        </SearchButton>
      </SearchBar>

      {isFocused && (
        <ResultsBox
          style={{
            opacity: !(filteredMessages.length > 0) ? "0" : "1",
            transition: "all .s",
            visibility: !(filteredMessages.length > 0) ? "hidden" : "visible",
          }}
        >
          {filteredMessages.map((result) => (
            <ResultItem
              key={result._id}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelectResult(result);
              }}
            >
              <UserInfo>
                <strong>
                  @
                  {result.user in channelUsers ? (
                    channelUsers[result.user]
                  ) : (
                    <i>User Deleted</i>
                  )}
                </strong>
                <p>{result.text}</p>
              </UserInfo>

              <span style={{ float: "right" }}>
                {new Date(result.timestamp).toDateString()}
              </span>
            </ResultItem>
          ))}
        </ResultsBox>
      )}
    </>
  );
};

export default SearchMessage;

const SearchBar = styled.form`
  display: flex;
  align-items: center;
  margin-left: auto; // Push the search bar to the right
  width: 100%; // Make the search bar take the full width of the container
  margin-bottom: 15px;
  gap: 10px;
  padding-right: 10px;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #84468d;
  border-radius: 4px;
  outline: none;
  background-color: transparent;
  color: #84468d;
  transition: border-color 0.3s ease;
  transition: background-color 0.4s ease;

  &:focus {
    border-color: #84468d; // Change border color on focus
    background-color: #fff;
    color: black;
  }
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #84468d;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #763d7a;
  }
`;

const ResultsBox = styled.div`
  position: relative;
  top: -15px;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 4px;
  z-index: 1;
`;

const ResultItem = styled.div`
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: #f0f0f0;
  }

  > span {
    float: right;
    color: gray;
    font-weight: 300;
    margin-left: 4px;
    font-size: 12px;
  }
`;

const UserInfo = styled.div`
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  > p {
    margin-left: 9px;
    padding-left: 9px;
    display: inline-block;
    border-left: 0.5px solid lightgray;
  }
`;
