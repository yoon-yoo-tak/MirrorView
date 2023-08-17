import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as S from "../StudyRoomStyledComponents";
import MakingFeedback from "./MakingFeedbackComponent";
import { interviewActions } from "store/InterviewStore";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const MakingFeedbackTap = ({
  questionList,
  peopleList,
  // feedbackList,
  // setFeedbackList,
}) => {
  const [targetQuestion, setTargetQuestion] = useState([]);
  const [checkWho, setCheckWho] = useState("");
  const { user } = useSelector((state) => state.auth);

  const members = useSelector(
    (state) => state.interviewWebSocket.currentRoom.members
  );
  const handleCheckWho = (e) => {
    // const target = questionList.find((list) => list.name === name);

    // setTargetQuestion(target.questions);
    setCheckWho(e.target.value);
  };

  const style = {
    fontFamily: "HakgyoansimWoojuR",
  };

  return (
    <div>
      <S.profileAndEssayWrap>
        <S.contentTapWrap>
          <S.contentTapList>
            {/* {members.map((member, index) => (
              <S.contentTap key = {index} onClick={() => handleCheckWho(member.nickname)}>
                {member.nickname}
              </S.contentTap>
            ))} */}
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <Select
                labelid="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={checkWho}
                onChange={handleCheckWho}
                style={style}>
                {members
                  .filter((member) => member.nickname !== user.nickname)
                  .map((member, index) => (
                    <MenuItem
                      style={style}
                      value={member.nickname}
                      key={index}
                      // onClick={() =>
                      //     handleCheckWho(member.nickname)
                      // }
                    >
                      {member.nickname}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
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
