import { styled } from "styled-components";
import starrr from "../../assets/twilight2.svg";
import mainImage from "../../assets/mainImage.png";
import sparkle from "../../assets/sparkles_2728.gif";

export const Container = styled.div`
    background-image: url(${starrr});
    background-size: cover;
    width: auto;
    font-family: "Cafe24SsurroundAir";
`;

export const firstPage = styled.div`
    display: flex;
    justify-content: center;
    height: 750px;
    align-items: end;
`;
export const titleWrap = styled.div`
    margin-bottom: 150px;
`;

export const subTitle = styled.div``;
export const mainTitle = styled.div``;

export const secondPage = styled.div`
    height: auto;
    margin-top: 130px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
export const pointTitleWrap = styled.div`
    display: flex;
    justify-content: center;
`;

export const sparkles = styled.div`
    background-image: url(${sparkle});
    background-size: cover;
    width: 80px;
    height: 80px;
    position: absolute;
    left: -33%;
    bottom: 5%;
`;

export const pointTitle = styled.div`
    font-family: "Cafe24SsurroundAir";
    font-size: 30px;
    font-weight: bold;
    margin: 50px;
    position: relative;
    color: #241e70;
`;

export const pointText = styled.div`
    font-family: "Cafe24SsurroundAir";
    font-weight: bold;
    font-size: 20px;
`;
export const pointTextWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 100px;
    margin: 0 50px 100px 50px;
`;

export const Image = styled.img`
    width: 100%;
    height: 250vh;
    object-fit: cover;
    margin: 0;
    padding: 0;
    display: flex;
`;

export const benefitTap = styled.div`
    background-color: white;
    padding: 30px;
    margin: 10px;
    border-radius: 30px;
    width: 450px;
    height: 80px;
    display: flex;
    text-align: ${(props) => (props.value === "second" ? "end" : "")};
    flex-direction: column;
    justify-content: center;
    margin-right: ${(props) =>
        props.value === "first" || props.value === "third" ? "auto" : ""};
    margin-left: ${(props) => (props.value === "second" ? "auto" : "")};
`;

// export const Content = styled.div`
//     position: absolute;
//     top: 30%;
//     left: 25%;
//     transform: translate(-50%, -50%);
//     text-align: center;
//     z-index: 2;
// `;

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

export const FirstTitle = styled.div`
    // position: relative;
    color: #241e70;
    font-size: 2rem;
    // letter-spacing: 10px;
    // font-family: "DAE";
    font-family: "Cafe24SsurroundAir";
    text-shadow: 3px 3px 2px #b7b9f1;
`;

export const SecondTitle = styled.div`
    position: relative;
    color: #6064bf;
    font-size: 3rem;
    font-family: "Cafe24Ssurround";
    text-shadow: 3px 3px 1px #b7b9f1, 8px 8px 8px rgba(0, 0, 0, 0.2);
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
    // top: 450px;
    // right: -900px;
    width: 675px;
    height: 712px;
    margin-top: 50px;
    z-index: 1;
    background-size: cover;
    background-image: url(${mainImage});
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
    font-family: "Cafe24SsurroundAir";
    z-index: 99;
`;

export const Benefit2 = styled.h2`
    position: relative;
    color: #2f2f2f;
    font-size: 40px;
    font-family: "Cafe24SsurroundAir";
    z-index: 99;
`;

export const Benefit3 = styled.h2`
    position: relative;
    color: #2f2f2f;
    font-size: 40px;
    font-family: "Cafe24SsurroundAir";
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
