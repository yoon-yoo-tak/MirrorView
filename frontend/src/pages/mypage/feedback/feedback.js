import { useSelector } from "react-redux";
import { useState } from "react";

import Sidebar from "../Sidebar";
import FeedbackModal from "./FeedbackModal";

const Feedback = () => {
    const nickname = useSelector((state) => state.auth.nickname);
    // 어차피 다 수정해야함

    const archive = [
        { id: 1, name: "히히", time: 10 },
        { id: 2, name: "헤헤", time: 30 },
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
            <Sidebar />
            <div className="archiveWrap">
                <div>{nickname}님의 아카이브</div>
                <div className="archiveList"></div>
                <div className="archiveList">
                    {archive.map((item, index) => (
                        <div
                            className="archive"
                            key={item.id}
                            onClick={() => handleModal(index)}
                        >
                            <div>{item.name}</div>
                            {modalStates[index] && (
                                <FeedbackModal
                                    item={item}
                                    setModalStates={() =>
                                        handleModalClose(index)
                                    }
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Feedback;
