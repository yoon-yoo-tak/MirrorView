import { styled, keyframes } from "styled-components";
import etc from "../assets/dots.png";
import background from "../assets/cloudbg3.svg";

export const modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${(props) => (props.value === "report" ? "350px" : "420px")};
    height: ${(props) => (props.value === "report" ? "170px" : "240")};
    padding: 20px;
    background-color: ${(props) =>
        props.value === "report" ? "#FFF3F3" : "#FFFFFF"};
    border-radius: 19px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    font-size: 20px;

    font-family: "HakgyoansimWoojuR";
`;
export const reportTitle = styled.div`
    font-size: 15px;
`;

export const reportTitleText = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

export const reportInput = styled.textarea`
    max-height: 70%;
    max-width: 100%;
    margin: 10px 0;
`;

export const reportBtnTap = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const reportBtn = styled.div`
    font-size: 16px;
    cursor: pointer;
    &:hover {
        font-weight: bold;
    }
`;

export const head = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 17px;
`;

export const title = styled.div``;

export const userInfo = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 20px;
`;
export const infoBox = styled.div`
    margin: 0 10px 0 20px;
    min-width: 200px;
`;

export const userName = styled.div`
    font-weight: bold;
    margin-bottom: 15px;
`;

export const infoContent = styled.div`
    display: flex;
    font-size: 17px;
`;

export const infoTap = styled.div`
    margin-right: 20px;
`;

export const infoTapDetail = styled.div`
    // margin-right: 20px;
    min-width: 150px;
`;

export const text = styled.div`
    margin: 15px 0;
`;

export const btnWrap = styled.div`
    display: flex;
    justify-content: center;
`;

export const enterbtn = styled.div`
    cursor: pointer;

    margin: 3px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 0;

    width: 75px;
    height: 30px;

    font-size: 17px;
    // color: white;
    font-weight: bold;

    background: ${(props) =>
        props.value === "accept"
            ? "#71C69D"
            : props.value === "request"
            ? "#6BB5DE"
            : "#ffb1bb"};
    box-shadow: 0px 0px 10px #bdbdbd;
    border-radius: 15px;
    cursor: pointer;
    &:hover {
        color: white;
    }
`;

export const closeBtn = styled.div`
    cursor: pointer;
    font-size: 16px;
    &:hover {
        font-weight: bold;
    }
`;

export const etcBtn = styled.div`
    background-image: url(${etc});
    background-size: cover;
    width: 23px;
    height: 23px;
    cursor: pointer;
    // transition: transform 0.2s;
    // &:hover {
    //   transform: scale(1.2);
    // }
`;

export const etcMenus = styled.div`
    padding: 10px;
`;

export const notFoundBack = styled.div`
    background-image: url(${background});
    background-size: cover;
    width: auto;
    height: calc(100vh - 60px);
    justify-content: center;
    display: flex;
    font-family: "HakgyoansimWoojuR";
    padding-top: 60px;
    opacity: 0.7;
`;

export const nfContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const bounce = keyframes`
    100% {
        text-shadow: 0 1px 0 #ccc, 0 2px 0 #ccc, 0 3px 0 #ccc, 0 4px 0 #ccc,
            0 5px 0 #ccc, 0 6px 0 #ccc, 0 7px 0 #ccc, 0 8px 0 #ccc, 0 9px 0 #ccc,
            0 50px 25px rgba(0, 0, 0, 0.2);
    }
`;

export const main404 = styled.div``;

export const notText = styled.div`
    font-family: "Cafe24Ssurround";
    font-size: 35px;
    text-shadow: 0 1px 0 #ccc, 0 2px 0 #ccc, 0 3px 0 #ccc, 0 4px 0 #ccc,
        0 5px 0 #ccc, 0 6px 0 transparent, 0 7px 0 transparent,
        0 8px 0 transparent, 0 9px 0 transparent, 0 10px 10px rgba(0, 0, 0, 0.4);

    color: white;
`;

export const pageText = styled.div`
    font-family: "Cafe24SsurroundAir";
    font-size: 15px;
    color: white;
    text-shadow: 0 1px 0 #ccc, 0 2px 0 #ccc, 0 3px 0 #ccc, 0 4px 0 #ccc,
        0 5px 0 #ccc, 0 6px 0 transparent, 0 7px 0 transparent,
        0 8px 0 transparent, 0 9px 0 transparent, 0 10px 10px rgba(0, 0, 0, 0.4);
`;

export const text1 = styled.span`
    font-family: "Cafe24Ssurround";

    animation: ${bounce} 0.8s ease infinite alternate;
    animation-delay: 0.2s;
    font-size: 120px;
    color: #fff;
    text-shadow: 0 1px 0 #ccc, 0 2px 0 #ccc, 0 3px 0 #ccc, 0 4px 0 #ccc,
        0 5px 0 #ccc, 0 6px 0 transparent, 0 7px 0 transparent,
        0 8px 0 transparent, 0 9px 0 transparent, 0 10px 10px rgba(0, 0, 0, 0.4);
`;
export const text2 = styled.span`
    font-family: "Cafe24Ssurround";

    animation: ${bounce} 0.8s ease infinite alternate;
    animation-delay: 0.4s;
    font-size: 120px;
    color: #fff;
    text-shadow: 0 1px 0 #ccc, 0 2px 0 #ccc, 0 3px 0 #ccc, 0 4px 0 #ccc,
        0 5px 0 #ccc, 0 6px 0 transparent, 0 7px 0 transparent,
        0 8px 0 transparent, 0 9px 0 transparent, 0 10px 10px rgba(0, 0, 0, 0.4);
`;
export const text3 = styled.span`
    font-family: "Cafe24Ssurround";

    animation: ${bounce} 0.8s ease infinite alternate;
    animation-delay: 0.6s;
    font-size: 120px;
    color: #fff;
    text-shadow: 0 1px 0 #ccc, 0 2px 0 #ccc, 0 3px 0 #ccc, 0 4px 0 #ccc,
        0 5px 0 #ccc, 0 6px 0 transparent, 0 7px 0 transparent,
        0 8px 0 transparent, 0 9px 0 transparent, 0 10px 10px rgba(0, 0, 0, 0.4);
`;
