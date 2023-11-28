import React from 'react'
import styled from 'styled-components'
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

const SignUp = () => {
    
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        bio: '',
        profilePicture: ''
    });

    // Handle input change
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    // Handle form submission
    const handleSignUp = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        console.log(formData)
        try {
            const response = await axiosInstance.post('/signup', formData);
            console.log(response.data); // Handle success
            navigate('/signin')
        } catch (error) {
            console.error(error); // Handle errors
        }
    }
  return (
    <Container>
        <Form onSubmit={(e) => handleSignUp(e)}>
            <h1>Sign Up</h1>
            <Label htmlFor="firstName">
                First Name: 
                <Input type="text"  onChange={handleChange} name="firstName" id="firstName" />
            </Label>
            <Label htmlFor="lastName">
                Last Name:
                <Input type="text"  onChange={handleChange} name="lastName" id="lastName" />
            </Label>
            <Label htmlFor="email">
                Email:
                <Input type="email" name="email" id="email"  onChange={handleChange} autoComplete="true" />
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
            <Button type="submit">
                Register
            </Button>
        </Form>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 6%;

`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

`

const Label = styled.label`
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 20px;

`

const Button = styled.button`
    background-color: var(--main-bg-color);
    padding: 10px 15px;
    border-radius: 10px;
    color: white;
    transition: all 1s ease;

    &:hover{
        cursor: pointer;
        transform: scale(1.05);
    }

`

const Input = styled.input`
    width: 200px;
    padding: 5px 10px;
    border-radius: 10px;
    border: 1px solid grey;
    outline: none;

`

export default SignUp