import { useState } from "react";
import FeedbackModal from "./FeedbackModalComponent";

import * as S from "./MypageStyledComponents";

const FeedbackComponent = () => {
    // 더미데이터
    const archive = [
        { id: 1, name: "히히", time: 10 },
        { id: 2, name: "헤헤", time: 20 },
        { id: 3, name: "깍깍", time: 30 },
        { id: 4, name: "메롱", time: 40 },
        { id: 5, name: "졸려", time: 50 },
        { id: 6, name: "랄랄", time: 60 },
        { id: 7, name: "롤롤", time: 70 },
        { id: 8, name: "률류", time: 80 },
        { id: 9, name: "악악", time: 90 },
    ];

    const [modalStates, setModalStates] = useState(archive.map(() => false));

    const handleModal = (index) => {
        const newModalStates = modalStates.map((state, idx) =>
            idx === index ? true : state
        );
        setModalStates(newModalStates);
    };

    const handleModalClose = (index) => {
        const newModalStates = modalStates.map((state, idx) =>
            idx === index ? false : state
        );
        setModalStates(newModalStates);
    };

    return (
        <div>
            <S.fbComponent>
                {archive.map((item, index) => (
                    <S.fbThumbnail
                        // className="archive"
                        key={item.id}
                        onClick={() => handleModal(index)}
                    >
                        <div>피드백 이름 : {item.name}</div>
                        <div>도착한 날짜 : {item.time}</div>
                        {modalStates[index] && (
                            <FeedbackModal
                                item={item}
                                setModalStates={() => handleModalClose(index)}
                            />
                        )}
                    </S.fbThumbnail>
                ))}
            </S.fbComponent>
        </div>
    );
};

export default FeedbackComponent;
