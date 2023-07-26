import React from 'react';
import styled from "styled-components";
import Header from './Header';

const Home = () => {
  return (
    <Container>
      <Header></Header>
      <Image src='/bground.png' alt='main_bg' />
      <Content>
        <Title>청춘들의 면접 플랫폼</Title>
        <Title2>밀어:뷰</Title2>
        <ImageWrapper>
        <img src={process.env.PUBLIC_URL + '/mirlogo3.png'} alt="main_bg2" />
        </ImageWrapper>
      </Content>
      <Content2>
        <Title3>
          밀어뷰'S BENEFIT
        </Title3>
        <ImageWrapper2>
        <img src={process.env.PUBLIC_URL + '/star.png'} />
        </ImageWrapper2>
      </Content2>
      <Content3>
        <ImageWrapper3>
        <img src={process.env.PUBLIC_URL + '/동글.png'} />
        </ImageWrapper3>
        <Title4>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 몇번의 Click만으로 진행되는 온라인 면스 ! 
          <br></br>
          <br></br>
          <br></br>
         시간 제약 없이 가능한 온라인 면스 ! <br></br> 
          <br></br>
          <br></br>
          &nbsp; &nbsp; &nbsp; &nbsp; 나만의 피드백 아카이브로 성장 가능성 Up ↗
        </Title4>
      </Content3>

    </Container>
  );
};


const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border : none;
`;

const Image = styled.img`
  width: 100%;
  height: 210vh;
  object-fit: cover;
`;

const Content = styled.div`
  position: absolute;
  top: 30%;
  left: 25%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index:2;
`;

const Content2 = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index:2;
`;

const Content3 = styled.div`
  position: absolute;
  top: 93%;
  left: 40%;
  transform: translate(-60%, -100%);
  text-align: justify;
  z-index:2;
  display: inline-block;
  white-space: nowrap;
`;

const Title = styled.h2`
  color: #033495;
  font-size: 64px;
  font-family : "DAE";
`;

const Title2 = styled.h2`
  color: #6A9CFD  ;
  font-size: 64px;
  font-family : DAE;
`;

const Title3 = styled.h2`
  color: #6A9CFD  ;
  font-size: 64px;
  font-family : DAE;
`;

const Title4 = styled.h2`
  color: #F9D723;
  font-size: 40px;
  font-family : DAE;
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 70%;
  transform: translate(700%, -130%);
  z-index: 1; 
  width : 100px;
  height : 300px;
`;

const ImageWrapper2 = styled.div`
  position: absolute;
  top: 210%;
  right: 125%;
  transform: translate(700%, -130%);
  z-index: 1; 
  width : 100px;
  height : 300px;
`;

const ImageWrapper3 = styled.div`
  position: absolute;
  top: 110%;
  right: 67%;
  transform: translate(700%, -130%);
  z-index: 1; 
  width : 100px;
  height : 300px;
`;

export default Home;