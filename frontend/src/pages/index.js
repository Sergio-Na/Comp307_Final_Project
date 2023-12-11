import React, {useState} from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';



const Home = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
      event.preventDefault();
      navigate('/signup', { state: { email: email } });
  };
  // Landing Page
  return (
    <Container>
      <Hero>
        <TextSection>
          <Heading>McChats is where discussion happens</Heading>
          <SubHeading>
            A Dedicated Platform for Students, TAs, and Professors to
            Collaborate and Communicate{" "}
          </SubHeading>
          <CTA>
            <Form onSubmit={handleSubmit}>
            <Label htmlFor="email">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit">GET STARTED</Button>
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

const Img = styled.img`
  // Correct the typo from styled.im to styled.img
  width: 100%; // Adjust the width to be responsive
  height: auto; // Maintain aspect ratio
  max-width: 1000px; // Adjust to match the Hero section width
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  width: 100%;
  padding: 10vh 0px;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 30px;
  }
`;


const Hero = styled.section`
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ImageSection = styled.section`
  flex: 1;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;


const Heading = styled.h1`
  font-size: 55px;
  line-height: 45px;
  padding-bottom: 5px;
  @media (max-width: 768px) {
    font-size: 40px;
    line-height: 35px;
  }
`;

const SubHeading = styled.h3`
  font-size: 20px;
  letter-spacing: 1.5px;
  line-height: 20px;
  padding-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const CTA = styled.div`
  width: 100%;
`;

const Form = styled.form``;

const Label = styled.label`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const Input = styled.input`
  flex: 2;
  padding: 10px 10px;
  border-radius: 5px;
  border: 1px solid black;
  font-size: 16px;
  @media (max-width: 768px) {
    flex: 1;
  }
`;

const Button = styled.button`
  flex: 1;
  background-color: var(--main-bg-color);
  color: white;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  @media (max-width: 768px) {
    flex-basis: 100%;
  }
`;


export default Home;
