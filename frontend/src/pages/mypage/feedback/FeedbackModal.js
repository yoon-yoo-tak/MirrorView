import { useEffect, useRef } from "react";
// import classes from "./FeedbackModal.module.scss";

import * as S from "../../../components/styledComponents/MyPageScomponents";

const FeedbackModal = ({ item, setModalStates }) => {
    const closeModal = () => {
        setModalStates(false);
    };

    const modalRef = useRef(null);

    useEffect(() => {
        // 이벤트 핸들러 함수
        const handler = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setModalStates(false);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, [setModalStates]);
    const handleInsideClick = (event) => {
        event.stopPropagation();
    };

    return (
        <S.modalContainer ref={modalRef} onClick={handleInsideClick}>
            <S.modalButton onClick={closeModal}>X</S.modalButton>
            <p>{item.time}</p>
        </S.modalContainer>
    );
};

export default FeedbackModal;
