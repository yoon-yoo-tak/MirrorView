import { styled } from "styled-components";

export const GrayWave = styled.div`
  width: 1450%;
  height: 7px;
  background: linear-gradient(90deg, transparent, #ccc, transparent);
`;


export const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    border: none;
    overflow: scroll;
    overflow-x: hidden;
    overflow-y: hidden;

`;

export const Image = styled.img`
    width: 100%;
    height: 300vh;
    object-fit: cover;
    display: flex;
`;

export const ImageWrapper = styled.div`
    position: absolute;
    top: 57%;
    right: 78%;
    transform: translate(700%, -130%);
    z-index: 1;
    width: 100px;
    height: 600px;
`;

export const ImageWrapper1 = styled.div`
    position: absolute;
    top: 60%;
    right: 138%;
    transform: translate(700%, -130%);
    z-index: 1;
    width: 100px;
    height: 300px;
`;

export const ImageWrapper2 = styled.div`
    position: absolute;
    top: 63%;
    right: 135%;
    transform: translate(700%, -130%);
    z-index: 1;
    width: 100px;
    height: 300px;
`;

export const ImageWrapper3 = styled.div`
    position: absolute;
    top: 70%;
    right: 75.5%;
    transform: translate(700%, -130%);
    z-index: 1;
    width: 100px;
    height: 300px;
`;

export const ImageWrapper4 = styled.div`
    position: absolute;
    top: 77%;
    right: 135%;
    transform: translate(700%, -130%);
    z-index: 1;
    width: 100px;
    height: 300px;
`;

export const ImageWrapper5 = styled.div`
    position: absolute;
    top: 95%;
    right: 68%;
    transform: translate(700%, -130%);
    z-index: 1;
    width: 100px;
    height: 300px;
`;

export const ImageWrapper6 = styled.div`
    position: absolute;
    top: 100%;
    right: 135%;
    transform: translate(700%, -130%);
    z-index: 1;
    width: 100px;
    height: 300px;
`;

export const Content1 = styled.div`
    position: absolute;
    top: 10%;
    left: 23%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 2;
`;

export const Content2 = styled.div`
    position: absolute;
    top: 23%;
    left: 63%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 2;
    white-space: nowrap;
    line-height: 1.5;
`;

export const Content3 = styled.h2`
  position: absolute;
  top: 49.5%;
  left: 20%;
  transform: translate(-60%, -100%);
  text-align: justify;
  z-index:2;
  display: inline-block;
  white-space: nowrap;
  color: #black;
  font-size: 30px;
  font-family : wooju;
  line-height : 1.5;
`;

export const Title1 = styled.h2`
    color: #033495;
    font-size: 64px;
    font-family: "wooju";
    word-wrap: break-word; 
`;

export const Title2 = styled.h2`
    color: #6a9cfd;
    font-size: 64px;
    font-family: wooju;
`;

export const Comment1 = styled.h2`
    color: black;
    font-size: 32px;
    font-family: wooju;
    top: 45%;
    left: 23%;
