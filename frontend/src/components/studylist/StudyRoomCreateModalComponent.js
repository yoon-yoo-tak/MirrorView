import { useEffect, useRef } from "react";
import * as S from "./StudyStyledComponents";

const StudyRoomCreateModal = ({ setModalStates }) => {
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
                    <S.modalContent>
                        <S.modalTitle>스터디 방 만들기</S.modalTitle>
                        <S.modalInputForm>
                            <S.modalInputList>
                                <div>
                                    <div>스터디 방 제목</div>
                                    <S.modalInputText placeholder="스터디 방 이름을 입력하세요"></S.modalInputText>
                                </div>
                                <div>
                                    <div>인원 수</div>
                                    <S.modalInputText placeholder="인원 수를 입력하세요"></S.modalInputText>
                                </div>
                            </S.modalInputList>
                            <S.modalInputList>
                                <div>
                                    <div>상위 카테고리</div>
                                    <S.modalInputText placeholder="수정해야해요"></S.modalInputText>
                                </div>
                                <div>
                                    <div>하위 카테고리</div>
                                    <S.modalInputText placeholder="수정해야해요"></S.modalInputText>
                                </div>
                            </S.modalInputList>
                            <S.modalInputList>
                                <div>공개 비공개</div>
                                <div>
                                    <div>비밀번호</div>
                                    <S.modalInputText placeholder="비밀번호를 설정해주세요"></S.modalInputText>
                                </div>
                            </S.modalInputList>
                        </S.modalInputForm>
                        <S.createCompleteButton>
                            생성하기
                        </S.createCompleteButton>
                    </S.modalContent>
                </S.modalContainer>
            </S.modalBackDrop>
        </div>
    );
};

export default StudyRoomCreateModal;
