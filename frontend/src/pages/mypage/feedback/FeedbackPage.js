import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Sidebar from "../MypageSidebarPage";
import FeedbackComponent from "../../../components/mypage/FeedbackComponent";
import * as S from "../../../components/mypage/MypageStyledComponents";
import feedbackdata from "./feedbackdata";
import ReactPaginate from "react-paginate";
import FeedbackModal from "components/mypage/FeedbackModalComponent";
import axios from "axios";

const Feedback = () => {
    const { user } = useSelector((state) => state.auth);

    const perPage = 10; // 페이지당 피드백 개수를 지정합니다.
    const [currentPage, setCurrentPage] = useState(1);
    const [feedbackList, setFeedbackList] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false); // 모달을 열고 닫을 상태(state) 변수

    useEffect(() => {
        axios
            .get(
                `/api/mypage/feedbacks?size=${perPage}&page=${currentPage - 1}`
            )
            .then(({ data }) => {
                console.log(data.data.content);
                setFeedbackList(data.data.content);
                setTotalPages(data.data.totalPages);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [currentPage]);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };
    // 전체 페이지 수를 계산

    // 현재 페이지에 해당하는 피드백 데이터를 가져옵니다.
    // 페이지를 변경하는 함수를 정의합니다.

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
    const openModal = (index) => {
        const newModalStates = modalStates.map((state, idx) => {
            console.log(state);
            return idx === index ? true : state;
        });
        setModalStates(newModalStates);
    };
    const [modalStates, setModalStates] = useState(
        feedbackList.map(() => false)
    );

    const handleModalClose = (index) => {
        const newModalStates = modalStates.map((state, idx) =>
            idx === index ? false : state
        );
        setModalStates(newModalStates);
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
                    <h2>{user.nickname}님의 아카이브</h2>
                    <hr />
                    <div>
                        <div>{user.nickname}님에게 전달된 피드백들이에요!</div>
                        <FeedbackComponent feedbackList={feedbackList} />

                        {/* 공간 */}
                        {/* <S.feedbackContainer>
                            {feedbackList.map((feedback,index) => (
                                // 피드백 리스트를 클릭하면 모달을 열도록 설정
                                <S.feebacklistbox
                                    key={index}
                                    onClick={() => openModal(index)}
                                >
                                    <tr>
                                        <td className="roomname">
                                            {feedback.roomTitle}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time">
                                            {feedback.createdTime}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="people">
                                            {feedback.}
                                        </td>
                                    </tr>
                                    {modalStates[index] && (
                                    <FeedbackModal
                                        item={feedbackdata}
                                        setModalStates={() => handleModalClose(index)}
                            />
                        )}
                                </S.feebacklistbox>
                            ))}
                        </S.feedbackContainer> */}

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
                        <h3>{user.nickname}님의 아카이브</h3>
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
