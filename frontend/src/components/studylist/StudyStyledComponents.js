import { styled } from "styled-components";

import plusIcon from "../../assets/studylist/plus.png";

export const hidden = styled.div`
    visibility: hidden;
`;

export const page = styled.div`
    background-image: url(${process.env.PUBLIC_URL}/background2.png);
    background-size: cover;
    width: auto;
    height: 855px;
    justify-content: center;
    display: flex;
    font-family: "HakgyoansimWoojuR";
`;

export const studylistContainer = styled.div`
    padding-top: 50px;
    width: 63rem;
    flex-direction: column;
    position: relative;
`;

export const studylistTop = styled.div`
    // position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
`;

export const studyNowText = styled.div`
    margin-left: 100px;
    display: flex;
    padding: 5px;
    font-weight: bold;
    font-size: large;
`;

export const studylistMain = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: row;
`;

// StudyRoomCategory

export const categoryPage = styled.div`
    width: 30rem;
    height: 3rem;
    background-color: white;
    box-shadow: 0px 0px 10px #bdbdbd;
    border-radius: 10px;
    margin-right: 100px;
    padding: 5px 10px;
`;

export const categoryWrap = styled.div`
    display: flex;
    align-items: center;
`;

export const categoryList = styled.div`
    display: flex;
    align-items: center;
    flex: 3;
    justify-content: space-evenly;
`;
export const categoryDiv = styled.div`
    display: flex;
    align-items: center;
    display: grid;
`;
export const categorySelect = styled.select`
    margin: 5px 0 5px 0;
    width: 10rem;
    height: 20px;
    background: white;
    border: 0;
    border-radius: 10px;

    padding: 1px 2px;
`;

export const categoryButton = styled.button`
    margin: 3px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 0;

    position: relative;
    width: 50px;
    height: 30px;

    background: lightblue;
    box-shadow: 0px 0px 10px #bdbdbd;
    border-radius: 13px;
    cursor: pointer;
    &:hover {
        background-color: gray;
    }
`;

// 방 생성 버튼

export const createRoomButton = styled.button`
    background-image: url(${plusIcon});
    background-size: 50% auto;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #ffadba;
    position: fixed;
    right: 100px;
    bottom: 100px;
    width: 60px;
    height: 60px;

    padding: 10px;
    margin: 3px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 0;

    // background: #a1b6ff;
    box-shadow: 0px 0px 10px #bdbdbd;
    border-radius: 100px;
    cursor: pointer;
    &:hover {
        background-color: #ff6980;
    }
`;

// StudyRoomThumbnail

export const thumbnailPage = styled.div`
    width: 17rem;
    height: 6rem;
    background-color: white;
    box-shadow: 0px 0px 10px #bdbdbd;
    border-radius: 10px;
    margin: 10px;
    padding: 15px;
    align-content: space-between;
    display: grid;
`;
export const titleAndHost = styled.div``;
export const personAndButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
export const enterButtonDiv = styled.div`
    float: right;
    display: flex;
`;

export const enterButton = styled.button`
    margin: 3px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 0;

    position: relative;
    width: 70px;
    height: 30px;

    background: #a1b6ff;
    box-shadow: 0px 0px 10px #bdbdbd;
    border-radius: 19px;
    cursor: pointer;
    &:hover {
        background-color: #e9e4ff;
    }
`;

export const modalContainer = styled.div`
    width: 700px;
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
`;

export const modalButton = styled.button`
    position: absolute;
    right: 20px;
    top: 20px;
    border: 0;

    margin: 5px;

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
    padding: 30px 50px;
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

export const modalTitle = styled.div`
    font-weight: bold;
    font-size: large;
    margin: 15px 0;
`;

export const modalInputForm = styled.div`
    margin-top: 20px;
`;
export const modalInputList = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
`;

export const modalInputText = styled.input`
    margin: 5px 0 5px 0;
    width: 18rem;
    height: 40px;
    background: #e6e6e6;
    border: 0;
    border-radius: 10px;
    padding: 0;
`;

export const modalInputDropDown = styled.div``;

export const modalOpenLabel = styled.label`
    margin-right: 15px;
`;

export const modalOpenRadio = styled.input`
    accent-color: black;
`;

export const modalCategory = styled.select`
    margin: 5px 0 5px 0;
    width: 18rem;
    height: 40px;
    background: #e6e6e6;
    border: 0;
    border-radius: 10px;

    padding: 1px 2px;
`;

export const createCompleteButton = styled.button`
    margin: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 0;

    // position: relative;

    position: absolute;
    right: 20px;
    bottom: 20px;

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
