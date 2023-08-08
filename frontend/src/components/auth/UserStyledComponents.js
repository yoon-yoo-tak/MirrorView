import { styled, keyframes } from "styled-components";

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const form = styled.div`
    // background-image: url(${process.env.PUBLIC_URL}/bground.png);
    background: linear-gradient(-45deg, #dbffff, #dbeeff, #dcdbff, #efdbff);
    animation: ${gradientAnimation} 5s ease infinite;
    background-size: 300% 300%;
    width: 100%;
    height: 855px;
    font-family: "HakgyoansimWoojuR";
`;

export const hidden = styled.div`
    visibility: hidden;
    margin-bottom: 10px;
`;

export const page = styled.div`
    display: flex;
    justify-content: center;
`;

export const wrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: white;
    width: 450px;
    padding: 30px;
    margin-top: 60px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.33);
    border-radius: 20px;
`;

export const pageTitle = styled.div`
    display: flex;
    justify-center: center;
    font-size: 30px;
    font-weight: bold;
    font-family: "Quicksand";
`;

export const inputTitle = styled.div``;
export const inputWrap = styled.div`
    // margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
export const contentWrap = styled.div`
    display: flex;
    justify-content: center;
    // align-items: center;
    flex-direction: column;
    margin-top: 20px;
    position: relative;
`;

export const inputContent = styled.input`
    margin: 5px 0 5px 0;
    width: ${(props) => (props.menu === "dup" ? "330px" : "400px")};
    height: 40px;
    background: #e6e6e6;
    border: 0;
    border-radius: 10px;
`;

export const errorMessage = styled.div`
    margin-bottom: 10px;
`;

export const submitButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 0;

    font-weight: bold;
    font-size: 14px;
    color: white;

    position: relative;
    width: 162px;
    height: 40px;

    background: #95acff;
    // box-shadow: 0px 0px 15px #bdbdbd;
    // filter: drop-shadow(0px 0px 5px #bdbdbd);
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #aac0fa;
    }
    font-family: "HakgyoansimWoojuR";
`;

export const signupForm = styled.div`
    background-image: url(${process.env.PUBLIC_URL}/bground.png);
    width: 100%;
    height: 855px;
    font-family: "HakgyoansimWoojuR";
`;

export const textWrap = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
`;

export const findWrap = styled.div`
    display: flex;
`;

export const findInfo = styled.div`
    cursor: pointer;
    &:hover {
        font-weight: bold;
    }
`;

export const goSignUp = styled.div`
    // font-weight: bold;
    cursor: pointer;
    &:hover {
        font-weight: bold;
    }
`;

export const goLoginWrap = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    height: 40px;
`;

export const kakaoLogin = styled.img`
    object-fit: contain;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
`;

export const CheckBtn = styled.div`
    font-family: HakgyoansimWoojuR;

    font-size: 16px;
    margin: 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 0px;
    border-radius: 15px;
    width: 60px;
    height: 35px;
    cursor: pointer;
    &:hover {
        font-weight: bold;
    }
`;

export const signupWrap = styled.div`
    display: flex;
    justify-content: center;
    height: 40px;
`;

export const signupButton = styled.div`
    font-family: HakgyoansimWoojuR;
    margin: 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 0px;

    position: relative;
    width: 80px;
    height: 40px;

    font-weight: bold;
    font-size: 14px;
    color: white;

    background: #95acff;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #aac0fa;
    }
    font-family: "HakgyoansimWoojuR";
`;
