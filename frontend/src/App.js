
import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import styled from 'styled-components'


function App() {
  return (
      <Router>
          <AppContainer>
              <Navbar />
              <MainContent>
                  <Sidebar />
                  <Content>
                      <Routes>
                          <Route exact path="/" element={<Home />} />
                          <Route path="/about" element={<About />} />
                      </Routes>
                  </Content>
              </MainContent>
          </AppContainer>
      </Router>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const MainContent = styled.div`
  display: flex;
  flex: 1; 
`

const Content = styled.div`
  flex: 1;  
  padding: 10px 30px;
`


export default App;