`;

export const Comment2 = styled.h2`
position: absolute;
top: 53.3%;
left: 80.5%;
transform: translate(-50%, -50%);
text-align: center;
z-index:2;
font-size: 30px;
font-family : wooju;
color: black;
line-height : 1.5;
white-space: nowrap;
`;

export const Comment3 = styled.h2`
position: absolute;
top: 73.5%;
left: 34%;
transform: translate(-60%, -100%);
text-align: justify;
z-index:2;
display: inline-block;
white-space: nowrap;
color: #black;
font-size: 30px;
font-family : wooju;
line-height : 1.5;
`;

export const Comment4 = styled.h2`
position: absolute;
top: 79.2%;
left: 86%;
transform: translate(-60%, -100%);
text-align: justify;
z-index:2;
display: inline-block;
white-space: nowrap;
color: #black;
font-size: 30px;
font-family : wooju;
line-height : 1.5;
`;

export const Comment5 = styled.h2`
position: absolute;
top: 92.5%;
left: 31%;
transform: translate(-60%, -100%);
text-align: justify;
z-index:2;
display: inline-block;
white-space: nowrap;
color: #black;
font-size: 30px;
font-family : wooju;
line-height : 1.5;
`;

export const SearchBar1 = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 0px solid #ccc;
  border-radius: 30px;
  padding: 65px 55px;
  width: 330%;
  max-width: 2000px;

  &::before {
    content: '';
    position: absolute;
    transform: translateY(-50%);
    width: 20;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #ffffff; /* 꼬리 색상을 배경색과 동일하게 설정 */
  }

  &::after {
    content: '';
    position: absolute;
    top: 20%;
    left: -38px; /* 꼬리 뾰족한 부분을 왼쪽 옆을 향하도록 설정 */
    transform: translateY(-50%);
    width: 10;
    height: 10;
    border-left: 20px solid transparent;
    border-right: 20px solid #ffffff; /* 꼬리 뾰족한 부분의 색상 설정 */
    border-bottom: 20px solid transparent;
  }
`;

export const SearchBar2 = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: #fef01b;
  border: 0px solid #ccc;
  border-radius: 30px;
  padding: 40px 45px;
  width: 400%;
  max-width: 2000px;



  &::after {
    content: '';
    position: absolute;
    top: 33%;
    left: 470px; /* 꼬리 뾰족한 부분을 왼쪽 옆을 향하도록 설정 */
    transform: translateY(-50%) rotate(270deg);
    width: 10;
    height: 10;
    border-left: 20px solid transparent;
    border-right: 20px solid #fef01b; /* 꼬리 뾰족한 부분의 색상 설정 */
    border-bottom: 20px solid transparent;
  }
`;

export const SearchBar3 = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 0px solid #ccc;
  border-radius: 30px;
  padding: 175px 65px;
  width: 650%;
  max-width: 2000px;

  &::before {
    content: '';
    position: absolute;
    transform: translateY(-50%);
    width: 20;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #ffffff; /* 꼬리 색상을 배경색과 동일하게 설정 */
  }

  &::after {
    content: '';
    position: absolute;
    top: 20%;
    left: -38px; /* 꼬리 뾰족한 부분을 왼쪽 옆을 향하도록 설정 */
    transform: translateY(-50%);
    width: 10;
    height: 10;
    border-left: 20px solid transparent;
    border-right: 20px solid #ffffff; /* 꼬리 뾰족한 부분의 색상 설정 */
    border-bottom: 20px solid transparent;
  }
`;

export const SearchBar4 = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: #fef01b;
  border: 0px solid #ccc;
  border-radius: 30px;
  padding: 35px 30px;
  width: 320%;
  max-width: 2000px;



  &::after {
    content: '';
    position: absolute;
    top: 43%;
    left: 360px; /* 꼬리 뾰족한 부분을 왼쪽 옆을 향하도록 설정 */
    transform: translateY(-50%) rotate(270deg);
    width: 10;
    height: 10;
    border-left: 20px solid transparent;
    border-right: 20px solid #fef01b; /* 꼬리 뾰족한 부분의 색상 설정 */
    border-bottom: 20px solid transparent;
  }
`;

export const SearchBar5 = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 0px solid #ccc;
  border-radius: 30px;
  padding: 130px 65px;
  width: 550%;
  max-width: 2000px;

  &::before {
    content: '';
    position: absolute;
    transform: translateY(-50%);
    width: 20;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #ffffff; /* 꼬리 색상을 배경색과 동일하게 설정 */
  }

  &::after {
    content: '';
    position: absolute;
    top: 20%;
    left: -38px; /* 꼬리 뾰족한 부분을 왼쪽 옆을 향하도록 설정 */
    transform: translateY(-50%);
    width: 10;
    height: 10;
    border-left: 20px solid transparent;
    border-right: 20px solid #ffffff; /* 꼬리 뾰족한 부분의 색상 설정 */
    border-bottom: 20px solid transparent;
  }
`;
