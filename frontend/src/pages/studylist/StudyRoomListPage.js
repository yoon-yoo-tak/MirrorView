import * as S from "../../components/studylist/StudyStyledComponents";
import StudyRoomCategory from "../../components/studylist/StudyRoomCategoryComponent";
import StudyRoomThumbnail from "../../components/studylist/StudyRoomThumbnailComponent";
import StudyRoomCreateModal from "../../components/studylist/StudyRoomCreateModalComponent";
import { useState } from "react";

const StudyRoomList = () => {
    // 데이터화
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
        setModalStates(true);
    };

    const handleModalClose = () => {
        setModalStates(false);
    };

    return (
        <div>
            <S.page>
                <S.studylistContainer>
                    <S.studylistTop>
                        <S.studyNowText>현재 진행중인 스터디</S.studyNowText>
                        <StudyRoomCategory />
                    </S.studylistTop>
                    <S.studylistMain>
                        {roomInfo.map((props) => (
                            <StudyRoomThumbnail {...props} />
                        ))}
                    </S.studylistMain>
                </S.studylistContainer>
            </S.page>
            <S.createRoomButton onClick={handleModal}></S.createRoomButton>
            {modalStates && (
                <StudyRoomCreateModal setModalStates={handleModalClose} />
            )}
        </div>
    );
};

export default StudyRoomList;
