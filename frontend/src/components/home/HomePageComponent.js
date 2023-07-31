import { styled } from "styled-components";

export const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    border: none;
`;

export const Image = styled.img`
  width: 100%;
  height: 210vh;
  object-fit: cover;
  margin: 0;
  padding: 0;
`;

export const Content = styled.div`
    position: absolute;
    top: 30%;
    left: 25%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 2;
`;

export const Content2 = styled.div`
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 2;
`;

export const Content3 = styled.div`
    position: absolute;
    top: 93%;
    left: 40%;
    transform: translate(-60%, -100%);
    text-align: justify;
    z-index: 2;
    display: inline-block;
    white-space: nowrap;
`;

export const Title = styled.h2`
    color: #033495;
    font-size: 64px;
    font-family: "DAE";
`;

export const Title2 = styled.h2`
    color: #6a9cfd;
    font-size: 64px;
    font-family: DAE;
`;

export const Title3 = styled.h2`
    color: #6a9cfd;
    font-size: 64px;
    font-family: DAE;
`;

export const Title4 = styled.h2`
    color: #f9d723;
    font-size: 40px;
    font-family: DAE;
`;

export const ImageWrapper = styled.div`
    position: absolute;
    top: 50%;
    right: 70%;
    transform: translate(700%, -130%);
    z-index: 1;
    width: 100px;
    height: 300px;
`;

export const ImageWrapper2 = styled.div`
    position: absolute;
    top: 210%;  
    right: 125%;
    transform: translate(700%, -130%);
    z-index: 1;
    width: 100px;
    height: 300px;
`;

export const ImageWrapper3 = styled.div`
    position: absolute;
    top: 110%;
    right: 67%;
    transform: translate(700%, -130%);
    z-index: 1;
    width: 100px;
    height: 300px;
`;
