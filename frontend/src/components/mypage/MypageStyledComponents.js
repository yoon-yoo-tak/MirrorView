import { styled } from "styled-components";

import pfImage from "../../assets/sidebar/🦆 icon _person outline_.png";
import pcImage from "../../assets/sidebar/🦆 icon _people outline_.png";
import fbImage from "../../assets/sidebar/🦆 icon _book open outline_.png";
import essayImage from "../../assets/sidebar/🦆 icon _file text outline_.png";
import defaultImage from "../../assets/defaultimage.png";
import updateIcon from "../../assets/pencil.png";

// 사이드바

export const sidebarWrap = styled.div`
    background-image: url(${process.env.PUBLIC_URL}/sidebar-background.png);
    width: 280px;
    height: 855px;
    flex: 1;
`;

export const sideMenuWrap = styled.div`
    padding: 30px 0 0 20px;
`;

export const sideMenu = styled.div`
    height: 27px;
    display: flex;
    // align-items: left;
    justify-content: left;
    font-size: 15px;
    padding: 15px 5px;
    display: flex;
    align-items: center;
    border-radius: 30px 0 0 30px;
    font-family: "Nanum Gothic";
    cursor: pointer;
    &:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }
`;

export const sideMenuNow = styled.div`
    height: 27px;
    display: flex;
    // align-items: left;
    justify-content: left;
    font-size: 15px;
    padding: 15px 5px;
    align-items: center;
    background-color: white;
    border-radius: 30px 0 0 30px;
    font-family: "Nanum Gothic";
    cursor: pointer;
`;

export const icons = styled.div`
    width: 20px;
    height: 20px;
    margin: 0 10px 0 10px;
`;

export const pf_icon = styled.div`
    width: 20px;
    height: 20px;
    margin: 0 10px 0 10px;
    background-image: url(${pfImage});
    background-size: cover;
`;

export const pc_icon = styled.div`
    width: 20px;
    height: 20px;
    margin: 0 10px 0 10px;
    background-image: url(${pcImage});
    background-size: cover;
`;

export const fb_icon = styled.div`
    width: 20px;
    height: 20px;
    margin: 0 10px 0 10px;
    background-image: url(${fbImage});
    background-size: cover;
`;

export const es_icon = styled.div`
    width: 20px;
    height: 20px;
    margin: 0 10px 0 10px;
    background-image: url(${essayImage});
    background-size: cover;
`;

// 마이페이지 내부

export const page = styled.div`
    display: flex;
    justify-content: center;
    height: 855px;
    font-family: "HakgyoansimWoojuR";
`;

export const wrap = styled.div`
    flex: 4;
    margin: 10px 50px;
`;

// 마이페이지 - 회원 정보 조회

export const profilePage = styled.div`
    display: flex;
    justify-content: center;
    font-family: "HakgyoansimWoojuR";
`;

export const profileWrap = styled.div`
    flex: 4;
    margin: 10px 50px;
`;

export const profileImage = styled.div`
    position: relative;
`;

export const profileInfo = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    margin: 50px;
`;

export const profileKey = styled.div`
    margin: 20px 40px 20px 50px;
    flex: 1;
`;

export const profileDetail = styled.div`
    margin: 20px 40px 20px 20px;
    flex: 3;
`;

export const profileContent = styled.div`
    font-size: 20px;
    padding: 10px;
`;

export const profileUpdate = styled.div`
    margin: 20px;
    flex: 3;
`;

export const vLine = styled.div`
    border-left: thick solid #ffffff;
    border: 0.01rem solid black;
    height: 110px;
`;

export const profileBox = styled.div``;

export const gradeGroup = styled.div`
    display: flex;
    justify-content: left;
`;

export const grade = styled.div`
    font-style: normal;
    font-weight: 500;
    font-size: 60px;
    line-height: 70px;

    color: #000000;

    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.71);
`;

export const gradeStar = styled.div``;

export const newEmailForm = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
`;

export const confirmBtn = styled.button`
    text-align: right;
    border: 0;

    background: #a1b6ff;
    box-shadow: 0px 0px 15px #bdbdbd;
    border-radius: 19px;
    cursor: pointer;
    &:hover {
        background-color: #e9e4ff;
    }
`;

export const cropModal = styled.div`
    width: 600px;
    height: 400px;
    z-index: 999;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background: #ffffff;
    box-shadow: 0px 0px 15px #000000;
    border-radius: 37px;

    font-family: "HakgyoansimWoojuR";

    padding: 20px 20px;
`;

export const cropContainer = styled.div`
    width: 600px;
    height: 350px;
    // z-index: 999;

    // top: 10%;
    // left: 50%;

    position: relative;
    background: white;
`;

export const buttonWrap = styled.div`
    justify-content: center;
    display: flex;
    padding: 18px;
`;

export const updateImageButton = styled.button`
    // margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 0;

    font-family: "HakgyoansimWoojuR";
    font-weight: bold;

    position: relative;
    width: 80px;
    height: 32px;

    background: white;
    box-shadow: 0px 0px 10px #bdbdbd;
    border-radius: 13px;
    cursor: pointer;
    &:hover {
        background-color: #dce6ff;
    }
`;

