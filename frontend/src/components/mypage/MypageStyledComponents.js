import styled, { keyframes } from "styled-components";

import pfImage from "../../assets/sidebar/🦆 icon _person outline_.png";
import pcImage from "../../assets/sidebar/🦆 icon _people outline_.png";
import fbImage from "../../assets/sidebar/🦆 icon _book open outline_.png";
import essayImage from "../../assets/sidebar/🦆 icon _file text outline_.png";
import defaultImage from "../../assets/defaultimage.png";
import updateIcon from "../../assets/pencil.png";
import writeIcon from "../../assets/writing.png";
import saveIcon from "../../assets/diskette.png";
import minusIcon from "../../assets/minut.png";
import plusIcon from "../../assets/plusicon.png";
import starrr from "../../assets/Twink.svg";
import cloudy from "../../assets/clouddddd.svg";
// 사이드바

export const sidebarWrap = styled.div`
  // background-image: url(${process.env.PUBLIC_URL}/sidebar-background.png);
  background-image: url(${cloudy});
  width: 280px;
  height: 855px;
  flex: 1;

  // padding-top: 60px;
`;

export const sideMenuWrap = styled.div`
  padding: 30px 0 0 20px;
`;

export const sideMenu = styled.div`
  height: 27px;
  display: flex;
  // align-items: left;
  justify-content: left;
  font-size: 18px;
  padding: 15px 5px;
  display: flex;
  align-items: center;
  border-radius: 30px 0 0 30px;
  font-family: "HakgyoansimWoojuR";
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
  font-size: 18px;
  font-weight: bold;
  padding: 15px 5px;
  align-items: center;
  background-color: white;
  border-radius: 30px 0 0 30px;
  font-family: "HakgyoansimWoojuR";
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
  padding-top: 60px;
`;

export const wrap = styled.div`
  // padding-top: 60px;
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
  min-height: 18px;
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

  background-color: #f4faff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  // border-radius: 15px;
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

export const writeBtn = styled.div`
  background-size: 50% auto;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${writeIcon});
  cursor: pointer;
  background-color: #a5b7f8;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0px 0px 15px #bdbdbd;
  margin: 10px 40px 10px 10px;
  &:hover {
    background-color: #ced9ff;
  }
`;
export const saveBtn = styled.div`
  background-size: 50% auto;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${saveIcon});
  cursor: pointer;
  background-color: #a5b7f8;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0px 0px 15px #bdbdbd;
  margin: 10px 40px 10px 10px;
  &:hover {
    background-color: #ced9ff;
  }
`;

export const addBtn = styled.div`
  background-size: 50% auto;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${plusIcon});
  cursor: pointer;
  background-color: #a5b7f8;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  box-shadow: 0px 0px 15px #bdbdbd;
  margin: 10px;
  &:hover {
    background-color: #ced9ff;
  }
`;
export const minusBtn = styled.div`
  background-size: 50% auto;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${minusIcon});
  cursor: pointer;
  background-color: #a5b7f8;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  box-shadow: 0px 0px 15px #bdbdbd;
  margin: 10px;
  &:hover {
    background-color: #ced9ff;
  }
`;

export const btnContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-right: 20px;
`;

export const createContainer = styled.div`
  display: flex;
  // flex-direction: row-reverse;
  margin-right: 20px;
  justify-content: space-between;
`;

export const essayFooter = styled.div`
  display: flex;
  justify-content: space-between;
  // padding: 10px;
  align-items: center;
`;

export const currentPageInfo = styled.div`
  padding: 7px;
  margin-left: 10px;
  font-size: 17px;
  font-weight: bold;
  background-color: #8894ff;
  border-radius: 20px;
  display: inline-block;
  color: white;
`;

