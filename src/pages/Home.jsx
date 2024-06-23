import React from 'react';
import styled from 'styled-components';
import Slider from '../Components/Slider';

const HomeContainer = styled.div`
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  margin-bottom: 1.5rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const Home = () => {
  const trendingSlides = Array.from({ length: 3 }, (_, i) => `/images/${i + 1}.png`).filter((_, index) => index !== 0);
  const casualSlides = [
    "/images/15.png",
    "/images/16.png",
    "/images/17.png"
  ];
  
  // const casualSlides = Array.from({ length: 3 }, (_, i) => `/images/${i + 15}.png`);
  // const runningSlides = Array.from({ length: 3 }, (_, i) => `/images/${i + 7}.png`);

  return (
    <HomeContainer>
      <Section>
        <SectionTitle>Trending Sneakers</SectionTitle>
        <Slider slides={trendingSlides} />
      </Section>
      {/* <Section>
        <SectionTitle>Casual Sneakers</SectionTitle>
        <Slider slides={casualSlides} />
      </Section> */}
     
    </HomeContainer>
  );
};

export default Home;
