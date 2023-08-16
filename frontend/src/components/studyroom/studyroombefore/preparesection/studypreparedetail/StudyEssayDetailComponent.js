import { useState } from "react";
import * as S from "../../../StudyRoomStyledComponents";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { interviewActions } from "store/InterviewStore";
import { addQuestion } from "store/InterviewWebSocketStore";
import Swal from "sweetalert2";

import AWN from "awesome-notifications";
import "awesome-notifications/dist/style.css";

// const [introduction, setIntroduction] = useState("");
// const [job, setJob] = useState("");
const StudyEssayDetail = ({ nickname, onAir, before }) => {
    const feedbackList = useSelector((state) => state.interview.feedbackList);
    const { members, category } = useSelector(
        (state) => state.interviewWebSocket.currentRoom
    );
    const notifier = new AWN();
    const dispatch = useDispatch();

    // nickname을 사용하여 해당 멤버를 찾습니다.
    const member = members.find((m) => m.nickname === nickname);
    const essay = member ? member.mainEssay : null;

    const createAI = async (index, question, answer) => {
        // console.log(category);
        // 자소서 기반 질문 자동 생성 api 호출
        // 생셩되면 store에 저장하기
        // if (window.confirm("이 항목에 대한 질문을 자동으로 생성할까요?")) {
        //     try {
        //         console.log(index);
        //         console.log(question);
        //         console.log(answer);
        //         const response = await axios.post("/api/createQuestions", {
        //             instroduction: `${question}\n${answer}`,
        //             job: category,
        //         });
        //         const questionList = response.data.split("\n");
        //         questionList.forEach((element) => {
        //             dispatch(
        //                 addQuestion({
        //                     nickname: member.nickname,
        //                     question: element,
        //                 })
        //             );
        //         });
        //         alert("생성완료");
        //     } catch (error) {
        //         console.error("Error:", error);
        //     }
        // }

        // if (window.confirm("이 항목에 대한 질문을 자동으로 생성할까요?")) {
        //     notifier.asyncBlock(
        //         axios.post("/api/createQuestions", {
        //             instroduction: `${question}\n${answer}`,
        //             job: category,
        //         }),
        //         async (resp) => {
        //             try {
        //                 console.log(resp);
        //                 const questionList = resp.data.split("\n");
        //                 questionList.forEach((element) => {
        //                     dispatch(
        //                         addQuestion({
        //                             nickname: member.nickname,
        //                             question: element,
        //                         })
        //                     );
        //                 });

        //                 notifier.success("생성이 완료되었습니다.");
        //             } catch (error) {
        //                 console.error("Error:", error);
        //                 notifier.alert("다시 시도해주세요.");
        //             }
        //         }
        //     );
        // }
        Swal.fire({
            title: '<div style="font-size:20px; font-family: HakgyoansimWoojuR;font-weight:bold;">자동으로 질문을 생성하시겠습니까?<div>',
            icon: "question",
            width: 400,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#D4D4D4",
            cancelButtonText: "취소",
            confirmButtonText: "넹",
        }).then((result) => {
            if (result.isConfirmed) {
                notifier.asyncBlock(
                    axios.post("/api/createQuestions", {
                        instroduction: `${question}\n${answer}`,
                        job: category,
                    }),
                    async (resp) => {
                        try {
                            // console.log(resp);
                            const questionList = resp.data.split("\n");
                            questionList.forEach((element) => {
                                // console.log(element.substring(3));
                                dispatch(
                                    addQuestion({
                                        nickname: member.nickname,
                                        question: element.substring(3),
                                    })
                                );
                            });

                            notifier.success(
                                `<div style="font-size:18px; font-family: HakgyoansimWoojuR;font-weight:bold;">생성이 완료되었습니다!</div>`
                            );
                        } catch (error) {
                            // console.error("Error:", error);
                            notifier.alert("다시 시도해주세요.");
                        }
                    },
                    undefined,
                    `<div style="font-size:20px; font-family: HakgyoansimWoojuR;font-weight:bold;">AI질문을 생성중입니다! 잠시만 기다려주세요 </div>`
                );
            }
        });
    };
    const [newQuestion, setNewQuestion] = useState("");
    const handleQuestion = (e) => {
        setNewQuestion(e.target.value);
    };

    const handleOnKeyPress = (e) => {
        if (e.key === "Enter") {
            submitQuestion(); // Enter 입력이 되면 클릭 이벤트 실행
        }
    };
    const submitQuestion = () => {
        // if (newQuestion.trim() !== "") {
        //     setTargetObject((prevTarget) => ({
        //         ...prevTarget,
        //         questions: [...prevTarget.questions, newQuestion],
        //     }));

        //     addQuestionToProfile(newQuestion); // 새로운 질문을 부모 컴포넌트에 추가
        // }

        // const handleUpdateArray = (newQuestion) => {
        // const updatedMatchingObject = updateMatchingObject(newQuestion);
        Swal.fire({
            title: '<div style="font-size:20px; font-family: HakgyoansimWoojuR;font-weight:bold;">해당 질문을 추가할까요?<div>',
            icon: "question",
            width: 400,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#D4D4D4",
            cancelButtonText: "취소",
            confirmButtonText: "넹",
            // buttons: true,
            // dangerMode: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(
                    addQuestion({ nickname: nickname, question: newQuestion })
                );
                setNewQuestion("");
                // console.log(feedbackList);
            }
        });
    };

    // const updateMatchingObject = (value) => {
    //     const targetUserIdx = feedbackList.findIndex(
    //         (obj) => obj.name === profile.name
    //     );
    //     const updatedMatchingObject = {
    //         ...feedbackList[targetUserIdx],
    //         feedbacks: [
    //             ...feedbackList[targetUserIdx].feedbacks,
    //             { question: value, feedback: [] },
    //         ],
    //     };

    //     return updatedMatchingObject;
    // };

    // const submitQuestion = () => {
    //     const updatedMatchingObject = updateMatchingObject(value);
    //     const updatedArray = feedbackList.map((obj) =>
    //         obj.name === profile.name ? updatedMatchingObject : obj
    //     );

    //     dispatch(interviewActions.updateFeedbacks(updatedArray));
    // };
    if (!essay) {
        return (
            <div>
                {member && member.mainEssay ? (
                    <S.essayDetailWrap>
                        에쎄이 제목: {member.mainEssay.title}
                        {member.mainEssay.essayDetails.map((item, index) => (
                            <S.essayDetailEach key={index}>
                                <S.essayDetailQuest>
                                    {index + 1}. {item.question}
                                </S.essayDetailQuest>
                                <S.essayDetailContent>
                                    {item.answer}
                                </S.essayDetailContent>
                            </S.essayDetailEach>
                        ))}
                    </S.essayDetailWrap>
                ) : (
                    <S.essayDetailWrap>
                        대표 에세이가 없습니다.
                    </S.essayDetailWrap>
                )}
            </div>
        );
    }
    return (
        <S.essaySectionWrap>
            <S.essayDetailWrap>
                <S.essayNickname>{nickname}님의 자기소개서</S.essayNickname>
                <S.essayTitle>{essay.title}</S.essayTitle>
                {essay.essayDetails.map((item, index) => (
                    <S.essayDetailEach key={index}>
                        <S.essayDetailQuest>
                            {index + 1}. {item.question}
                        </S.essayDetailQuest>
                        <S.essayDetailContent>
                            {item.answer}
                        </S.essayDetailContent>
                        {!onAir && (
                            <S.essayAI
                                onClick={() =>
                                    createAI(index, item.question, item.answer)
                                }
                            >
                                AI 질문 생성하기
                            </S.essayAI>
                        )}
                    </S.essayDetailEach>
                ))}
            </S.essayDetailWrap>
            {before && (
                <div>
                    <S.hline />
                    <S.questionWrap>
                        <S.questInputText>
                            {nickname}님에게 사전 질문 등록하기
                        </S.questInputText>
                        <S.questSubmit>
                            <S.questionInput
                                value={newQuestion}
                                onChange={handleQuestion}
                                onKeyPress={handleOnKeyPress}
                            />
                            <S.questionButton onClick={submitQuestion}>
                                질문등록
                            </S.questionButton>
                        </S.questSubmit>
                    </S.questionWrap>
                </div>
            )}
        </S.essaySectionWrap>
    );
};

export default StudyEssayDetail;
