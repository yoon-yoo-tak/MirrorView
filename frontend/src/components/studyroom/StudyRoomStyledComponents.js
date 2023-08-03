import { styled, keyframes } from "styled-components";

// 스터디 방 입장
// 입장 후 스터디 시작 전 준비 화면

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

export const page = styled.div`
    font-family: "HakgyoansimWoojuR";
    // min-height: 100vh;
    // min-width: 1200px;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    // background: rgb(29, 22, 60);
    // background: linear-gradient(
    //     153deg,
    //     rgba(29, 22, 60, 1) 0%,
    //     rgba(28, 27, 55, 1) 36%,
    //     rgba(29, 34, 70, 1) 68%,
    //     rgba(27, 42, 66, 1) 100%
    // );
    background: linear-gradient(-45deg, #30577b, #304a7b, #464b72, #474375);
    animation: ${gradientAnimation} 10s ease infinite;
    background-size: 400% 400%;
    // padding: 5vh 0;
`;

export const prepareWrap = styled.div`
    display: flex;
    // height: 20rem;
    // height: 80vh;
    width: 80vw;
    justify-content: center;
    align-items: center;
`;

// 스터디방 좌측 섹션

// 준비 상태 확인용
export const prepareSectionFirst = styled.div`
    width: 365px;
    // height: 80%;
    // color: white;
`;
export const readySection = styled.div`
    margin: 10px;
    display: flex;
    justify-content: space-between;
`;
export const readyText = styled.div`
    color: white;
    padding: 5px;
`;

export const readyButtonDiv = styled.div`
    display: flex;
`;

export const readyButton = styled.div`
    margin: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 0;

    position: relative;
    width: 70px;
    height: 30px;

    background: ${(props) => (props.status === "true" ? "#FF6980" : "#D4D4D4")};
    // box-shadow: 0px 0px 10px #bdbdbd;
    border-radius: 19px;
    cursor: pointer;
    color: white;
    &:hover {
        background-color: ${(props) =>
            props.status === "true" ? "#FFD0D7" : "#D4D4D4"};
    }
`;

// 추후 openvidu 연결
export const myVideo = styled.div`
    width: 335px;
    height: 200px;
    background-color: white;
    box-shadow: 0px 0px 10px #4e4e4e;
    border-radius: 13px;

    padding: 15px;
`;

// 면접자&면접관 전환 공간
export const selectSection = styled.div`
    // border-radius: 13px;
    // margin: 20px 0 30px 0;
    // width: 335px;
    // height: 300px;
    // background-color: white;
    // flex-direction: column;
    // display: flex;

    // padding: 15px;
`;

export const selectPage = styled.div`
    margin: 15px 0;
`;

export const selectChild = styled.div`
    border-radius: ${(props) =>
        props.now === "wee" ? "13px 13px 0 0" : "0 0 13px 13px"};
    margin-top: 3px;
    width: 335px;
    height: 103px;
    background-color: white;
    // box-shadow: 0px 0px 10px #4e4e4e;
    flex-direction: column;
    display: flex;

    padding: 15px;
`;

export const nowText = styled.div`
    margin: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 0;

    position: relative;
    width: 70px;
    height: 30px;

    color: white;
    border-radius: 19px;
    background: ${(props) =>
        props.now === "interviewee" ? "#FF8B8B" : "#4C81E9"};
`;

export const inputHidden = styled.input`
    display: none;
`;

export const changeButtonActive = styled.div`
    margin: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 0;

    position: relative;
    width: 70px;
    height: 30px;

    color: white;
    border-radius: 19px;
    background: #7f6fe4;
    &:hover {
        background: #b1a7ee;
    }
`;

export const changeButtonGray = styled.div`
    margin: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 0;

    position: relative;
    width: 70px;
    height: 30px;

    color: white;
    border-radius: 19px;
    background: #d4d4d4;
`;

