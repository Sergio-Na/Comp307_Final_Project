import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi'; // Import the search icon



const SearchMessage = ( {channelMessages} ) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMessages, setFilteredMessages] = useState([]);

    const handleSearch = (channelMessages) => {
        if (!searchQuery) {
          setFilteredMessages([]);
          return;
        }
      
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = channelMessages.filter((message) =>
          message.text.toLowerCase().includes(lowerCaseQuery)
        );
      
        setFilteredMessages(filtered);
    }; 

    return (
        <SearchBar>
            <SearchInput
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchButton onClick={handleSearch}>
                <FiSearch size={20} />
            </SearchButton>
        </SearchBar>
    )
}


export default SearchMessage;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto; // Push the search bar to the right
  width: 100%; // Make the search bar take the full width of the container
  margin-bottom: 15px;
`;

const SearchInput = styled.input`
  flex-grow: 1; 
  padding: 4px;
  border: 1px solid #84468d; // White outline
  border-radius: 4px;
  outline: none; 
  background-color: transparent; 
  color: #84468d; // Text color
  transition: border-color 0.3s ease; 
  transition: background-color 0.4s ease; 

  &:focus {
    border-color: #84468d; // Change border color on focus
    background-color: #fff;
    color: black;
  }
`;

const SearchButton = styled.button`
  background-color: #84468d;
  color: white;
  padding: 4px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #763d7a;
  }
`;