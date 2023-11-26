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

                    <NavLink to="/dashboard">
                        <Link>
                            Dashboard *temporary*
                        </Link>
                    </NavLink>
                </Links>
            </NavSection>
            
            <NavSection>
            <NavLink to="/signup">
                        <Link>
                            Sign Up
                        </Link>
                    </NavLink>
            </NavSection>
            
		</Nav>
	);
};

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    padding: 15px 30px;

`

const NavSection = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: max-content;


`
const Links = styled.div`
    display: flex;
    background-color: var(--main-accent-color);
    border-radius: 10px;
`

const Link = styled.button`
    font-size: 14px;
    padding: 15px 30px;



    &:hover{
        background-color: #81438A;
        color: white;
        cursor: pointer;
    }

`

export default Navbar;
