import { useRef, useState } from "react";

import * as S from "../StudyRoomStyledComponents";
// import PrepareTap from "./PrepareTapComponent";
import StudyChatting from "./preparesection/StudyChattingComponent";
import StudyMyEssay from "./preparesection/StudyMyEssayCheckComponent";
import StudyProfileAndEssay from "./preparesection/StudyProfileAndEssayComponent";
import StudyQustionList from "./preparesection/StudyQuestionListComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { exitRoom } from "store/InterviewWebSocketStore";
import StudyRating from "../starrating/StudyRatingComponent";
import React, { useContext } from "react";
import { WebSocketContext } from "WebSocketContext";

const PrepareSection = (props) => {
  const { client } = useContext(WebSocketContext);
  const [section, setSection] = useState("info");
  const { peopleList, questionList, setQuestionList, leaveSession } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { currentRoom, nicknames } = useSelector(
    (state) => state.interviewWebSocket
  );
  const handleInfo = () => {
    setSection("info");
  };

  // const handleQuest = () => {
  //     setSection("quest");
  // };

  const handleMyInfo = () => {
    setSection("myInfo");
  };

  const handleChat = () => {
    setSection("chat");
  };

  const [modalStates, setModalStates] = useState(false);

  const handleExit = () => {
    console.log(nicknames);
    if (!nicknames) {
      const sendUserData = {
        type: "EXIT",
        data: {
          nickname: user.nickname,
        },
      };
      client.send(
        `/app/interviewrooms/${currentRoom.id}`,
        {},
        JSON.stringify(sendUserData)
      );
      leaveSession();
      navigate("/");
    } else {
      setModalStates(true);
    }
  };

  return (
    <S.sectionPage>
      <S.sectionWrap>
        {section === "info" && (
          <StudyProfileAndEssay
            questionList={questionList}
            setQuestionList={setQuestionList}
            peopleList={peopleList}
          />
        )}
        {/* {section === "quest" && (
                    <StudyQustionList
                        questionList={questionList}
                        setQuestionList={setQuestionList}
                    />
                )} */}
        {section === "myInfo" && <StudyMyEssay />}
        {section === "chat" && <StudyChatting />}
      </S.sectionWrap>
      <S.sectionSelectTaps>
        <div>
          <S.sectionSelectTap onClick={handleInfo} menu="info">
            INFO
          </S.sectionSelectTap>
          {/* <S.sectionSelectTap onClick={handleQuest} menu="quest">
                        Q.
                    </S.sectionSelectTap> */}
          <S.sectionSelectTap onClick={handleMyInfo} menu="myInfo">
            MY
          </S.sectionSelectTap>
          <S.sectionSelectTap onClick={handleChat} menu="chat">
            CHAT
          </S.sectionSelectTap>
        </div>
        <S.exitRoom onClick={handleExit}>나가기</S.exitRoom>
        {modalStates && (
          <StudyRating
            peopleList={peopleList}
            leaveSession={leaveSession}
            setModalStates={setModalStates}
          />
        )}
      </S.sectionSelectTaps>
    </S.sectionPage>
  );
};

export default PrepareSection;
