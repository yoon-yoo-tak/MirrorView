import React from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";

const Notice = () => {
  // 페이지 변경 시 처리할 함수
  const handlePageChange = (selectedPage) => {
    // 페이지 변경에 대한 로직을 구현해야함.
    console.log("Selected Page:", selectedPage.selected + 1);
  };

  // 일단 가상 데이터임
  const posts = [
    { id: 1, title: "밀어뷰 23.3.01", date: "2023-05-03" },
    { id: 2, title: "밀어뷰 23.3.02", date: "2023-06-09" },
    { id: 3, title: "긴급 공지", date: "2023-06-21" },
    { id: 4, title: "밀어뷰 23.3.03ver", date: "2023-07-11" },
    {
      id: 5,
      title: "그동안 밀어뷰를 사랑해주셔서 감사합니다.",
      date: "2023-07-26",
    },
    // ...더 많은 게시글 데이터 추가
  ];

  return (
    <Container>
      <Image src="/bground.png" alt="main_bg" />
      <Noticebox>{/* 공지사항 내용 */}</Noticebox>
      <Title>공지사항</Title>

      <PaginationContainer>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={7} // 총 페이지 수
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </PaginationContainer>
      <TableWrapper>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
`;

const Image = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
  margin: 0;
  padding: 0;
`;

const Title = styled.h2`
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

const Noticebox = styled.div`
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

const PaginationContainer = styled.div`
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

const TableWrapper = styled.div`
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

export default Notice;
