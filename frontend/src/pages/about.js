import React from "react";
import styled from "styled-components";

const About = () => {
  return (
    <AboutContainer>
      <AboutHeader>Welcome to McChats</AboutHeader>
      <AboutText>
        McChats is a dynamic platform designed for seamless communication and collaboration. 
        With our intuitive live messaging system, user profiles, and organized channels, 
        staying connected and productive has never been easier. Whether you're part of a 
        small team or a large enterprise, McChats offers the tools you need to keep your 
        conversations flowing.
      </AboutText>
      <Features>
        <Feature>
          <FeatureTitle>Live Messaging</FeatureTitle>
          <FeatureDescription>
            Real-time messaging to keep your team in sync.
          </FeatureDescription>
        </Feature>
        <Feature>
          <FeatureTitle>User Profiles</FeatureTitle>
          <FeatureDescription>
            Customizable profiles to express your professional identity.
          </FeatureDescription>
        </Feature>
        <Feature>
          <FeatureTitle>Organized Channels</FeatureTitle>
          <FeatureDescription>
            Channels to keep conversations topic-focused and efficient.
          </FeatureDescription>
        </Feature>
      </Features>
    </AboutContainer>
  );
};

export default About;

const AboutContainer = styled.div`
  color: black;
  padding: 50px;
  text-align: center;
`;

const AboutHeader = styled.h1`
  color: var(--main-bg-color);
  margin-bottom: 30px;
`;

const AboutText = styled.p`
  font-size: 18px;
  margin-bottom: 40px;
`;

const Features = styled.div`
  display: flex;
  justify-content: space-around;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Feature = styled.div`
  flex-basis: 30%;
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const FeatureTitle = styled.h2`
  color: var(--main-bg-color);
  margin-bottom: 15px;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
`;

