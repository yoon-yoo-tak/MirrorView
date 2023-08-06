import { useEffect, useRef } from "react";
import * as S from "./StudyStyledComponents";
import { useState } from "react";
import useUpdateEffect from "../../lib/UseUpdateEffect";
import { useDispatch } from "react-redux";
import { setCurrentRoom } from "../../store/InterviewWebSocketStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudyRoomCreateModal = ({ setModalStates }) => {
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [firstCategory, setFirstCategory] = useState([
        { id: 0, name: "선택하세요" },
    ]);
    const [secondCategory, setSecondCategory] = useState([
        { id: 0, name: "선택하세요" },
    ]);
    const [thirdCategory, setThirdCategory] = useState([
        { id: 0, name: "선택하세요" },
    ]);
    const defaultValue = [{ id: 0, name: "선택하세요" }];
    const [firstValue, setFirstValue] = useState("선택하세요");
    const [secondValue, setSecondValue] = useState("선택하세요");
    const [thirdValue, setThirdValue] = useState("선택하세요");

    const [title, setTitle] = useState("");
    const [max, setMax] = useState(0);
    const [password, setPassword] = useState("");

    // 임의 카테고리 설정

    useEffect(() => {
        axios
            .get("/api/category")
            .then(({ data }) => {
                console.log(data);
                setFirstCategory([...defaultValue, ...data.data]);
                console.log(firstCategory);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useUpdateEffect(() => {
        if (firstCategory.length != 1) {
            if (firstValue === "선택하세요") {
                setSecondCategory(defaultValue);
                setThirdCategory(defaultValue);
            } else {
                axios.get(`/api/category/${firstValue}`).then(({ data }) => {
                    setSecondCategory([...defaultValue, ...data.data]);
                });
            }
        }
    }, [firstValue]);
    useUpdateEffect(() => {
        if (secondCategory.length != 1) {
            if (secondValue === "선택하세요") {
                setThirdCategory(defaultValue);
            } else {
                axios.get(`/api/category/${secondValue}`).then(({ data }) => {
                    setThirdCategory([...defaultValue, ...data.data]);
                });
            }
        }
    }, [secondValue]);

    const handleFirstCategory = (e) => {
        setFirstValue(e.target.value);
        // + 설정된 카테고리에 따라 자식 카테고리 api 호출해서 지금 state에 자식 카테고리를 저장?
    };

    const handleSecondCategory = (e) => {
        setSecondValue(e.target.value);
    };

    // 모달창 관련

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

    // 생성 시 공개 비공개 여부

    const checkOpen = () => {
        setOpen(true);
    };
    const checkUnOpen = () => {
        setOpen(false);
    };

    // 기타 입력값들

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleMax = (e) => {
        setMax(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    // 생성 클릭 시 모든 값들이 입력되었는지 확인
    const checkSubmit = () => {
        console.log(title);
        console.log(max);
        console.log(secondValue);
        console.log(open);

        if (!open) {
            // 비공개 상태
            // 비밀번호까지 확인해야함
            if (
                title === "" ||
                max === 0 ||
                firstValue === "선택하세요" ||
                secondValue === "선택하세요" ||
                password === ""
            ) {
                // 하나라도 값이 없다면
                alert("입력 항목을 확인해주세요");
            } else {
                handleSubmit();
            }
        } else {
            if (
                title === "" ||
                max === 0 ||
                firstValue === "선택하세요" ||
                secondValue === "선택하세요"
            ) {
                // 하나라도 값이 없다면
                alert("입력 항목을 확인해주세요");
            } else {
                handleSubmit();
            }
        }
    };

    // 방 생성
    const handleSubmit = async (e) => {
        if (window.confirm("면접방을 생성하시겠습니까?")) {
            await axios
                .post("/api/interviews/create", {
                    title: title,
                    password: password,
                    category: secondValue,
                    maxMemberCount: max,
                })
                .then((response) => {
                    console.log(response);
                    dispatch(setCurrentRoom(response.data.data));
                    setModalStates(false);
                    return response;
                })
                .then((response) => {
                    navigate(`/studyroom/${response.data.data.id}`);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const style = {
        visibility: "hidden",
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
                                    <S.modalInputText
                                        type="text"
                                        value={title}
                                        placeholder="스터디 방 이름을 입력하세요"
                                        onChange={handleTitle}
                                    ></S.modalInputText>
                                </div>
                                <div>
                                    <div>스터디 정원</div>
                                    <S.modalInputText
                                        type="number"
                                        placeholder="최대 인원 수를 입력하세요"
                                        value={max}
                                        onChange={handleMax}
                                    ></S.modalInputText>
                                </div>
                            </S.modalInputList>
                            <S.modalInputList>
                                <div>
                                    <div>카테고리 선택</div>
                                    <S.modalCategory
                                        value={firstValue}
                                        onChange={handleFirstCategory}
                                    >
                                        {firstCategory.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.name}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </S.modalCategory>
                                </div>
                                <div>
                                    <div style={style}>카테고리 선택</div>
                                    <S.modalCategory
                                        value={secondValue}
                                        onChange={handleSecondCategory}
                                    >
                                        {secondCategory.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.name}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </S.modalCategory>
                                </div>
                                <div>
                                    <div style={style}>카테고리 선택</div>
                                    <S.modalCategory
                                        value={thirdValue}
                                        onChange={handleFirstCategory}
                                    >
                                        {thirdCategory.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.name}
                                            >
                                                {category.name}
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
                                        <S.modalInputText
                                            placeholder="비밀번호를 설정해주세요"
                                            value={password}
                                            onChange={handlePassword}
                                        ></S.modalInputText>
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
                        <S.createCompleteButton onClick={checkSubmit}>
                            생성하기
                        </S.createCompleteButton>
                    </S.modalContent>
                </S.modalContainer>
            </S.modalBackDrop>
        </div>
    );
};

export default StudyRoomCreateModal;
