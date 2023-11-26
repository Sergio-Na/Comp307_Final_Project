
import React from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import {
	BrowserRouter as Router,
} from "react-router-dom";
import styled from 'styled-components'


function App() {
  return (
      <Router>
          <AppContainer>
              <Navbar />
              <Main /> 
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
