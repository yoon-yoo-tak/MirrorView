import { styled } from "styled-components";

// 스터디 방 입장
// 입장 후 스터디 시작 전 준비 화면

export const preparePage = styled.div`
    font-family: "HakgyoansimWoojuR";
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

    background: #a1b6ff;
    // box-shadow: 0px 0px 10px #bdbdbd;
    border-radius: 19px;
    cursor: pointer;
    &:hover {
        background-color: #e9e4ff;
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
    font-weight: ${(props) => (props.isNickname ? "bold" : "normal")};
`;

// 스터디 방 우측 섹션
export const prepareSectionSecond = styled.div`
    width: 835px;
`;
export const sectionPage = styled.div``;

export const sectionWrap = styled.div`
    border-radius: 13px;
    background-color: white;
    margin: 18px;
    padding: 10px;

    height: 550px;
`;
export const sectionSelectTaps = styled.div`
    margin: 18px;
    display: flex;
    justify-content: space-between;
`;
export const sectionSelectTap = styled.div`
    width: 185px;
    height: 69px;
    border-radius: 13px;
    background-color: white;
`;
