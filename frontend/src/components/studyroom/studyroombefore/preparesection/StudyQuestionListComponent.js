import * as S from "../../StudyRoomStyledComponents";
import { useState } from "react";

const StudyQustionList = ({ questionList, setQuestionList }) => {
    // const [newQuestionList, setNewQuestionList] = useState([]);
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
                    스터디를 시작하기 전 질문지를 미리 작성해보세요!
                </S.questionIntro>
                <S.questionSubmitWrap>
                    <S.questionInput
                        value={newQuestion}
                        onChange={handleQuestion}
                    />
                    <S.questionButton onClick={submitQuestion}>
                        등록
                    </S.questionButton>
                </S.questionSubmitWrap>
                <S.questionListWrap>
                    {questionList.map((items, index) => (
                        <S.questionEach>
                            {index + 1}. {items}
                        </S.questionEach>
                    ))}
                </S.questionListWrap>
            </S.questionWrap>
        </div>
    );
};

export default StudyQustionList;
