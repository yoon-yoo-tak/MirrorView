import { useEffect, useRef, useState } from "react";
// import classes from "./FeedbackModal.module.scss";

import * as S from "./MypageStyledComponents";
import axios from "axios";
import { useSelector } from "react-redux";

const FeedbackModal = ({ item, setModalStates }) => {
    const { accessToken} = useSelector((state)=>state.auth);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    const closeModal = () => {
        setModalStates(false);
    };
    const [feedback,setFeedback] = useState({});

    const modalRef = useRef(null);

    useEffect(()=>{
        axios.get(`http://localhost:8080/api/mypage/feedbacks/feedback/${item.id}`)
        .then(({data})=>{
            console.log(data.data);
            setFeedback(data.data);
            console.log(feedback);
        })
    },[]);

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
                    <S.modalContent>작성자 : {item.time}</S.modalContent>
                    <S.modalContent>시간 : {feedback.createdTime}</S.modalContent>
                    <S.modalContent>내용 : {feedback.content}</S.modalContent>
                    <S.modalContent>방번호 : {feedback.roomId}</S.modalContent>
                </S.modalContainer>
            </S.modalBackDrop>
        </div>
    );
};

export default FeedbackModal;
