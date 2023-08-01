import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import data from "./Data";

import * as S from "../../components/notice/NoticePageComponent";

const NoticePage = () => {
  const perPage = 5; // 한 페이지에 보여줄 데이터 개수
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호 상태(state)

  // 페이지 변경 시 처리할 함수
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // 현재 페이지에 해당하는 데이터 슬라이싱
  const paginatedData = data.slice(currentPage * perPage, (currentPage + 1) * perPage);

  // 총 페이지 수 계산
  const pageCount = Math.ceil(data.length / perPage);

  return (
    <S.Container>

      <S.Image src="/bground.png" alt="main_bg" />
      <S.Noticebox>{/* 공지사항 내용 */}</S.Noticebox>
      <S.Title>공지사항</S.Title>

      <S.PaginationContainer>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount} // 총 페이지 수 동적으로 설정
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />

      </S.PaginationContainer>

      <S.TableWrapper>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
          {paginatedData.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>
                  <Link to={`/noticedetail/${data.id}`}>{data.title}</Link>
                </td>
                <td>{data.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <S.ButtonWrapper>
          <Link to="/NoticeWritePage">
            <S.Button>글 작성</S.Button>
          </Link>
      </S.ButtonWrapper>
      </S.TableWrapper>
    </S.Container>
  );
};

export default NoticePage;
