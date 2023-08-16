import * as S from "../../components/studylist/StudyStyledComponents";
import StudyRoomCategory from "../../components/studylist/StudyRoomCategoryComponent";
import StudyRoomThumbnail from "../../components/studylist/StudyRoomThumbnailComponent";
import StudyRoomCreateModal from "../../components/studylist/StudyRoomCreateModalComponent";
import { useEffect, useState } from "react";
import useUpdateEffect from "../../lib/UseUpdateEffect";
import { useDispatch, useSelector } from "react-redux";
import { getInterviewRoom } from "../../store/InterviewStore";
import { useNavigate } from "react-router-dom";

import Header from "../../components/common/HeaderComponent";
import Footer from "../../components/common/FooterComponent";

import Swal from "sweetalert2";
import AWN from "awesome-notifications";
import "awesome-notifications/dist/style.css";

const StudyRoomList = () => {
    // 데이터
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { room } = useSelector((state) => state.interview);
    const { user } = useSelector((state) => state.auth);
    useEffect(() => {
        dispatch(getInterviewRoom());
    }, []);

    const roomInfo = [
        {
            id: 1,
            title: "방 제목이지롱 1",
            host: "김싸피",
            maxPerson: 6,
            nowPerson: 3,
        },
        {
            id: 2,
            title: "방 제목이지롱 2",
            host: "박싸피",
            maxPerson: 5,
            nowPerson: 4,
        },
        {
            id: 3,
            title: "방 제목이지롱 3",
            host: "윤해밍",
            maxPerson: 4,
            nowPerson: 3,
        },
        {
            id: 4,
            title: "방 제목이지롱 4",
            host: "에베베",
            maxPerson: 7,
            nowPerson: 5,
        },
    ];

    const [modalStates, setModalStates] = useState(false);

    const handleModal = () => {
        if (!user) {
            Swal.fire({
                // title: "방 생성을 취소하시겠습니까?",
                title: '<div style="font-size:20px; font-family: HakgyoansimWoojuR;font-weight:bold;">로그인 후 이용 가능합니다.<div>',
                icon: "error",
                width: 330,
                confirmButtonColor: "#55A8F5",
                confirmButtonText:
                    '<div style="font-size:15px; font-family: HakgyoansimWoojuR;">확인<div>',
                // buttons: true,
                // dangerMode: true,
            }).then((result) => {
                navigate("/login");
            });
            return;
        }
        setModalStates(true);
    };

    const handleModalClose = () => {
        setModalStates(false);
    };

    const [page, setPage] = useState(1);
    const offset = (page - 1) * 9;
    const numPages = Math.ceil(room.length / 9);

    return (
        <div>
            <Header />
            <S.page>
                <S.studylistWrap>
                    <S.studylistContainer>
                        <S.studylistTop>
                            <S.testWrap>
                                <S.studyNowText>Study On Air</S.studyNowText>
                                <S.divText>
                                    {room.length}개의 스터디방이 기다리고
                                    있어요!
                                </S.divText>
                            </S.testWrap>
                            <StudyRoomCategory />
                        </S.studylistTop>
                        <S.studylistMain>
                            {room
                                .slice(offset, offset + 9)
                                .map((props, index) => (
                                    <StudyRoomThumbnail
                                        key={index}
                                        {...props}
                                    />
                                ))}
                        </S.studylistMain>
                    </S.studylistContainer>

                    <S.paginate>
                        <S.paginateEl
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            current="arrow"
                        >
                            &lt;
                        </S.paginateEl>
                        {Array(numPages)
                            .fill()
                            .map((_, i) => (
                                <S.paginateEl
                                    key={i + 1}
                                    onClick={() => setPage(i + 1)}
                                    current={page === i + 1 ? "page" : null}
                                >
                                    {i + 1}
                                </S.paginateEl>
                            ))}
                        <S.paginateEl
                            onClick={() => setPage(page + 1)}
                            disabled={page === numPages}
                            current="arrow"
                        >
                            &gt;
                        </S.paginateEl>
                    </S.paginate>
                </S.studylistWrap>
            </S.page>
            <S.createRoomButton onClick={handleModal}></S.createRoomButton>
            {modalStates && (
                <StudyRoomCreateModal setModalStates={handleModalClose} />
            )}
            <Footer />
        </div>
    );
};

export default StudyRoomList;
