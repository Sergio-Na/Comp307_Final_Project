import React from 'react'
import styled from 'styled-components'

const Signup = () => {
  return (
    <Container>
        <Form>
            <h1>Sign Up</h1>
            <Label htmlFor="firstname">
                First Name: 
                <Input type="text" />
            </Label>
            <Label htmlFor="lastname">
                Last Name:
                <Input type="text" />
            </Label>
            <Label htmlFor="email">
                Email:
                <Input type="email" name="" id="" />
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

export default Signup