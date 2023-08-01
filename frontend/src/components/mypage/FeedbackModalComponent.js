import { useEffect, useRef, useState } from "react";
// import classes from "./FeedbackModal.module.scss";

import * as S from "./MypageStyledComponents";

const FeedbackModal = ({ item, setModalStates }) => {

    const closeModal = () => {
        setModalStates(false);
    };

    const modalRef = useRef(null);

    useEffect(() => {
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

    useEffect(() => {
        const updateModalPosition = () => {
            if (modalRef.current) {
                const modalHeight = modalRef.current.offsetHeight;
                const windowHeight = window.innerHeight;
                const top = windowHeight / 2 - modalHeight / 2;
                console.log(modalHeight + " " + windowHeight + " " + top);
                modalRef.current.style.marginTop = `0px`;
            }
        };

        window.addEventListener("resize", updateModalPosition);
        updateModalPosition();

        return () => {
            window.removeEventListener("resize", updateModalPosition);
        };
    }, []);

    const handleInsideClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div>
            <S.modalBackDrop>
                <S.modalContainer ref={modalRef} onClick={handleInsideClick}>
                    <S.modalButton onClick={closeModal}>닫기</S.modalButton>
                    <S.modalContent>작성자 : {item.nickname}</S.modalContent>
                    tiem : {item.createdTime.substring(0,10)}
                    <br/>
                    answer : {item.answer}
                    <br/>
                    question : {item.question}
                    <br/>
                    content : {item.content}
                </S.modalContainer>
            </S.modalBackDrop>
        </div>
    );
};

export default FeedbackModal;
