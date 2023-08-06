import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as S from "../StudyRoomStyledComponents";
import MakingFeedback from "./MakingFeedbackComponent";
import { interviewActions } from "store/InterviewStore";

const MakingFeedbackTap = ({
  questionList,
  peopleList,
  // feedbackList,
  // setFeedbackList,
}) => {
  const [targetQuestion, setTargetQuestion] = useState([]);
  const [checkWho, setCheckWho] = useState("");

  const feedbackList = useSelector((state) => state.interview.feedbackList);

  const handleCheckWho = (name) => {
    // const target = questionList.find((list) => list.name === name);

    // setTargetQuestion(target.questions);
    setCheckWho(name);
  };

  return (
    <div>
      <S.profileAndEssayWrap>
        <S.contentTapWrap>
          <S.contentTapList>
            {peopleList.map((people, index) => (
              <S.contentTap onClick={() => handleCheckWho(people.name)}>
                {people.name}
              </S.contentTap>
            ))}
          </S.contentTapList>
          <S.contentDetail>
            {!checkWho ? (
              <S.profileContent>
                참여자를 클릭해 피드백을 등록하세요!
              </S.profileContent>
            ) : (
              <MakingFeedback
                checkWho={checkWho}
                // targetQuestion={targetQuestion}
                // feedbackList={feedbackList}
                // setFeedbackList={setFeedbackList}
              />
            )}
          </S.contentDetail>
        </S.contentTapWrap>
      </S.profileAndEssayWrap>
    </div>
  );
};

export default MakingFeedbackTap;
