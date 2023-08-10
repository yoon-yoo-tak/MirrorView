import React, { useState, useRef, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import * as S from "../../pages/adminpage/AdminComponent";
import { useSelector } from "react-redux";
import { admindata } from "./admindata";
import styled from "styled-components";

const AdminManagePage = () => {
    const perPage = 7;
    const paginationPos = 30 + perPage;
    const [currentPage, setCurrentPage] = useState(0);
    const { user } = useSelector((state) => state.auth);
    const totalPages = Math.ceil(admindata.length / perPage);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const paginatedData = admindata.slice(
        currentPage * perPage,
        (currentPage + 1) * perPage
    );

    const [selectedContent, setSelectedContent] = useState(null);

    const handleContentClick = (content) => {
        setSelectedContent(content);
    };

    const handleModalClose = () => {
        setSelectedContent(null);
    };

    const handleModalBackgroundClick = (event) => {
        if (event.target === event.currentTarget) {
            handleModalClose();
        }
    };

    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const container = scrollContainerRef.current;
        const modalContainer = document.querySelector(".modalContainer"); // 모달 컨테이너 선택

        if (container && modalContainer) {
            if (
                selectedContent &&
                container.scrollHeight >= modalContainer.clientHeight
            ) {
                console.log(
                    container.scrollHeight,
                    modalContainer.clientHeight
                );
                container.style.overflow = "auto";
            } else {
                container.style.overflow = "hidden";
            }
        }
    }, [selectedContent]);

    return (
        <S.Container>
            <S.Image
                src="/bground.png"
                alt="main_bg"
                onClick={handleModalBackgroundClick}
            />
            <S.TableWrapper>
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: "30%" }}>유저ID</th>
                            <th>신고 횟수</th>
                            <th style={{ width: "50%" }}>내용</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((admindata1) => (
                            <tr key={admindata1.id}>
                                <td>{admindata1.userid}</td>
                                <td>{admindata1.count}</td>
                                <td style={{ width: "50%", cursor: "pointer" }}>
                                    <div
                                        onClick={() =>
                                            handleContentClick(
                                                admindata1.content
                                            )
                                        }
                                    >
                                        {admindata1.content.length > 30
                                            ? admindata1.content.substring(
                                                  0,
                                                  30
                                              ) + "..."
                                            : admindata1.content}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    {selectedContent && (
                        <S.modalContainer className="modalContainer">
                            <S.modalScrollContent ref={scrollContainerRef}>
                                <S.modalContent
                                    style={{
                                        top: "20px",
                                        left: "0px",
                                        fontSize: "18px",
                                        color: "black",
                                        fontFamily: "Imcre",
                                        whiteSpace: "pre-line",
                                        lineHeight: "2",
                                    }}
                                >
                                    <S.modalButton
                                        style={{
                                            top: "0px",
                                            right: "15px",
                                            backgroundColor: "#E3F1F8",
                                        }}
                                        onClick={handleModalClose}
                                    >
                                        닫기
                                    </S.modalButton>
                                    <S.modalButton
                                        style={{ top: "0px", left: "30px" }}
                                        onClick={handleModalClose}
                                    >
                                        정지
                                    </S.modalButton>
                                    {selectedContent}
                                </S.modalContent>
                            </S.modalScrollContent>
                        </S.modalContainer>
                    )}
                    <S.PaginationContainer
                        style={{ top: "", left: paginationPos + "%" }}
                    >
                        <ReactPaginate
                            previousLabel={"이전"}
                            nextLabel={"다음"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={totalPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageChange}
                            containerClassName={"pagination"}
                            activeClassName={"active"}
                        />
                    </S.PaginationContainer>
                </table>
            </S.TableWrapper>
        </S.Container>
    );
};

export default AdminManagePage;
