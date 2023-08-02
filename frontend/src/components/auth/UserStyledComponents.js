import { styled } from "styled-components";

export const loginForm = styled.div`
    background-image: url(${process.env.PUBLIC_URL}/bground.png);
    width: 100%;
    height: 855px;
    font-family: "HakgyoansimWoojuR";
`;

export const hidden = styled.div`
    visibility: hidden;
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
    width: 60vh;
    padding: 30px;
    margin-top: 60px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.33);
    border-radius: 20px;
`;
export const inputTitle = styled.div``;
export const inputWrap = styled.div`
    margin-bottom: 15px;
`;
export const contentWrap = styled.div`
    display: flex;
    justify-content: center;
    // align-items: center;
    flex-direction: column;
    margin: 20px 0;
`;

export const inputContent = styled.input`
    margin: 5px 0 5px 0;
    width: 400px;
    height: 40px;
    background: #e6e6e6;
    border: 0;
    border-radius: 10px;
`;

export const errorMessage = styled.div`
    margin-bottom: 20px;
`;

export const submitButton = styled.button`
    margin: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 0;

    position: relative;
    width: 80px;
    height: 35px;

    background: #a1b6ff;
    box-shadow: 0px 0px 15px #bdbdbd;
    border-radius: 19px;
    cursor: pointer;
    &:hover {
        background-color: #e9e4ff;
    }
`;

export const signupForm = styled.div`
    background-image: url(${process.env.PUBLIC_URL}/bground.png);
    width: 100%;
    height: 855px;
    font-family: "HakgyoansimWoojuR";
`;