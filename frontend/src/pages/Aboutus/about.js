import React from "react";
import styled from "styled-components";
// import Header from "./Header";
import GrayWave from "./bar";
import Bubble from "./bubble";
import Bubble2 from "./bubble2";
import Bubble3 from "./bubble3";
import Bubble4 from "./bubble4";
import Bubble5 from "./bubble5";

const About = () => {
    return (
        <Container>
            <ImageWrapper>
                <img
                    src={process.env.PUBLIC_URL + "/gomin.png"}
                    alt="main_bg2"
                />
            </ImageWrapper>

            <ImageWrapper1>
                <GrayWave></GrayWave>
            </ImageWrapper1>

            <ImageWrapper2>
                <Bubble></Bubble>
            </ImageWrapper2>

            <ImageWrapper3>
                <Bubble2></Bubble2>
            </ImageWrapper3>

            <ImageWrapper4>
                <Bubble3></Bubble3>
            </ImageWrapper4>

            <ImageWrapper5>
                <Bubble4></Bubble4>
            </ImageWrapper5>

            <ImageWrapper6>
                <Bubble5></Bubble5>
            </ImageWrapper6>

            {/* <Header></Header> */}
            <Image src="/bground.png" alt="main_bg" />

            <Content1>
                <Title1>청춘들의 면접 플랫폼</Title1>
                <Title2>밀어:뷰</Title2>
            </Content1>

            <Content2>
                <Comment1>
                    준비해도 불안한 면접 어떻게 시작하지..? <br></br>
                    사람 구하고, 날짜 정하고, 플랫폼 정하고.. <br></br>
                    간단하게 면접 스터디 하는 방법 없을까?
                </Comment1>
            </Content2>

            <Content3>
                안녕하세요 밀어:뷰 입니다.<br></br>
                궁금한 것을 모두 물어보세요 !
            </Content3>

            <Comment2>밀어뷰의 기능은 어떤 것들이 있나요 ?</Comment2>

            <Comment3>
                밀어:뷰는 온라인 면접 스터디 플랫폼 입니다.<br></br>
                스터디를 직접 찾아보고 구해야 하는 번거로움을 덜어드립니다.{" "}
                <br></br>
                카테고리 선택 후 빠른 면접스터디 참여가 가능하고, <br></br>
                면접관의 역할도 경험해 볼 수 있습니다. <br></br>
                <br></br>
                또한 제공되는 피드백 아카이브를 활용하여 본인의 강점/약점을
                <br></br>
                파악하여 활용할 수 있습니다.
            </Comment3>

            <Comment4>누구나 사용할 수 있나요 ?</Comment4>

            <Comment5>
                네 ! 면접 준비가 필요하신 분이라면 남여노소 누구나 <br></br>
                사용이 가능합니다. <br></br>
                급하게 면접 준비가 필요하신 분 , 미리 면접을 준비하면서{" "}
                <br></br>
                필요 역량을 기르고 싶으신 모든 분들에게 "밀어:뷰"를<br></br>
                적극 추천 합니다!
            </Comment5>
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
    height: 300vh;
    object-fit: cover;
`;

const ImageWrapper = styled.div`
    position: absolute;
    top: 57%;
    right: 78%;
    transform: translate(700%, -130%);
    z-index: 1;
    width: 100px;
    height: 600px;
`;

const ImageWrapper1 = styled.div`
    position: absolute;
    top: 60%;
    right: 138%;
    transform: translate(700%, -130%);
    z-index: 1;
    width: 100px;
    height: 300px;
`;

const ImageWrapper2 = styled.div`
    position: absolute;
    top: 63%;
    right: 135%;
    transform: translate(700%, -130%);
    z-index: 1;
    width: 100px;
    height: 300px;
`;

const ImageWrapper3 = styled.div`
    position: absolute;
    top: 70%;
    right: 75.5%;
    transform: translate(700%, -130%);
    z-index: 1;
    width: 100px;
    height: 300px;
`;

const ImageWrapper4 = styled.div`
    position: absolute;
    top: 77%;
    right: 135%;
    transform: translate(700%, -130%);
    z-index: 1;
    width: 100px;
    height: 300px;
`;

const ImageWrapper5 = styled.div`
    position: absolute;
    top: 95%;
    right: 68%;
    transform: translate(700%, -130%);
    z-index: 1;
    width: 100px;
    height: 300px;
`;

const ImageWrapper6 = styled.div`
    position: absolute;
    top: 100%;
    right: 135%;
    transform: translate(700%, -130%);
    z-index: 1;
    width: 100px;
    height: 300px;
`;

const Content1 = styled.div`
    position: absolute;
    top: 15%;
    left: 23%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 2;
`;

const Content2 = styled.div`
    position: absolute;
    top: 26%;
    left: 63%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 2;
    white-space: nowrap;
    line-height: 1.5;
`;

const Content3 = styled.h2`
    position: absolute;
    top: 50.2%;
    left: 20%;
    transform: translate(-60%, -100%);
    text-align: justify;
    z-index: 2;
    display: inline-block;
    white-space: nowrap;
    color: #black;
    font-size: 30px;
    font-family: wooju;
    line-height: 1.5;
`;

const Title1 = styled.h2`
    color: #033495;
    font-size: 64px;
    font-family: "wooju";
`;

const Title2 = styled.h2`
    color: #6a9cfd;
    font-size: 64px;
    font-family: wooju;
`;

const Comment1 = styled.h2`
    color: black;
    font-size: 32px;
    font-family: wooju;
    top: 45%;
    left: 23%;
`;

const Comment2 = styled.h2`
    position: absolute;
    top: 54.3%;
    left: 80.5%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 2;
    font-size: 30px;
    font-family: wooju;
    color: black;
    line-height: 1.5;
    white-space: nowrap;
`;

const Comment3 = styled.h2`
    position: absolute;
    top: 73.5%;
    left: 34%;
    transform: translate(-60%, -100%);
    text-align: justify;
    z-index: 2;
    display: inline-block;
    white-space: nowrap;
    color: #black;
    font-size: 30px;
    font-family: wooju;
    line-height: 1.5;
`;

const Comment4 = styled.h2`
    position: absolute;
    top: 80%;
    left: 86%;
    transform: translate(-60%, -100%);
    text-align: justify;
    z-index: 2;
    display: inline-block;
    white-space: nowrap;
    color: #black;
    font-size: 30px;
    font-family: wooju;
    line-height: 1.5;
`;

const Comment5 = styled.h2`
    position: absolute;
    top: 92.7%;
    left: 31%;
    transform: translate(-60%, -100%);
    text-align: justify;
    z-index: 2;
    display: inline-block;
    white-space: nowrap;
    color: #black;
    font-size: 30px;
    font-family: wooju;
    line-height: 1.5;
`;

export default About;
