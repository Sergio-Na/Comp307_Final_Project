import React from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Home from "../pages";
import About from "../pages/about";
import styled from 'styled-components';
import Dashboard from "../pages/dashboard";
import Signup from '../pages/signup'

const Main = () => {
    const location = useLocation();
    const isDashboard = location.pathname === '/dashboard';

    return (
        <MainContent>
            {isDashboard && <Sidebar />}
            <Content>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/signup" element={<Signup />} />
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
    border-radius: 10px;
    margin: 5px;
    & > * {
        color: black;
    }
`;

export default Main;
