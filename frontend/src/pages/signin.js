import React from 'react'
import styled from 'styled-components'
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import Modal from '../components/Modal'

const SignIn = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [resetEmail, setResetEmail] = useState({
        resetEmail: ''
    })

    const [resetPwModal, setResetPwModal] = useState(false)

    const [loginError, setLoginError] = useState(null);


    // Handle input change
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleResetEmailChange = (e) => {
        setResetEmail({...resetEmail, [e.target.name]: e.target.value})
    }

    const handleSignIn = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
    
        try {
            const response = await axiosInstance.post('/login', formData);
            console.log(response.data); // Handle success
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
            setLoginError(null); // Reset error state on successful login
        } catch (error) {
            setLoginError(error.response.data.message); // Set error message from response
            console.error(error); // Handle errors
        }
    }
    

    const resetPwClick = () => {
        setResetPwModal(true);
    }

    const handleResetPassword = async (e) => {

        e.preventDefault()
        console.log(resetEmail)
        try {
            const response = await axiosInstance.post('/forgot-password', {
                email: resetEmail.resetEmail
            });
            alert(response.data.message)
        } catch (error) {
            console.error(error); // Handle errors
        }
    }

  return (
    <Container>
        <FormContainer>
            <Form onSubmit={(e) => handleSignIn(e)}>
                <FormHeader>
                    <Img src='logo.svg' alt="McHub" />
                    <h1>Sign In</h1>
                </FormHeader>
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
            <A onClick={() => {resetPwClick()}}>Forgot password?</A> 
            {loginError && <ErrorMessage>{loginError}</ErrorMessage>}

            {resetPwModal &&
                    <Modal isOpen={resetPwModal} onClose={() => setResetPwModal(false)}>
                        <h2>Reset Password</h2>
                        <Form>
                            <Label>
                                    Email:
                                <Input type="email" name="resetEmail" id="resetEmail" onChange={handleResetEmailChange} autoComplete='true' />
                            </Label>
                            <Button onClick={(e) => {handleResetPassword(e)}}>
                                Reset 🚀
                            </Button>
                        </Form>
                </Modal>    
            }
        </FormContainer>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
`;

const FormContainer = styled.div`
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    max-width: 500px;
    width: 100%;
`;

const FormHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Img = styled.img`
    max-width: 50px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
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
    box-sizing: border-box;
`;

const Button = styled.button`
    background-color: var(--main-accent-color);
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: var(--main-bg-color);
        color: white;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    text-align: center;
    font-size: 14px;
`;

const A = styled.a`
    text-decoration: underline;
    color: var(--main-bg-color);

    &:hover {
        color: var(--main-accent-color);
        cursor: pointer;
    }

    &:active {
        color: var(--main-bg-color);
    }
`;

export default SignIn;
