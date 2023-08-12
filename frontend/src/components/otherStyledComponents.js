import styled from "styled-components";
import etc from "../assets/dots.png";

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
