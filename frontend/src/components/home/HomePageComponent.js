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
  height: 210vh;
  object-fit: cover;
  margin: 0;
  padding: 0;
  display: flex;
`;

// const BackgroundImage = process.env.PUBLIC_URL + "/background2.png";

// export const Page = styled.div`
//   background-image: url(${BackgroundImage});
//   background-size: cover;
//   width: auto;
//   height: 855px;
//   justify-content: center;
//   display: flex;
// `;


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
    // font-size: 5rem;
    font-family: "DAE";
`;

export const Title3 = styled.h2`
    color: #6a9cfd;
    font-size: 64px;
    font-family: DAE;
`;

export const Title4 = styled.h2`
    color: #2F2F2F;
    font-size: 40px;
    font-family: DAE;
`;

// export const ImageWrapper = styled.div`
//     position: absolute;
//     top: 50%;
//     right: 70%;
//     transform: translate(700%, -130%);
//     z-index: 1;
//     width: 100px;
//     height: 300px;
// `;


export const ImageWrapper = styled.div`
    position: absolute;
    top: -30%;
    right: 93%;
    transform: translate(700%, -130%);
    z-index: 1;
    width: 100px;
    height: 300px;
`;



export const ImageWrapper2 = styled.div`
    position: absolute;
    top: 150%;  
    right: 189%;
    transform: translate(700%, -130%);
    z-index: 1;
    width: 100px;
    height: 300px;
`;

export const ImageWrapper3 = styled.div`
    position: absolute;
    top: 95%;
    right: 67%;
    transform: translate(700%, -130%);
    z-index: 1;
    width: 100px;
    height: 300px;
`;

export const ImageWrappe4 = styled.div`
    position: absolute;
    top: 448%;
    right: 194%;
    transform: translate(700%, -130%);
    z-index: 1;
    width: 100px;
    height: 300px;
`;

export const ImageWrappe5 = styled.div`
    position: absolute;
    top: 405%;
    right: 182%;
    transform: translate(700%, -130%);
    z-index: 1;
    width: 100px;
    height: 300px;
`;

export const ImageWrappe6 = styled.div`
    position: absolute;
    top: 490%;
    right: 178%;
    transform: translate(700%, -130%);
    z-index: 1;
    width: 100px;
    height: 300px;
`;