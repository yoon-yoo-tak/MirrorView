import { styled } from "styled-components";

// 스터디 방 입장
// 입장 후 스터디 시작 전 준비 화면

export const page = styled.div`
    font-family: "HakgyoansimWoojuR";
    min-height: 100vh;
    display: flex;
    justify-content: center;
    background: rgb(29, 22, 60);
    background: linear-gradient(
        153deg,
        rgba(29, 22, 60, 1) 0%,
        rgba(28, 27, 55, 1) 36%,
        rgba(29, 34, 70, 1) 68%,
        rgba(27, 42, 66, 1) 100%
    );
    padding-top: 20px;
`;

// 스터디방 좌측 섹션

// 준비 상태 확인용

export const prepareWrap = styled.div`
    display: flex;
    justify-content: center;
`;

export const prepareSectionFirst = styled.div`
    width: 365px;
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

export const readyButton = styled.button`
    margin: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 0;

    position: relative;
    width: 70px;
    height: 30px;

    background: ${(props) => (!props.status ? "#FF6980" : "#D4D4D4")};
    // box-shadow: 0px 0px 10px #bdbdbd;
    border-radius: 19px;
    cursor: pointer;
    color: white;
    &:hover {
        background-color: ${(props) => (!props.status ? "#FFD0D7" : "#D4D4D4")};
    }
`;

// 추후 openvidu 연결
export const myVideo = styled.div`
    width: 335px;
    height: 200px;
    background-color: white;
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
    margin: 20px 0;
`;

export const selectChild = styled.div`
    border-radius: ${(props) =>
        props.now === "wee" ? "13px 13px 0 0" : "0 0 13px 13px"};
    margin: 3px 0;
    width: 335px;
    height: 150px;
    background-color: white;
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
    font-weight: ${(props) => (props.checkname ? "bold" : "normal")};
`;

// 스터디 방 우측 섹션
export const prepareSectionSecond = styled.div`
    width: 835px;
`;
export const sectionPage = styled.div`
    width: auto;
`;

export const sectionWrap = styled.div`
    border-radius: 13px;
    background-color: white;
    margin: 18px;
    padding: 10px;
    width: auto;
    height: 550px;
`;
export const sectionSelectTaps = styled.div`
    margin: 18px;
    display: flex;
    justify-content: space-between;
`;
export const sectionSelectTap = styled.button`
    width: 185px;
    border: 0;
    height: 69px;
    border-radius: 13px;
    background-color: ${(props) =>
        props.menu === "info"
            ? "#FFBFBF"
            : props.menu === "quest"
            ? "#6A9CFD"
            : props.menu === "myInfo"
            ? "#AEE4FF"
            : "#FF95B9"};
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
`;

export const contentTapWrap = styled.div`
    flex: 4;
    padding: 20px;
`;

export const contentTapList = styled.div`
    display: flex;
`;

export const contentDetail = styled.div`
    height: 450px;
    border: 0.2rem solid #c7c7c7;
    border-radius: 15px;
    padding: 10px;
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
    border-left: 0.15rem solid #c7c7c7;
    height: 110px;
`;
export const essayDetailWrap = styled.div`
    margin: 10px;
    height: 425px;
    overflow-y: auto;
`;

export const essayDetailEach = styled.div`
    margin: 10px 0 15px 0;
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
    height: auto;
`;

export const myEssayIntro = styled.div`
    font-size: 20px;
    margin: 10px;
    font-weight: bold;
`;

export const myEssayContentWrap = styled.div``;

export const myQuestion = styled.div`
    margin: 15px 10px;
    font-size: 18px;
    font-weight: bold;
`;

export const myAnswer = styled.div`
    margin: 15px 10px;
    font-size: 18px;
`;