export const btn = styled.button`
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 0;
  z-index: 100;
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
  margin-bottom: 20px;
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

// CreateEssay
export const essayCreateBox = styled.div`
  // position: relative;
  // top: 5px;
  // left: 0px;
  margin: 0px;
  padding: 15px;
  margin: 10px;
  border-radius: 10px;
  background-color: #e8f4ff;
  width: 1100px;
  // height: 530px;
`;

export const esaayCategory = styled.div`
  max-height: 200px;
  font-size: 16px;
  color: #333;
  padding: 10px;
`;

export const esaayQuestion = styled.div`
  max-height: 200px;
  padding: 10px;
`;

export const essayAnswer = styled.div`
  max-height: 800px;
  color: #333;
  padding: 10px;
  overflow-y: auto;
`;

export const RoundedTextareaQues = styled.textarea`
  font-size: 14px;
  padding: 15px;
  border-radius: 8px; // 모서리 둥글게
  border: 1px solid #ccc; // 테두리 추가
  // width: 1040px; // 가로 크기 지정
  height: 15px;
  resize: none; // 사용자가 크기를 조절하지 못하도록 함
  font-family: HakgyoansimWoojuR;
  width: ${(props) => (props.type === "title" ? "700px" : "1040px")};
`;

export const RoundedTextareaAns = styled.textarea`
  font-size: 16px;
  padding: 15px;
  border-radius: 8px; // 모서리 둥글게
  border: 1px solid #ccc; // 테두리 추가
  width: 1040px; // 가로 크기 지정
  height: 350px;
  resize: none; // 사용자가 크기를 조절하지 못하도록 함
  font-family: HakgyoansimWoojuR;
`;

//
export const EssayCreatePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const EssayFormContainer = styled.div`
  position: relative;
`;

export const PaginationContainer = styled.div`
  display: flex;
  // justify-content: center;
  // margin-top: 20px;
  // position: relative;
  // bottom: 20px; /* 하늘색 박스 위로 위치 조정 */
  // right: -10px;
  max-width: 510px;
  overflow: hidden;
`;

export const PaginationButton = styled.button`
  background-color: transparent;
  border: none;
  margin: 5px;
  cursor: pointer;
  font-size: 16px;
`;

export const ActivePaginationButton = styled(PaginationButton)`
  color: #a1b6ff;
`;

export const CircleNumber = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #a1b6ff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export const SaveButton = styled.button`
  padding: 10px 20px;
  font-size: 15px;
  background-color: #ffb8d0;
  color: black;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  font-family: wooju;

  &:hover {
    background-color: #40a9ff;
  }
`;

//EsaayList
export const essayListBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: #f4faff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  padding: 35px 30px;
  width: 400px;
  height: 70px;
  max-width: 2000px;
  top: -50px;
  left: 80px;

  .title {
    /* TITLE 스타일 조정 (좌측 상단) */
    position: absolute;
    top: 20px;
    left: 30px;
    font-family: HakgyoansimWoojuR;
    font-size: 28px;
    font-weight: bold;
  }

  .time {
    /* TIME 스타일 조정 (우측 하단) */
    position: absolute;
    bottom: 10px;
    right: 15px;
    font-family: HakgyoansimWoojuR;
    font-size: 20px;
  }
`;

export const essayListContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* 옆으로 나란하게 정렬하고 줄 바꿈 */
  gap: 60px; /* 박스 사이의 간격 조정 */
`;

export const EssayPaginationContainer = styled.div`
  position: relative;
  top: auto;
  bottom: 20px;
  left: 48.5%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  z-index: 2;

  ul.pagination {
    display: flex;
    list-style-type: none;

    li {
      margin: 0 10px;
      cursor: pointer;
    }

    li.active {
      font-size: 16px;
      font-family: "DAE";
      color: black;
    }
  }
`;

//Feedaback list page

export const feedbackContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* 옆으로 나란하게 정렬하고 줄 바꿈 */
  gap: 50px; /* 박스 사이의 간격 조정 */

  //
  /* position: relative;
    width: 100%;
    height: 100%;
    border: none; */
`;

