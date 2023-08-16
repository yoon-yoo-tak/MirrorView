import { useState, useEffect } from "react";
import * as S from "../../../StudyRoomStyledComponents";
import { useSelector, useDispatch } from "react-redux";
import { deleteQuestion } from "store/InterviewWebSocketStore";

const StudyQuestionDetail = ({
  checkWho,
  // targetObject,
  // setTargetObject,
  // updateQuestionInProfile,
}) => {
  // const handleDelete = (index) => {
  //     const updatedQuestions = [...targetObject.questions];
  //     updatedQuestions.splice(index, 1);
  //     updateQuestionInProfile(checkWho, updatedQuestions);

  //     setTargetObject((prevTarget) => ({
  //         ...prevTarget,
  //         questions: updatedQuestions,
  //     }));
  // };
  const feedbackList = useSelector((state) => state.interviewWebSocket.feedbackList);
  // const targetUserIdx = feedbackList.findIndex(
  //     (obj) => obj.name === checkWho
  // );
  const [targetUserIdx, setTargetUserIdx] = useState(null);

  useEffect(() => {
    const idx = feedbackList.findIndex((obj) => obj.nickname === checkWho);
    setTargetUserIdx(idx);
  }, [feedbackList, checkWho]);
  const dispatch = useDispatch();

  const updateMatchingObject = (index) => {
    const targetUserIdx = feedbackList.findIndex(
      (obj) => obj.name === checkWho
    );
    const updatedMatchingObject = {
      ...feedbackList[targetUserIdx],
      feedbacks: feedbackList[targetUserIdx].feedbacks.filter(
        (item, i) => i !== index
      ),
    };

    return updatedMatchingObject;
  };

  const handleDelete = (index) => {
    // const targetUserIdx = feedbackList.findIndex(
    //     (obj) => obj.name === checkWho
    // );
    // const updatedMatchingObject = updateMatchingObject(index);
    // const updatedArray = feedbackList.map((obj, index) =>
    //   index === targetUserIdx ? updatedMatchingObject : obj
    // );
// console.log(index);
//   console.log(feedbackList[targetUserIdx].feedbacks[index]);
    dispatch(deleteQuestion({index,targetUserIdx}));
  };

  return (
    <S.questListWrap>
      <S.questListTitle>{checkWho}님에게 작성한 질문이에요</S.questListTitle>
      <S.questList>
        {feedbackList[targetUserIdx]?.feedbacks
          ?.map((item) => item.question)
          .map((quests, index) => (
            // {targetObject.questions.map((quests, index) => (
            <S.questEach key={index}>
              <S.questText>{quests}</S.questText>
              <S.deleteQuest onClick={() => handleDelete(index)}>
                삭제
              </S.deleteQuest>
            </S.questEach>
          ))}
      </S.questList>
    </S.questListWrap>
  );
};

export default StudyQuestionDetail;
