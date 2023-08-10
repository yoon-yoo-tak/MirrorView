import { useEffect, useRef, useState } from "react";
// import classes from "./FeedbackModal.module.scss";

import * as S from "./MypageStyledComponents";

const FeedbackModal = ({ item, setModalStates }) => {
    const closeModal = () => {
        setModalStates(false);
    };
    const [content, setContent] = useState("");
    const modalRef = useRef(null);

    useEffect(() => {
        document.getElementById("content").innerHTML = item.content.replaceAll(
            "\n",
            "<br/>"
        );
    }, []);
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
                    <S.modalScrollContent>
                        <S.modalContent
                            style={{
                                top: "-25px",
                                left: "-25px",
                                fontSize: "20px",
                                color: "black",
                                fontFamily: "Imcre",
                                whiteSpace: "pre-line",
                                lineHeight: "2",
                            }}
                        >
                            작성자 : {item.senderNickname}
                            {"\n"}날짜 : {item.createdTime.substring(0, 10)}
                        </S.modalContent>
                        <S.hr style={{ top: "-75px" }}></S.hr>
                        <div
                            id="content"
                            style={{
                                position: "relative",
                                padding: "50px",
                                top: "-110px",
                                left: "-15px",
                                fontSize: "14px",
                                color: "black",
                                fontFamily: "KimjungchulGothic",
                                lineHeight: "1.5",
                            }}
                        ></div>
                    </S.modalScrollContent>
                </S.modalContainer>
            </S.modalBackDrop>
        </div>
    );
};

export default FeedbackModal;
