import React from "react";
import { NavLink } from "react-router-dom";
import styled from 'styled-components'
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";





const Navbar = ({toggleSidebar}) => {

    const navigate = useNavigate()

    const location = useLocation();
    const pathName = location.pathname
    const isDashboardOrProfile = pathName.includes('/dashboard') || pathName.includes('/profile')

    const loggedIn = window.localStorage.getItem('token')

    const handleSignOut = () => {
        window.localStorage.removeItem('token')
        navigate('/signin')
    }
	return (
		<Nav>
            <NavSection>
                <StyledNavLink to="/" >
                    <Img  src="/logo.svg" />
                </StyledNavLink>
            </NavSection>
            <NavSection>
                
                {isDashboardOrProfile &&
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
                <NavSection className="right">
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
                <>
                <NavSection className="right">
                    <Button onClick={() => handleSignOut()}>
                        Sign out
                    </Button>
                    <NavLink to="/dashboard">
                            <Button>
                                Dashboard
                            </Button>
                    </NavLink>
                    
                </NavSection>
                <BurgerMenu>
                    <CiMenuBurger size={26} onClick={toggleSidebar}/>
                </BurgerMenu>
                </>

        }
            
            
            
		</Nav>
	);
};

const BurgerMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    @media (min-width: 501px) {
        display: none;
    }
    
`

const StyledNavLink = styled(NavLink)`
    display: flex;
    align-items: center;
`;

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

    @media (min-width: 501px) {
        &.right {
            /* Apply the same styles as the main NavSection for larger screens */
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            width: max-content;
        }
    }

    @media (max-width: 500px) {
        &.right {
            display: none;
        }
    }
`



const Links = styled.div`
    display: flex;
    background-color: var(--main-accent-color);
    border-radius: 10px;
`

export default Navbar;
