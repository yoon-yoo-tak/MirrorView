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

  
  const members = useSelector((state)=>state.interviewWebSocket.currentRoom.members);
  const handleCheckWho = (nickname) => {
    // const target = questionList.find((list) => list.name === name);

    // setTargetQuestion(target.questions);
    setCheckWho(nickname);
  };

  return (
    <div>
      <S.profileAndEssayWrap>
        <S.contentTapWrap>
          <S.contentTapList>
            {members.map((member, index) => (
              <S.contentTap key = {index} onClick={() => handleCheckWho(member.nickname)}>
                {member.nickname}
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
