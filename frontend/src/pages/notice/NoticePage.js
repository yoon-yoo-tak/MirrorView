import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import data from "./Data";

import Header from "../../components/common/HeaderComponent";
import Footer from "../../components/common/FooterComponent";

import * as S from "../../components/notice/NoticePageComponent";
import { useSelector } from "react-redux";
import useUpdateEffect from "lib/UseUpdateEffect";
import axios from "axios";

const NoticePage = () => {
    const perPage = 5; // 한 페이지에 보여줄 데이터 개수
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호 상태(state)
    const { user } = useSelector((state) => state.auth);
    const [notice, setNotice] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        axios
            .get(`/api/board?size=${perPage}&page=${currentPage}`)
            .then(({ data }) => {
                console.log(data.data);
                setNotice(data.data.content);
                setTotalPages(data.data.totalPages);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [currentPage]);

    // 페이지 변경 시 처리할 함수
    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    // 현재 페이지에 해당하는 데이터 슬라이싱
    const paginatedData = data.slice(
        currentPage * perPage,
        (currentPage + 1) * perPage
    );

    // 총 페이지 수 계산

    return (
        <div>
            <Header />

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
                        pageCount={totalPages} // 총 페이지 수 동적으로 설정
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
                            {notice.map((data) => (
                                <tr key={data.id}>
                                    <td>{data.id}</td>
                                    <td>
                                        <Link to={`/noticedetail/${data.id}`}>
                                            {data.title}
                                        </Link>
                                    </td>
                                    <td>{data.createdTime.substring(0, 10)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {user && user.roles == "ADMIN" ? (
                        <>
                            <S.ButtonWrapper>
                                <Link to="/NoticeWritePage">
                                    <S.Button>작 성</S.Button>
                                </Link>
                            </S.ButtonWrapper>
                        </>
                    ) : (
                        <></>
                    )}
                </S.TableWrapper>
            </S.Container>
            <Footer />
        </div>
    );
};

export default NoticePage;
