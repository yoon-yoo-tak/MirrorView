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
                <S.questionSubmitWrap>
                    {questionList.map((items, index) => (
                        <div>
                            <S.questionEach>
                                {index + 1}. {items}
                            </S.questionEach>
                            <S.questionInput
                                value={newQuestion}
                                onChange={handleQuestion}
                            />
                            <S.questionButton onClick={submitQuestion}>
                                등록
                            </S.questionButton>
                        </div>
                    ))}
                </S.questionSubmitWrap>
            </S.questionWrap>
        </div>
    );
};

export default MakingFeedback;
