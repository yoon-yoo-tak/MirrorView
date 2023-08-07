// MyEssay.js
import Sidebar from "../MypageSidebarPage";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EssayComponent from "../../../components/mypage/EssayComponent";
import * as S from "../../../components/mypage/MypageStyledComponents";
import example from "./example";
import axios from "axios";
import ReactPaginate from "react-paginate";

const MyEssay = () => {
    const navigate = useNavigate();

    const essayCreate = async (e) => {
        e.preventDefault();
        navigate("/mypage/essaycreate");
    };

    const handleEssayDetail = (id) => {
        navigate(`/essaydetail/${id}`);
    };

    const nickname = useSelector((state) => state.auth.nickname);

    const itemsPerPage = 6; // 페이지당 피드백 개수를 지정합니다.
    const [currentPage, setCurrentPage] = useState(1);

    // 전체 페이지 수를 계산
    const totalPages = Math.ceil(example.length / itemsPerPage);

    // 현재 페이지에 해당하는 피드백 데이터를 가져옵니다.
    const currentEssays = example.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // 페이지를 변경하는 함수를 정의합니다.
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 이전 페이지로 이동하는 함수를 정의합니다.
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // 다음 페이지로 이동하는 함수를 정의합니다.
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div>
            <S.page>
                <Sidebar menu="essay" />
                <S.wrap>
                    <h2>자기소개서 관리</h2>
                    <hr />
                    <div>
                        <S.btn
                            theme="create"
                            onClick={essayCreate}
                            style={{
                                position: "relative",
                                top: "15px",
                                left: "970px",
                                backgroundColor: "#a1b6ff",
                            }}
                        >
                            {" "}
                            작성하기{" "}
                        </S.btn>
                        <EssayComponent />
                        <div className="essayBox">
                            <div className="essayList">
                                <S.essayListContainer>
                                    {currentEssays.map((example) => (
                                        <S.essayListBox
                                            key={example.id}
                                            onClick={() =>
                                                handleEssayDetail(example.id)
                                            }
                                        >
                                            <tr>
                                                <td className="title">
                                                    {example.title}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="time">
                                                    작성일시 : {example.time}
                                                </td>
                                            </tr>
                                        </S.essayListBox>
                                    ))}
                                </S.essayListContainer>
                                <S.EssayPaginationContainer>
                                    <ul className="pagination">
                                        <li
                                            className={
                                                currentPage === 1
                                                    ? "disabled"
                                                    : ""
                                            }
                                            onClick={handlePrevPage}
                                        >
                                            {"이전"}
                                        </li>
                                        {Array.from(
                                            { length: totalPages },
                                            (_, index) => (
                                                <li
                                                    key={index + 1}
                                                    className={
                                                        index + 1 ===
                                                        currentPage
                                                            ? "active"
                                                            : ""
                                                    }
                                                    onClick={() =>
                                                        handlePageChange(
                                                            index + 1
                                                        )
                                                    }
                                                >
                                                    {index + 1}
                                                </li>
                                            )
                                        )}
                                        <li
                                            className={
                                                currentPage === totalPages
                                                    ? "disabled"
                                                    : ""
                                            }
                                            onClick={handleNextPage}
                                        >
                                            {"다음"}
                                        </li>
                                    </ul>
                                </S.EssayPaginationContainer>
                            </div>
                        </div>
                    </div>
                </S.wrap>
            </S.page>
        </div>
    );
};

export default MyEssay;
