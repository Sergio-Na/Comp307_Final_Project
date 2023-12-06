import React from "react";
import { useLocation, Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Home from "../pages";
import About from "../pages/about";
import styled from "styled-components";
import Dashboard from "../pages/dashboard";
import SignUp from "../pages/signup.js";
import SignIn from "../pages/signin.js";
import Channels from "../pages/channels.js";
import Channel from "../pages/channel.js";
import ProtectedRoute from "./ProtectedRoute.js";
import Profile from "../pages/profile.js";
import { useEffect } from "react";
import isTokenExpired from "../isTokenExpired.js";
import decodeToken from "../decodeToken.js";

const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard =
    location.pathname.includes("/dashboard") ||
    location.pathname === "/profile";

  return (
    <MainContent>
      {isDashboard && <Sidebar />}
      <Content $isDashboard={isDashboard}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/channels"
            element={
              <ProtectedRoute>
                <Channels />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/channels/:id"
            element={
              <ProtectedRoute>
                <Channel />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Content>
    </MainContent>
  );
};

const MainContent = styled.div`
  display: flex;
  flex: 1;
`;

const Content = styled.div`
  flex: 1;
  padding: 10px 30px;
  background-color: white;
  border-radius: ${(props) => (props.$isDashboard ? "10px" : "0px")};
  margin: ${(props) => (props.$isDashboard ? "0px 5px 5px -10px" : "0px")};
  & > * {
    color: black;
  }
  background-color: #eeeeee;
`;

export default Main;
