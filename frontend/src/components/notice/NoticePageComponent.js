import { styled } from "styled-components";

import SendIcon from "@material-ui/icons/Send";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
`;

export const Image = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
  margin: 0;
  padding: 0;
  display: flex;
`;

export const Title = styled.h2`
  position: absolute;
  top: 15%;
  left: 15%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
  color: #033495;
  font-size: 32px;
  font-family: "DAE";
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

export const PaginationContainer = styled.div`
  position: absolute;
  top: 81%;
  left: 50%;
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
      font-weight: bold;
      font-size: 24px;
      font-family: "DAE";
      color: #6a9cfd;
    }
  }
`;

export const TableWrapper = styled.div`
  table {
    position: absolute;
    top: 25%;
    left: 10%;
    width: 80%;
    border-collapse: collapse;
    margin-bottom: 10px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);

    
    th {
      padding: 20px;
      text-align: center;
      border-bottom: none;
      font-weight: bold; /* 헤더 셀 글자를 굵게 표시 */
    }

    td {
      padding: 20px;
      text-align: center;
      border-bottom: 0.01rem solid gray;
    }

    tr:hover td {
        background-color: rgba(255, 184, 208, 0.3);
    }
  }
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  top: 18%; 
  left: 85%;
  transform: translateX(-50%);

`;

export const Button = styled.button`;
  <el-button type="primary" icon="el-icon-edit"></el-button>
  
`