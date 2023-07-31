import { useEffect, useRef } from "react";
import * as S from "./StudyStyledComponents";
import { useState } from "react";

const StudyRoomCreateModal = ({ setModalStates }) => {
    const [open, setOpen] = useState(true);
    const [firstCategory, setFirstCategory] = useState("선택하세요");
    const [secondCategory, setSecondCategory] = useState("선택하세요");

    const closeModal = () => {
        if (window.confirm("방 생성을 취소하시겠습니까?")) {
            setModalStates(false);
        }
    };

    const modalRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                if (window.confirm("방 생성을 취소하시겠습니까?")) {
                    setModalStates(false);
                }
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

    const checkOpen = () => {
        setOpen(true);
    };
    const checkUnOpen = () => {
        setOpen(false);
    };

    const firstCategories = ["선택하세요", "첫번째", "두번째", "세번쨰"];
    const secondCategories = ["선택하세요", "first", "second", "third"];

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
                                    <S.modalInputText
                                        type="text"
                                        placeholder="스터디 방 이름을 입력하세요"
                                    ></S.modalInputText>
                                </div>
                                <div>
                                    <div>스터디 정원</div>
                                    <S.modalInputText
                                        type="number"
                                        placeholder="최대 인원 수를 입력하세요"
                                    ></S.modalInputText>
                                </div>
                            </S.modalInputList>
                            <S.modalInputList>
                                <div>
                                    <div>상위 카테고리</div>
                                    {/* <S.modalInputText placeholder="수정해야해요"></S.modalInputText> */}
                                    <S.modalCategory
                                        value={firstCategory}
                                        onChange={(e) =>
                                            setFirstCategory(e.target.value)
                                        }
                                    >
                                        {firstCategories.map((category) => (
                                            <option
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </option>
                                        ))}
                                    </S.modalCategory>
                                </div>
                                <div>
                                    <div>하위 카테고리</div>
                                    <S.modalCategory
                                        value={secondCategory}
                                        onChange={(e) =>
                                            setSecondCategory(e.target.value)
                                        }
                                    >
                                        {secondCategories.map((category) => (
                                            <option
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </option>
                                        ))}
                                    </S.modalCategory>
                                </div>
                            </S.modalInputList>
                            <S.modalInputList>
                                <div>
                                    <S.modalOpenLabel>
                                        <S.modalOpenRadio
                                            type="radio"
                                            value="공개"
                                            checked={open === true}
                                            onChange={checkOpen}
                                        />
                                        공개
                                    </S.modalOpenLabel>
                                    <S.modalOpenLabel>
                                        <S.modalOpenRadio
                                            type="radio"
                                            value="비공개"
                                            checked={open === false}
                                            onChange={checkUnOpen}
                                        />
                                        비공개
                                    </S.modalOpenLabel>
                                </div>
                                {!open && (
                                    <div>
                                        <div>비밀번호</div>
                                        <S.modalInputText placeholder="비밀번호를 설정해주세요"></S.modalInputText>
                                    </div>
                                )}
                                {open && (
                                    <S.hidden>
                                        <div>비밀번호</div>
                                        <S.modalInputText placeholder="비밀번호를 설정해주세요"></S.modalInputText>
                                    </S.hidden>
                                )}
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