export const feebacklistbox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  border: 0.5px solid gray;
  border-radius: 15px;
  padding: 35px 30px;
  width: 100px;
  height: 180px;
  max-width: 2000px;
  top: -30px;
  left: 55px;

  .roomname {
    /* TITLE 스타일 조정 (좌측 상단) */
    position: absolute;
    font-family: HakgyoansimWoojuR;
    font-size: 20px;
    justify-content: center;
    top: 15%;
    transform: translate(-10%, -50%);
    white-space: nowrap;
    text-overflow: ellipsis; /* 10글자 이상이면 ...으로 표시 */
    overflow: hidden;
    max-width: 7em; /* 최대 10글자까지 표시 */
  }

  .time {
    /* TIME 스타일 조정 (우측 하단) */
    position: absolute;
    bottom: 10px;
    right: 15px;
    font-family: HakgyoansimWoojuR;
    font-size: 20px;
  }
  .people {
    /* TIME 스타일 조정 (우측 하단) */
    position: absolute;
    bottom: 30px;
    right: 15px;
    font-family: HakgyoansimWoojuR;
    font-size: 20px;
  }
`;

export const FeedbackPaginationContainer = styled.div`
  position: relative;
  top: 100%;
  left: 47%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  z-index: 2;

  ul.pagination {
    display: flex;
    list-style-type: none;

    li {
      margin: 0 10px;
      cursor: pointer;
    }

    li.active {
      font-size: 16px;
      font-family: "DAE";
      color: black;
    }
  }
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명한 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  height: 500px;
  width: 800px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

export const Modal = ({ children, onClose }) => {
  const handleWrapperClick = (e) => {
    // 모달 내용 클릭 시 모달이 닫히지 않도록 확인
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalWrapper onClick={handleWrapperClick}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalWrapper>
  );
};

//Sign up
export const SignupCreateBox = styled.div`
  position: relative;
  top: 0px;
  left: 0px;
  margin: 10px;
  padding: 15px;
  margin: 10px;
  border-radius: 10px;
  background-color: rgb(242, 247, 255, 1);
  width: 1470px;
  height: 700px;

  .input {
    width: 25%; /* 혹은 다른 원하는 크기로 조정 */
    /* ... (나머지 스타일 속성들) */
  }
`;

export const InputField = styled.div`
  border-radius: 10px;
  padding: 10px;
  margin-left: 500px;
  display: flex;
  flex-direction: column;
  gap: 15px; /* 입력란 간격을 조정합니다. */
  font-family: HakgyoansimWoojuR;
  font-weight: bold;

  .inputTitle {
    margin-left: 5px;
  }

  .inputWrap {
    display: flex;
    flex-direction: column;
  }

  .input {
    width: 50%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .errorMessageWrap {
    color: red;
    margin-top: 1px;
    margin-left: 5px;
  }
`;

export const VerificationField = styled.div`
  display: flex;
  align-items: center;

  .verificationLabel {
    width: 0%;
    padding: 5px;
    /* font-weight: bold; */
  }

  .verificationInputWrap {
    width: 65%;
    padding: 5px;
  }

  .verificationInput {
    width: 15%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

export const CheckBtn = styled.button`
  font-family: HakgyoansimWoojuR;
  font-size: 16px;
  margin: 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 0px;
  border-radius: 15px;
  width: 80px;
  height: 35px;
`;

export const withdrawal = styled.div`
  cursor: pointer;
  margin-top: 300px;
`;

export const hr = styled.h2`
  position: relative;
  width: 750px;
  display: block;
  unicode-bidi: isolate;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  margin-inline-start: auto;
  margin-inline-end: auto;
  overflow: hidden;
  border-style: inset;
  border-width: 1.5px;
`;

export const modalScrollContent = styled.div`
  max-height: 95%;
  overflow: auto;
  padding: 10px; /* 내용 주변 여백 조정 */
`;