export const selectSectionTop = styled.div`
    display: flex;
    justify-content: space-between;
`;
export const selectSectionList = styled.div`
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
`;

export const personList = styled.div`
    padding: 5px;
    font-weight: ${(props) => (props.checkname === "true" ? "bold" : "normal")};
`;

// 스터디 방 우측 섹션
export const prepareSectionSecond = styled.div`
    width: 835px;
`;
export const sectionPage = styled.div`
    min-width: 700px;
    display: flex;
`;

export const sectionWrap = styled.div`
    border-radius: 13px;
    background-color: white;
    box-shadow: 0px 0px 10px #4e4e4e;
    margin: 18px;
    padding: 10px;
    min-width: ${(props) => (props.menu === "viewer" ? "400px" : "500px")};
    height: 550px;
    flex: 8;
`;
export const sectionSelectTaps = styled.div`
    margin: 18px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
`;
export const sectionSelectTap = styled.div`
    width: 70px;
    height: 40px;
    border: 0;
    border-radius: 100px;
    box-shadow: 0px 0px 10px #4e4e4e;

    font-weight: bold;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    margin: 0 0 15px 0;
    background-color: ${(props) =>
        props.menu === "info"
            ? "#FFBFBF"
            : props.menu === "quest"
            ? "#6A9CFD"
            : props.menu === "myInfo"
            ? "#AEE4FF"
            : "#FF95B9"};

    &:hover {
        color: #ffffff;
        cursor: pointer;
    }
`;

export const exitRoom = styled.div`
    width: 70px;
    height: 40px;
    border: 0;
    border-radius: 100px;
    background-color: #fe6666;

    margin: ${(props) =>
        props.menu === "viewer"
            ? "0 10px"
            : props.menu === "viewee"
            ? "10px 20px"
            : ""};
    box-shadow: 0px 0px 10px #4e4e4e;

    font-weight: bold;

    cursor: pointer;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    &:hover {
        color: #ffffff;
        cursor: pointer;
    }
`;

// 스터디 방 우측 섹션 - 참가자 정보 및 자소서 조회
export const profileAndEssayWrap = styled.div`
    display: flex;
    justify-content: center;
    width: auto;
`;

export const peopleTap = styled.div`
    justify-content: center;
    align-items: center;
`;
export const peopleTapWrap = styled.div`
    flex: 1;
    padding: 20px;
`;
export const peopleTitle = styled.div`
    padding: 10px;
    font-size: large;
`;

export const peopleName = styled.div`
    font-weight: bold;
    font-size: large;
    &:hover {
        color: #63a4df;
        cursor: pointer;
    }

    padding: 10px;
`;

export const contentTap = styled.div`
    padding: 10px;
    font-size: large;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        color: #929292;
    }
`;

export const contentTapWrap = styled.div`
    flex: 5;
    padding: 20px;
`;

export const contentTapList = styled.div`
    display: flex;
`;

export const contentDetail = styled.div`
    height: 450px;
    // border: 0.2rem solid #c7c7c7;
    border-radius: 15px;
    padding: 10px;

    background-color: #e9f2ff;
`;

export const enterList = styled.div``;

export const profileInfo = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    margin: 10px;
`;

export const profileKey = styled.div`
    margin: 10px;
    flex: 1;
`;

export const profileDetail = styled.div`
    margin: 10px 30px;
    flex: 3;
`;

export const profileContent = styled.div`
    font-size: 18px;
    padding: 10px;
`;

export const vLine = styled.div`
    border-left: 0.15rem solid white;
    height: 110px;
`;
export const essayDetailWrap = styled.div`
    // margin: 10px;
    height: 450px;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 7px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background: #a6b6ce;
    }
    &::-webkit-scrollbar-track {
        background: #ededed;
        border-radius: 3px;
    }
`;

export const essayDetailEach = styled.div`
    margin: 10px 0 20px 0;
`;

export const essayDetailQuest = styled.div`
    font-size: 19px;
    font-weight: bold;
    margin: 10px;