// 마이페이지 - 피드백 아카이브

export const fbComponent = styled.div`
    display: flex;
    flex-wrap: wrap;
    // justify-content: center;
    // flex-direction: row;
    margin: 50px;
`;

export const fbThumbnail = styled.div`
    box-sizing: border-box;

    width: 217px;
    height: 282px;
    left: 0px;
    top: 10px;

    margin: 20px;
    padding: 20px;

    background: rgba(246, 252, 255, 0.55);
    border: 2px solid #000000;
    border-radius: 30px;
`;

export const modalContainer = styled.div`
    /* 모달창 크기 */
    width: 600px;
    height: 400px;

    /* 최상단 위치 */
    z-index: 999;

    /* 중앙 배치 */
    /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
    /* translate는 본인의 크기 기준으로 작동한다. */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    /* 모달창 디자인 */
    background: #ffffff;
    box-shadow: 0px 0px 15px #000000;
    border-radius: 37px;
`;

export const modalButton = styled.button`
    position: absolute;
    right: 20px;
    top: 20px;
    border: 0;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 0;

    // position: relative;
    width: 50px;
    height: 30px;

    background: #fe8a8a;
    box-shadow: 0px 0px 15px #bdbdbd;
    border-radius: 19px;
    cursor: pointer;
    &:hover {
        background-color: #ffe8e8;
    }
`;

export const modalContent = styled.div`
    padding: 50px;
`;

export const modalBackDrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 999;
`;

// 마이페이지 - 비밀번호 변경
export const formComponent = styled.div`
    // display: flex;
    justify-content: center;
    // align-items: center;
    margin-top: 30px;
`;

export const changePwForm = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const changePwFormEach = styled.div`
    margin-bottom: 15px;
    // display: flex;
`;

export const changeBtn = styled.button`
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

export const changeFormExBtn = styled.div``;

export const changeInput = styled.input`
    margin: 5px 0 5px 0;
    width: 400px;
    height: 40px;
    background: #e6e6e6;
    border: 0;
    border-radius: 10px;
`;

export const errorMessageWrap = styled.div`
    margin-bottom: 20px;
`;

// 자기소개서

export const essayComponent = styled.div`
    display: flex;
    flex-wrap: wrap;
    // justify-content: center;
    // flex-direction: row;
    margin: 50px;
`;

export const essayThumbnail = styled.div`
    box-sizing: border-box;

    width: 300px;
    height: 160px;

    margin: 20px;
    padding: 20px;

    border-radius: 30px;
    background: #ffffff;
    box-shadow: 0px 0px 10px #000000;
    border-radius: 37px;
`;

export const btn = styled.button`
    margin: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 0;

    width: 80px;
    height: 35px;

    // position: relative;
    position: absolute;
    right: 50px;
    // top: 20px;

    background: ${(props) =>
        props.theme === "save"
            ? "#a1b6ff"
            : props.theme === "create"
            ? "#FFFFFF"
            : "#000000"};

    box-shadow: 0px 0px 15px #bdbdbd;
    border-radius: 19px;
    cursor: pointer;
    &:hover {
        background-color: #e9e4ff;
    }
`;

export const hidden = styled.div`
    visibilit: hidden;
`;

// 버튼
export const Button = styled.div`
    cursor: pointer;

    width: ${(props) => (props.value === "image" ? "40px" : "30px")};
    height: ${(props) => (props.value === "image" ? "40px" : "30px")};
    position: ${(props) => (props.value === "image" ? "absolute" : "")};
    right: ${(props) => (props.value === "image" ? "0" : "")};
    bottom: ${(props) => (props.value === "image" ? "0" : "")};
    margin: 0 10px 0 10px;
    background-image: url(${updateIcon});
    background-size: cover;
    filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.4));
`;

// NickName change
export const btn2 = styled.button`
    margin: -45px;
    margin-left: 730px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 0;

    width: 5rem;
    height: 2.1875rem;

    // position: absolute;
    // right: 120px;

    background: ${(props) =>
        props.theme === "save"
            ? "#a1b6ff"
            : props.theme === "create"
            ? "#FFFFFF"
            : "#E3F1F8"};

    box-shadow: 0px 0px 0px #bdbdbd;
    border-radius: 19px;
    cursor: pointer;
    &:hover {
        background-color: #e9e4ff;
    }
`;

export const btn3 = styled.button`
    margin: 150px;
    margin-left: 30.625rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 0;

    width: 60px;
    height: 35px;

    background: #a1b6ff;

    box-shadow: 0px 0px 5px #bdbdbd;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #e9e4ff;
    }
`;

export const changeInput2 = styled.input`
    margin: 60px 0 5px;
    width: 25rem;
    height: 2.5rem;
    background: #e6e6e6;
    border: 0;
    border-radius: 0.625rem;
    margin-left: 18.75rem;

    ::placeholder {
        color: black;
        font-size: 1.875rem;
    }
`;

export const comment = styled.div`
    margin-top: -21.875rem;
    width: 25rem;
    height: 2.5rem;
    border-radius: 10px;
    margin-left: 19.0625rem;
`;
