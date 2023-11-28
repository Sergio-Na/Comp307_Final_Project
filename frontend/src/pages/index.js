import React from "react";
import styled from "styled-components";
 
const Home = () => {
    // Landing Page
    return (
        <Container>
            <Hero>
                <TextSection>
                    <Heading>
                        Slack is where work happens
                    </Heading>
                    <SubHeading>
                        Slack is a collaboration hub, where the right people and the right information come together, helping everyone get work done.
                    </SubHeading>
                    <CTA>
                        <Form>
                            <Label htmlFor='email'>
                                <Input type="email" placeholder="Email address" />
                                <Button>
                                    GET STARTED
                                </Button>
                            </Label>
                        </Form>
                    </CTA>
                </TextSection>
            </Hero>
            <ImageSection>
                <Img src="landingPage.png" alt="" />
            </ImageSection>
        </Container>
    );
};

const Img = styled.img` // Correct the typo from styled.im to styled.img
    width: 100%; // Adjust the width to be responsive
    height: auto; // Maintain aspect ratio
    max-width: 1000px; // Adjust to match the Hero section width
`;

const TextSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 600px;
`
    


const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
    width: 100%;
    justify-content: center;
    align-items: stretch; // Align items in a way that they stretch to fill the container
    padding: 10vh 0px;
`;


const Hero = styled.section`
    flex: 1; // Make sure it takes up equal space
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
`;

const ImageSection = styled.section`
    flex: 1; // Make sure it takes up equal space
    display: flex; // Add display flex
    align-items: center; // Center the content vertically
`;

const Heading = styled.h1`
    font-size: 55px;
    line-height: 45px;
    padding-bottom: 5px;

`

const SubHeading = styled.h3`
    font-size: 20px;
    letter-spacing: 1.5px;
    line-height: 20px;
    padding-bottom: 10px;

`
const CTA = styled.div`
    
    width: 100%;
`

const Form = styled.form`
`

const Label = styled.label`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
`

const Input = styled.input`
    flex: 2;
    padding: 10px 10px;
    border-radius: 5px;
    border: 1px solid black;
    font-size: 16px;
`

const Button = styled.button`
    flex: 1;
    background-color: var(--main-bg-color);
    color: white;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
`
 
export default Home;