`;

export const essayDetailContent = styled.div`
    font-size: 18px;
    margin: 10px;
    padding: 0 10px;

    border-radius: 10px;
    background-color: white;

    line-height: 1.5;
    padding: 5px;
`;

// 스터디 방 우측 섹션 - 사전 질문지 작성
export const questionWrap = styled.div`
    justify-content: center;
    padding: 20px;
    height: auto;
`;

export const questionIntro = styled.div`
    font-size: 20px;
    margin: 10px;
    font-weight: bold;
`;

export const questionListWrap = styled.div`
    height: 400px;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 7px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background: #a6b6ce;
    }
    &::-webkit-scrollbar-track {
        background: #ededed;
        border-radius: 3px;
    }
`;

export const questionEach = styled.div`
    margin: 15px 10px;
    font-size: 18px;
`;

export const questionSubmitWrap = styled.div`
    display: flex;
`;

export const questionInput = styled.input`
    margin: 10px;
    width: 100%;
    height: 40px;
    background: #e6e6e6;
    border: 0;
    // box-shadow: 0px 0px 5px #c7c7c7;
    border-radius: 10px;
`;

export const questionButton = styled.button`
    margin: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 0;

    position: relative;
    width: 70px;
    height: 40px;

    background: #a1b6ff;
    box-shadow: 0px 0px 5px #c7c7c7;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
        background-color: #e9e4ff;
    }
`;

// 스터디방 우측 섹션 - 내 자기소개서 확인하기
export const myEssayWrap = styled.div`
    justify-content: center;
    padding: 20px;
    height: 510px;
`;

export const myEssayIntro = styled.div`
    font-size: 20px;
    margin: 10px;
    font-weight: bold;
`;

export const myEssayContentWrap = styled.div`
    overflow-y: auto;
    max-height: 90%;
    &::-webkit-scrollbar {
        width: 7px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background: #a6b6ce;
    }
    &::-webkit-scrollbar-track {
        background: #ededed;
        border-radius: 3px;
    }
`;
export const essaySet = styled.div`
    margin-bottom: 25px;
`;

export const myQuestion = styled.div`
    margin: 15px 10px;
    font-size: 18px;
    font-weight: bold;
`;

export const myAnswer = styled.div`
    margin: 15px 10px;
    font-size: 18px;
    background-color: #e9f2ff;
    border-radius: 10px;
    line-height: 1.5;
    padding: 5px;
`;

// 면접 시작 ~

// 면접관의 화면

export const interviewerWrap = styled.div`
    display: flex;
    // width: 80vw;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    // margin: 0 100px;
    padding: 0 200px;
`;

export const videoSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

export const videoWrap = styled.div`
    max-width: 800px;
    flex: 1;
    height: 628px;
    // margin: 5px;
`;
export const mainContainer = styled.div`
    width: 100%;
    height: 400px;
    flex: 1;
`;

export const mainVideo = styled.div`
    background-color: white;
    border-radius: 13px;
    // width: 80%;
    height: 400px;
    // margin: 10px;
`;

export const lastVideos = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    // width: 80%;
    margin-top: 15px;
    // justify-content: space-between;
    &::-webkit-scrollbar {
        height: 7px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background: #a6b6ce;
    }
    &::-webkit-scrollbar-track {
        background: #ededed;
        border-radius: 3px;
    }
`;

export const lastVideoEach = styled.div`
    background-color: white;
    border-radius: 13px;

    padding: 15px;
    // margin: 0 15px;
    width: 280px;
    height: 120px;

    flex-shrink: 0;
`;

export const secondSection = styled.div`
    flex: 1;
`;

