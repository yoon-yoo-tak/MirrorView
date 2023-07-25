import { useEffect, useRef } from "react";
import classes from "./FeedbackModal.module.scss";

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
        <div
            ref={modalRef}
            className={classes.container}
            onClick={handleInsideClick}
        >
            <button className={classes.close} onClick={closeModal}>
                X
            </button>
            <p>{item.time}</p>
        </div>
    );
};

export default FeedbackModal;
