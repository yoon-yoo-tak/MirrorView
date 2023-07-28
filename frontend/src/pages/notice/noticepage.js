import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Noticepage = () => {
  // 가상 데이터를 사용하여 게시글 정보를 설정합니다.
  const post = {
    id: 1,
    title: "밀어뷰 23.07.27 공지사항",
    author: "GM너구리",
    date: "2023-05-03",
    content: "게시글 내용이 여기에 들어갑니다. \n공지사항임 테스트 123 \n 테스트 123",
  };

  return (
    <Container>
      <Image src="/bground.png" alt="main_bg" />
      <Noticebox>
        {/* 게시글 상세 정보를 보여주는 부분 */}
        <Title>{post.title}</Title>
        <InfoWrapper>
          <Info>
            <Author>{post.author}</Author>
            <Divider>|</Divider>
            <Date>{post.date}</Date>
          </Info>
          <InfoLine />
        </InfoWrapper>
        <Content>{post.content}</Content>
        <ContentLine />
        <ButtonWrapper>
          <Link to="/notice">
            <Button>목록</Button>
          </Link>
        </ButtonWrapper>
      </Noticebox>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
`;

const Image = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
  margin: 0;
  padding: 0;
`;

const Noticebox = styled.div`
  position: absolute;
  top: 10%;
  left: 7.5%;
  width: 85%;
  height: 80vh;
  border: 0px solid gray;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1.5rem;
  margin-left: 1rem;
`;

const InfoWrapper = styled.div`
  margin-bottom: 40px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: black;
  margin-bottom: 1rem;
`;

const Author = styled.span`
  margin-right: 0.5rem;
  margin-left: 1rem;
`;

const Divider = styled.span`
  margin: 0 0.5rem;
  color: #ccc;
`;

const Date = styled.span`
  margin-left: 0.5rem;
`;

const InfoLine = styled.div`
  height: 1px;
  background-color: #ccc;
`;

const Content = styled.p`
  font-size: 20px;
  line-height: 1.6;
  margin-top: 1rem;
  margin-left: 1rem;
  white-space: pre-line; 
`;

const ContentLine = styled.div`
  height: 1px;
  background-color: #ccc;
  margin-top: 1rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #1890ff;
  color: #fff;
  border: none;
  border-radius: 7px;
  cursor: pointer;


  &:hover {
    background-color: #40a9ff;
  }
`;


export default Noticepage;
