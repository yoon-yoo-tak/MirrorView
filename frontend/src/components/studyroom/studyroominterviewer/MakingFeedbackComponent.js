import { useState } from "react";

import * as S from "../StudyRoomStyledComponents";

const MakingFeedback = ({ questionList, setQuestionList }) => {
    const [newQuestion, setNewQuestion] = useState("");

    const handleQuestion = (e) => {
        setNewQuestion(e.target.value);
    };
    const submitQuestion = () => {
        if (newQuestion.trim() !== "") {
            setQuestionList((prevList) => [...prevList, newQuestion]);
            setNewQuestion("");
        }
    };

    return (
        <div>
            <S.questionWrap>
                <S.questionIntro>
                    질문과 답변에 대한 피드백을 작성해주세요
                </S.questionIntro>
                {/* <S.questionSubmitWrap> */}
                {questionList.map((items, index) => (
                    <S.feedbackEach>
                        <S.questionEach>
                            {index + 1}. {items}
                        </S.questionEach>
                        <S.feedbackInputWrap>
                            <S.feedbackInput
                                value={newQuestion}
                                onChange={handleQuestion}
                            />
                            <S.feedbackButton onClick={submitQuestion}>
                                등록
                            </S.feedbackButton>
                        </S.feedbackInputWrap>
                    </S.feedbackEach>
                ))}
                {/* </S.questionSubmitWrap> */}
            </S.questionWrap>
        </div>
    );
};

export default MakingFeedback;
