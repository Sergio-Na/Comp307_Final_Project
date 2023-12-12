import React from 'react'
import styled from 'styled-components'
import axiosInstance from '../axiosConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'

const SignUp = () => {
    
    const navigate = useNavigate()
    const location = useLocation();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        bio: '',
        profilePicture: ''
    });

    const [error, setError] = useState('');

    // Handle input change
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        setError('')
    }

    useEffect(() => {
        if (location.state?.email) {
            setFormData(prevFormData => ({ ...prevFormData, email: location.state.email }));
        }
    }, [location.state]);

    // Handle form submission
    const handleSignUp = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await axiosInstance.post('/signup', formData);
            console.log(response.data);
            navigate('/signin');
        } catch (error) {
            // Update the error state with the error message
            setError(error.response.data.error);
        }
    };
  return (
    <Container>
        <Form onSubmit={(e) => handleSignUp(e)}>
            <Img src="logo.svg" alt="" />
            <h1>Sign Up</h1>
            <Names>
                <Label htmlFor="firstName">
                    First Name: 
                    <NameInput type="text"  onChange={handleChange} name="firstName" id="firstName" />
                </Label>
                <Label htmlFor="lastName">
                    Last Name:
                    <NameInput type="text"  onChange={handleChange} name="lastName" id="lastName" />
                </Label>
            </Names>
            <Label htmlFor="email">
                Email:
                <Input type="email" name="email" id="email"  onChange={handleChange} autoComplete="true" value={formData.email}/>
            </Label>
            <Label htmlFor="password">
                Password: 
                <Input type="password"  onChange={handleChange} name="password" id="password" />
            </Label>
            <Label htmlFor="bio">
                Bio:
                <Input type="text"  onChange={handleChange} name="bio" id="bio" />
            </Label>
            <Label htmlFor="profilePicture">
                Profile Picture:
                <Input type="url" id="profilePicture" name="profilePicture" placeholder='url' onChange={handleChange} />
            </Label>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button type="submit">
                Register
            </Button>
            
        </Form>
        
    </Container>
  )
}


const Img = styled.img`
    position: absolute;
    top: 5px;
    left: 0px;
    max-width: 50px;
`

const Container = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
`;

const Form = styled.form`
    position: relative;
    padding: 2rem;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    max-width: 500px; // Max width for the form
    width: 100%;
`;

const Names = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    width: 100%;
`;

const Input = styled.input`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    width: 100%;
    box-sizing: border-box; // Ensure padding doesn't affect the width
`;

const NameInput = styled(Input)`
    // Inherits styles from Input
`;

const Button = styled.button`
    background-color: var(--main-accent-color);
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    color: black;
    transition: all 1s ease;

    &:hover{
        background-color: var(--main-bg-color);
        transform: scale(1.05);
    }

    &:active{
        color: var(--main-accent-color);
        color: white;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    text-align: center;
    font-size: 14px;
`;

export default SignUp;
