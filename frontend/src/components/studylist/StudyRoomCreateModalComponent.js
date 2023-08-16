import { useEffect, useRef } from "react";
import * as S from "./StudyStyledComponents";
import { useState } from "react";
import useUpdateEffect from "../../lib/UseUpdateEffect";
import { useDispatch } from "react-redux";
import {
    hostJoinInterviewRoom,
    setCurrentRoom,
} from "../../store/InterviewWebSocketStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import AWN from "awesome-notifications";
import "awesome-notifications/dist/style.css";

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
                // console.log(data);
                setFirstCategory([...defaultValue, ...data.data]);
                // console.log(firstCategory);
            })
            .catch((error) => {
                // console.error(error);
            });
    }, []);

    useUpdateEffect(() => {
        if (firstCategory.length != 1) {
            if (firstValue === "선택하세요") {
                setSecondCategory(defaultValue);
                setThirdCategory(defaultValue);
            } else {
                axios
                    .get(`/api/category/${firstValue}`)
                    .then(({ data }) => {
                        setSecondCategory([...defaultValue, ...data.data]);
                    })
                    .catch((error) => {
                        // console.log(error);
                    });
            }
        }
        setSecondValue("선택하세요");
        setThirdValue("선택하세요");
    }, [firstValue]);
    useUpdateEffect(() => {
        if (secondCategory.length != 1) {
            if (secondValue === "선택하세요") {
                setThirdCategory(defaultValue);
            } else {
                axios
                    .get(`/api/category/${secondValue}`)
                    .then(({ data }) => {
                        setThirdCategory([...defaultValue, ...data.data]);
                    })
                    .catch((error) => {
                        // console.log(error);
                    });
            }
        }
        setThirdValue("선택하세요");
    }, [secondValue]);

    const handleFirstCategory = (e) => {
        setFirstValue(e.target.value);
        // + 설정된 카테고리에 따라 자식 카테고리 api 호출해서 지금 state에 자식 카테고리를 저장?
    };

    const handleSecondCategory = (e) => {
        setSecondValue(e.target.value);
    };

    const handleThirdCategory = (e) => {
        setThirdValue(e.target.value);
    };

    // 모달창 관련
    const [openAlert, setOpenAlert] = useState(false);

    const notifier = new AWN();

    const closeModal = () => {
        // if (window.confirm("방 생성을 취소하시겠습니까?")) {
        //   setModalStates(false);
        // }
        setOpenAlert(true);
        Swal.fire({
            // title: "방 생성을 취소하시겠습니까?",
            title: '<div style="font-size:20px; font-family: HakgyoansimWoojuR;font-weight:bold;">방 생성을 취소할까요?<div>',
            icon: "question",
            width: 330,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#D4D4D4",
            cancelButtonText: "취소",
            confirmButtonText: "넹",
            // buttons: true,
            // dangerMode: true,
        }).then((result) => {
            if (result.isConfirmed) {
                setModalStates(false);
                setOpenAlert(false);
            } else if (result.isDenied) {
            }
        });
    };

    const modalRef = useRef(null);

    // useEffect(() => {
    //     const handler = (e) => {
    //         if (
    //             modalRef.current &&
    //             !modalRef.current.contains(e.target) &&
    //             !openAlert
    //         ) {
    //             // if (window.confirm("방 생성을 취소하시겠습니까?")) {
    //             //     setModalStates(false);
    //             // }
    //             console.log(modalRef);
    //             Swal.fire({
    //                 // title: "방 생성을 취소하시겠습니까?",
    //                 title: '<div style="font-size:20px;font-weight:bold; font-family: "HakgyoansimWoojuR";">취소하꺼야?<div>',
    //                 icon: "question",
    //                 width: 330,
    //                 // buttons: true,
    //                 // dangerMode: true,
    //             }).then((keep) => {
    //                 if (keep) {
    //                     console.log("ㅠㅠ");
    //                     setModalStates(false);
    //                     setOpenAlert(false);
    //                 }
    //             });
    //         }
    //     };

    //     document.addEventListener("mousedown", handler);
    //     return () => {
    //         document.removeEventListener("mousedown", handler);
    //     };
    // }, [setModalStates, openAlert]);

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
        // console.log(title);
        // console.log(max);
        // console.log(secondValue);
        // console.log(open);

        if (!open) {
            // 비공개 상태
            // 비밀번호까지 확인해야함
            if (
                title === "" ||
                max < 1 ||
                max > 6 ||
                firstValue === "선택하세요" ||
                password === ""
            ) {
                // 하나라도 값이 없다면
                // alert("입력 항목을 확인해주세요");
                notifier.alert(
                    `<div style="font-size:18px; font-family: HakgyoansimWoojuR;font-weight:bold;">입력 항목을 확인하세요</div>`,
                    {
                        durations: { success: 2000 },
                    }
                );
            } else {
                handleSubmit();
            }
        } else {
            if (
                title === "" ||
                max < 1 ||
                max > 6 ||
                firstValue === "선택하세요"
            ) {
                // 하나라도 값이 없다면
                // alert("입력 항목을 확인해주세요");
                notifier.alert(
                    `<div style="font-size:18px; font-family: HakgyoansimWoojuR;font-weight:bold;">입력 항목을 확인하세요</div>`,
                    {
                        durations: { success: 2000 },
                    }
                );
            } else {
                handleSubmit();
            }
        }
    };

    // 방만 만들고 이동함. 다른 작업 안한다.
    const handleSubmit = async (e) => {
        let selectCategory = null;
        if (thirdValue != "선택하세요") {
            selectCategory = thirdValue;
        } else if (secondValue != "선택하세요") {
            selectCategory = secondValue;
        } else if (firstValue != "선택하세요") {
            selectCategory = firstValue;
        }

        // if (window.confirm("면접방을 생성하시겠습니까?")) {
        //     await axios
        //         .post("/api/interviews/create", {
        //             title: title,
        //             password: password,
        //             category: selectCategory,
        //             maxMemberCount: max,
        //         })
        //         .then((response) => {
        //             console.log("방만들기 성공");
        //             setModalStates(false);
        //             return response;
        //         })
        //         .then((response) => {
        //             console.log("이동 ");
        //             navigate(`/studyroom/${response.data.data.id}`, {
        //                 state: { isHost: true },
        //             });
        //         })
        //         .catch((error) => {
        //             console.error(error);
        //         });
        // }
        // -----------
        const result = await Swal.fire({
            title: '<div style="font-size:20px; font-family: HakgyoansimWoojuR;font-weight:bold;">면접방을 생성하시겠습니까?<div>',
            icon: "question",
            width: 400,
            showCancelButton: true,
            confirmButtonColor: "#55A8F5",
            cancelButtonColor: "#D4D4D4",
            cancelButtonText:
                '<div style="font-size:17px; font-family: HakgyoansimWoojuR;font-weight:bold;">아니요<div>',
            confirmButtonText:
                '<div style="font-size:17px; font-family: HakgyoansimWoojuR;font-weight:bold;">네<div>',
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.post("/api/interviews/create", {
                    title: title,
                    password: password,
                    category: selectCategory,
                    maxMemberCount: max,
                });

                // console.log("방만들기 성공");
                setModalStates(false);

                // console.log("이동 ");
                navigate(`/studyroom/${response.data.data.id}`, {
                    state: { isHost: true },
                });
            } catch (error) {
                // console.error(error);
            }
        }
        // -----------
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
                                    <div>스터디 정원 (최대 6명)</div>
                                    <S.modalInputText
                                        type="number"
                                        placeholder="최대 인원 수를 입력하세요"
                                        value={max}
                                        onChange={handleMax}
                                        min="1"
                                        max="6"
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
                                        onChange={handleThirdCategory}
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
