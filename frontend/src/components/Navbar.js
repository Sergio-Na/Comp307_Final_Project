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
                        <Button>
                            Home
                        </Button>
                    </NavLink>
                
                
                    <NavLink to="/about">
                        <Button>
                            About
                        </Button>
                    </NavLink>

                    <NavLink to="/dashboard">
                        <Button>
                            Dashboard *temporary*
                        </Button>
                    </NavLink>
                </Links>
            </NavSection>
            
            <NavSection>
                <NavLink to="/signup">
                    <Button>
                        Sign Up
                    </Button>
                </NavLink>
                <NavLink to="/signin">
                    <Button>
                        Sign In
                    </Button>
                </NavLink>
            </NavSection>
            
            
		</Nav>
	);
};


const Button = styled.button`
    background-color: var(--main-accent-color);
    padding: 15px 30px;
    border-radius: 10px;

    margin:5px;
    
    &:hover{
        background-color: var(--main-bg-color);
        color: white;
        cursor: pointer;
    }

`
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

export default Navbar;
