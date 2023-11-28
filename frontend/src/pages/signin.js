import React from 'react'
import styled from 'styled-components'
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

const SignIn = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Handle input change
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    // Handle form submission
    const handleSignIn = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        console.log(formData)
        try {
            const response = await axiosInstance.post('/login', formData);
            console.log(response.data); // Handle success
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard')
        } catch (error) {
            console.error(error); // Handle errors
        }
    }
  return (
    <Container>
        <Form onSubmit={(e) => handleSignIn(e)}>
            <h1>Sign In</h1>
            <Label htmlFor="email">
                Email:
                <Input type="email" name="email" id="email"  onChange={handleChange} autoComplete="true" />
            </Label>
            <Label htmlFor="password">
                Password: 
                <Input type="password"  onChange={handleChange} name="password" id="password" />
            </Label>
            <Button type="submit">
                Sign In
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

export default SignIn