export const selectTapsWrap = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 15px;
`;

export const selectTapsHorizon = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const tapsInterviewer = styled.div`
    width: 70px;
    height: 40px;
    border: 0;
    border-radius: 100px;
    box-shadow: 0px 0px 10px #4e4e4e;

    font-weight: bold;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    margin: 0 10px;
    background-color: ${(props) =>
        props.menu === "info"
            ? "#FFBFBF"
            : props.menu === "quest"
            ? "#6A9CFD"
            : props.menu === "myInfo"
            ? "#AEE4FF"
            : "#FF95B9"};

    &:hover {
        color: #ffffff;
        cursor: pointer;
    }
`;

export const interviewerSectionWrap = styled.div`
    width: 80%;
    min-width: 400px;
    display: flex;
`;

// 스터디 종료 후 평점 부여 페이지? 컴포넌트? 모달?

export const ratingPage = styled.div`
    width: 300px;
    height: 500px;
    z-index: 999;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background: #ffffff;
    box-shadow: 0px 0px 15px #000000;
    border-radius: 37px;

    font-family: "HakgyoansimWoojuR";
`;

export const ratingWrap = styled.div`
    padding: 15px;
    text-align: center;
    height: 100%;
`;

export const ratingTitle = styled.div`
    font-weight: bold;
    font-size: large;
    margin: 15px 0 30px 0;
    text-align: center;
`;

export const ratingSection = styled.div`
    margin: 30px 0;
    height: 68%;
`;

export const ratingContent = styled.div`
    margin: 20px 20px;
    text-align: center;
`;

export const ratingButton = styled.button`
    width: 70px;
    height: 30px;
    border: 0;
    border-radius: 100px;
    box-shadow: 0px 0px 11px #afafaf;

    font-weight: bold;

    justify-content: center;
    align-items: center;

    cursor: pointer;

    margin: 0 0 15px 0;
    background-color: #a1e5fa;

    font-family: "HakgyoansimWoojuR";

    &:hover {
        background-color: #58c8eb;
    }
`;

export const ratingText = styled.div``;

export const ratingBackDrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 999;
`;

// 면접 시작

// 면접자의 화면

export const mainWrap = styled.div`
    position: relative;
    width: 100%;
    // height: 350px;
    // max-height: 80vh;
    overflow: auto;
    &::-webkit-scrollbar {
        width: 9px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background: #a6b6ce;
    }
    &::-webkit-scrollbar-track {
        // background: #ededed;
        border-radius: 3px;
    }
`;

export const vieweeWrap = styled.div`
    display: flex;
    // height: 20rem;
    justify-content: center;
    // align-items: center;

    margin: 50px 100px;
    position: relative;
    align-content: center;

    height: 100vh;
    max-height: 100%;
`;

export const boxes = styled.div`
    margin: 20px;
    width: 250px;
    height: 150px;
    background-color: white;
    box-shadow: 0px 0px 10px #4e4e4e;
    border-radius: 13px;

    padding: 15px;
`;

export const mainBox = styled.div`
    margin: 20px;
    width: 600px;
    height: 380px;
    background-color: white;
    box-shadow: 0px 0px 10px #4e4e4e;
    border-radius: 13px;

    padding: 15px;
`;

export const leftBox = styled.div`
    flex-shrink: 0;
    max-height: 80%;

    flex-direction: column;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 9px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background: #a6b6ce;
    }
    &::-webkit-scrollbar-track {
        // background: #ededed;
        border-radius: 3px;
    }
`;

// 피드백 작성하기

export const feedbackEach = styled.div``;

export const feedbackInput = styled.input`
    margin: 5px;
    width: 70%;
    height: 30px;
    background: #e6e6e6;
    border: 0;
    // box-shadow: 0px 0px 5px #c7c7c7;
    border-radius: 10px;
`;

export const feedbackButton = styled.button`
    margin: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 0;

    position: relative;
    width: 60px;
    height: 30px;

    background: #a1b6ff;
    box-shadow: 0px 0px 5px #c7c7c7;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
        background-color: #e9e4ff;
    }
`;

export const feedbackInputWrap = styled.div`
    display: flex;
`;
