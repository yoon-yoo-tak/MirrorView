import { useState } from "react";
import * as S from "../../../StudyRoomStyledComponents";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { interviewActions } from "store/InterviewStore";
import { addQuestion } from "store/InterviewWebSocketStore";

// const [introduction, setIntroduction] = useState("");
// const [job, setJob] = useState("");
const StudyEssayDetail = ({ nickname, onAir }) => {
    const feedbackList = useSelector((state) => state.interview.feedbackList);
    const { members, category } = useSelector(
        (state) => state.interviewWebSocket.currentRoom
    );

    const dispatch = useDispatch();

    // nickname을 사용하여 해당 멤버를 찾습니다.
    const member = members.find((m) => m.nickname === nickname);
    const essay = member ? member.mainEssay : null;

    const createAI = async (index, question, answer) => {
        console.log(category);
        // 자소서 기반 질문 자동 생성 api 호출
        // 생셩되면 store에 저장하기
        if (window.confirm("이 항목에 대한 질문을 자동으로 생성할까요?")) {
            try {
                console.log(index);
                console.log(question);
                console.log(answer);
                const response = await axios.post(
                    "http://localhost:8000/api/createQuestions",
                    {
                        instroduction: `${question}\n${answer}`,
                        job: category,
                    }
                );
                const questionList = response.data.split("\n");
                questionList.forEach((element) => {
                    dispatch(
                        addQuestion({
                            nickname: member.nickname,
                            question: element,
                        })
                    );
                });
                alert("생성완료");
            } catch (error) {
                console.error("Error:", error);
            }
        }
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
        <div>
            {nickname}
            <S.essayDetailWrap>
                {essay.title}
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
        </div>
    );
};

export default StudyEssayDetail;
