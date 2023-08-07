import { useSelector } from "react-redux";
import { useState } from "react";
import Sidebar from "../MypageSidebarPage";
import FeedbackComponent from "../../../components/mypage/FeedbackComponent";
import * as S from "../../../components/mypage/MypageStyledComponents";
import feedbackdata from "./feedbackdata";
import ReactPaginate from "react-paginate";

const Feedback = () => {
    const nickname = useSelector((state) => state.auth.nickname);

    const itemsPerPage = 10; // 페이지당 피드백 개수를 지정합니다.
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false); // 모달을 열고 닫을 상태(state) 변수

    // 전체 페이지 수를 계산
    const totalPages = Math.ceil(feedbackdata.length / itemsPerPage);

    // 현재 페이지에 해당하는 피드백 데이터를 가져옵니다.
    const currentFeedbacks = feedbackdata.slice(
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

    // 모달 열기 함수를 정의합니다.
    const openModal = () => {
        setShowModal(true);
    };

    // 모달 닫기 함수를 정의합니다.
    const closeModal = () => {
        setShowModal(false);
    };
    return (
        <div>
            <S.page>
                <Sidebar menu="feedback" />
                <S.wrap>
                    <h2>{nickname}님의 아카이브</h2>
                    <hr />
                    <div>
                        <div>{nickname}님에게 전달된 피드백들이에요!</div>
                        <FeedbackComponent />

                        {/* 공간 */}
                        <S.feedbackContainer>
                            {currentFeedbacks.map((feedbackdata) => (
                                // 피드백 리스트를 클릭하면 모달을 열도록 설정
                                <S.feebacklistbox
                                    key={feedbackdata.id}
                                    onClick={() => openModal()}
                                >
                                    <tr>
                                        <td className="roomname">
                                            {feedbackdata.roomname}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time">
                                            {feedbackdata.time}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="people">
                                            {feedbackdata.people}
                                        </td>
                                    </tr>
                                </S.feebacklistbox>
                            ))}
                        </S.feedbackContainer>
                        <S.FeedbackPaginationContainer>
                            <ul className="pagination">
                                <li
                                    className={
                                        currentPage === 1 ? "disabled" : ""
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
                                                index + 1 === currentPage
                                                    ? "active"
                                                    : ""
                                            }
                                            onClick={() =>
                                                handlePageChange(index + 1)
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
                        </S.FeedbackPaginationContainer>
                    </div>
                </S.wrap>
            </S.page>
            {/* 모달 컴포넌트 */}
            {showModal && (
                <S.Modal onClose={() => closeModal()}>
                    {/* 모달 내용 */}
                    <div>
                        <h3>{nickname}님의 아카이브</h3>
                        <p>모달 내용을 입력하세요7.</p>
                        <button
                            onClick={() => closeModal()}
                            style={{
                                position: "relative",
                                top: "360px",
                                left: "680px",
                                backgroundColor: "#a1b6ff",
                            }}
                        >
                            닫기
                        </button>
                    </div>
                </S.Modal>
            )}
        </div>
    );
};

export default Feedback;
