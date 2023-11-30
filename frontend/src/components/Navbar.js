import React from "react";
import { NavLink } from "react-router-dom";
import styled from 'styled-components'
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";




const Navbar = () => {

    const navigate = useNavigate()

    const location = useLocation();
    const pathName = location.pathname
    const isDashboard= pathName.includes('/dashboard')

    const loggedIn = window.localStorage.getItem('token')

    const handleSignOut = () => {
        window.localStorage.removeItem('token')
        navigate('/signin')
    }
	return (
		<Nav>
            <NavSection>
                <NavLink to="/" 
                    style={() => ({
                        display: 'flex',
                        alignItems: 'center'   
                      })}>
                    <Img  src="logo.svg" alt="Mc"/>
                </NavLink>
            </NavSection>
            <NavSection>
                
                {isDashboard &&
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

                    </Links>
                }
                    
                
            </NavSection>
            
            {!loggedIn ? 
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
                :
                <NavSection>
                    <Button onClick={() => handleSignOut()}>
                        Sign out
                    </Button>
                    <NavLink to="/dashboard">
                            <Button>
                                Dashboard
                            </Button>
                    </NavLink>
                </NavSection>

        }
            
            
            
		</Nav>
	);
};

const Img = styled.img`
    max-width: 50px;

`


const Button = styled.button`
    background-color: var(--main-accent-color);
    padding: 10px 30px;
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
    padding: 10px 30px;

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
