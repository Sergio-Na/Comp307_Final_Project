// Filename - "./components/Navbar.js

import React from "react";
import { NavLink } from "react-router-dom";
import styled from 'styled-components'


const Navbar = () => {
	return (
		<Nav>
            <NavSection>
                Logo
            </NavSection>
            <NavSection>
                <Links>
                    <NavLink to="/">
                        <Link>
                            Home
                        </Link>
                    </NavLink>
                
                
                    <NavLink to="/about">
                        <Link>
                            About
                        </Link>
                    </NavLink>
                </Links>
            </NavSection>
            
            <NavSection>
                Login
            </NavSection>
            
		</Nav>
	);
};

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    padding: 15px 30px;
    background-color: #b9b9b9;

`

const NavSection = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: max-content;


`
const Links = styled.div`
    display: flex;
    background-color: #d7d7d7;
    border-radius: 10px;
`

const Link = styled.button`
    font-size: 14px;
    padding: 15px 30px;
    border-radius: 10px;



    &:hover{
        background-color: grey;
        color: white;
        cursor: pointer;
    }

`

export default Navbar;
