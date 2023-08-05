import * as S from "../../StudyRoomStyledComponents";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion } from "store/InterviewWebSocketStore";
const StudyQustionList = ({ questionList, setQuestionList }) => {
    // const [newQuestionList, setNewQuestionList] = useState([]);
    const {questions} = useSelector((state)=>state.interviewWebSocket);
    const dispatch = useDispatch();
    const [newQuestion, setNewQuestion] = useState("");
    
    const handleQuestion = (e) => {
        setNewQuestion(e.target.value);
    };
    const submitQuestion = () => {
        if (newQuestion.trim() !== "") {
            dispatch(addQuestion(newQuestion));
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
                    {questions.map((items, index) => (
                        <S.questionEach key={index}>
                            {index + 1}. {items}
                        </S.questionEach>
                    ))}
                </S.questionListWrap>
            </S.questionWrap>
        </div>
    );
};

export default StudyQustionList;
