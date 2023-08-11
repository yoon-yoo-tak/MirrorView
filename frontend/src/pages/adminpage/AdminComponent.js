import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    border: none;
    /* overflow-x: hidden;
    overflow-y: hidden; */
`;

export const Image = styled.img`
    width: 100%;
    height: 100vh;
    object-fit: cover;
    margin: 0;
    padding: 0;
    display: flex;
`;

export const Noticebox = styled.div`
    position: absolute;
    top: 10%;
    left: 7.5%;
    width: 85%;
    height: 80vh;
    border: 0px solid gray;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
`;

export const TableWrapper = styled.div`
    table {
        position: absolute;
        top: 130px;
        left: 185px;
        width: 1200px;
        height: flex; /* 최대 높이 지정 */
        border-collapse: collapse;
        margin-bottom: 10px;
        border-radius: 10px;
        /* overflow: scroll; */
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
        background-color: white;

        th {
            padding: 20px;
            text-align: center;
            border-bottom: none;
            font-weight: bold; /* 헤더 셀 글자를 굵게 표시 */
            font-family: "DAE";
        }

        td {
            padding: 20px;
            text-align: center;
            border-bottom: 0.01rem solid gray;
            font-family: "TheJamsil5Bold";
            min-height: 2px;
        }

        tr:hover td {
            background-color: rgba(255, 184, 208, 0.3);
        }
    }
`;

export const ModalTableWrapper = styled.div`
    table {
        position: absolute;
        top: 130px;
        left: 185px;
        width: 1200px;
        height: flex; /* 최대 높이 지정 */
        border-collapse: collapse;
        margin-bottom: 10px;
        border-radius: 10px;
        /* overflow: scroll; */
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
        background-color: white;

        th {
            padding: 20px;
            text-align: center;
            border-bottom: none;
            font-weight: bold; /* 헤더 셀 글자를 굵게 표시 */
            font-family: "DAE";
        }

        td {
            padding: 10px;
            text-align: center;
            border-bottom: 0.01rem solid gray;
            font-family: "TheJamsil5Bold";
            min-height: 2px;
        }
    }
`;

export const PaginationContainer = styled.div`
    position: absolute;
    /* top: 10%;
    left: 50%;
    transform: translateX(-50%); */
    bottom: 0%;
    left: 42%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;

    ul.pagination {
        display: flex;
        list-style-type: none;

        li {
            margin: 0 10px;
            cursor: pointer;
            font-size: 18px;
            font-family: "Imcre";
            color: gray;
        }

        li.active {
            font-weight: bold;
            font-size: 18px;
            font-family: "Imcre";
            color: black;
            empty-cells: hide;
        }
        a {
        }
    }
`;

//modal
export const modalBackDrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 999;
`;

export const modalContainer = styled.div`
    /* 모달창 크기 */
    width: 800px;
    height: 600px;
    z-index: 999;
    position: absolute;
    top: 400px;
    left: 780px;
    transform: translate(-50%, -40%);

    /* 모달창 디자인 */
    background: #ffffff;
    box-shadow: 0px 0px 5px #000000;
    border-radius: 15px;
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
    z-index: 10;
    // position: relative;
    width: 50px;
    height: 30px;

    background: #fe8a8a;
    box-shadow: 0px 0px 5px #bdbdbd;
    border-radius: 19px;
    cursor: pointer;
    &:hover {
        background-color: #ffe8e8;
    }
`;

export const modalScrollContent = styled.div`
    max-height: 95%;
    overflow: auto;
    padding: 10px; /* 내용 주변 여백 조정 */
`;

export const modalContent = styled.div`
    position: relative;
    padding: 50px;
`;
