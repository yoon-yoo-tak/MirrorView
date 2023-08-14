import { styled } from "styled-components";

export const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    border: none;
    overflow-x: hidden;
    overflow-y: hidden;
`;

export const Image = styled.img`
    width: 100%;
    height: 250vh;
    object-fit: cover;
    margin: 0;
    padding: 0;
    display: flex;
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

export const FirstTitle = styled.h2`
    position: relative;
    color: #033495;
    font-size: 64px;
    letter-spacing: 10px;
    font-family: "DAE";
`;

export const SecondTitle = styled.h2`
    position: relative;
    color: #6a9cfd;
    font-size: 64px;
    font-family: "DAE";
`;

export const Title3 = styled.h2`
    position: relative;
    /* color: rgba(106, 207, 44, 1.9); */
    color: rgba(12, 1, 144, 1.9);
    font-size: 82px;
    letter-spacing: 25px;
    font-family: establishRoomNo703OTF;
`;

export const ImageWrapper = styled.div`
    position: relative;
    z-index: 1;
`;

export const ImageWrapper2 = styled.div`
    position: relative;
    z-index: 1;
`;

export const ImageWrapper3 = styled.div`
    position: relative;
    z-index: 1;
`;

//Benefit
export const Benefit = styled.h2`
    position: relative;
    color: #2f2f2f;
    font-size: 40px;
    font-family: DAE;
    z-index: 99;
`;

export const Benefit2 = styled.h2`
    position: relative;
    color: #2f2f2f;
    font-size: 40px;
    font-family: DAE;
    z-index: 99;
`;

export const Benefit3 = styled.h2`
    position: relative;
    color: #2f2f2f;
    font-size: 40px;
    font-family: DAE;
    z-index: 99;
`;

export const BenefitWrapper = styled.div`
    position: relative;
    z-index: -1;
`;

export const BenefitWrapper2 = styled.div`
    position: absolute;
    z-index: -1;
`;

export const BenefitWrapper3 = styled.div`
    position: absolute;
    z-index: -1;
`;
