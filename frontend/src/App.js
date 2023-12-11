
import React from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
	BrowserRouter as Router,
} from "react-router-dom";
import styled from 'styled-components'
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:5000');


function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  
  return (
      <Router>
          <AppContainer>
              <Navbar toggleSidebar={toggleSidebar} />
              <Main socket={socket} isSidebarVisible={isSidebarVisible} setIsSidebarVisible={setIsSidebarVisible} /> 
          </AppContainer>
      </Router>
  );
}


const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`


export default App;
