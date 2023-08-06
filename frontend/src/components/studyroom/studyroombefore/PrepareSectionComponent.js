import { useState } from "react";

import * as S from "../StudyRoomStyledComponents";
// import PrepareTap from "./PrepareTapComponent";
import StudyChatting from "./preparesection/StudyChattingComponent";
import StudyMyEssay from "./preparesection/StudyMyEssayCheckComponent";
import StudyProfileAndEssay from "./preparesection/StudyProfileAndEssayComponent";
import StudyQustionList from "./preparesection/StudyQuestionListComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { exitRoom } from "store/InterviewWebSocketStore";
import { getClient } from "store/WebSocketStore";
const PrepareSection = (props) => {
    const [section, setSection] = useState("info");
    const { peopleList, questionList, setQuestionList,leaveSession } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state)=>state.auth)
    const {currentRoom} = useSelector((state)=>state.interviewWebSocket);
    const handleInfo = () => {
        setSection("info");
    };

    const handleQuest = () => {
        setSection("quest");
    };

    const handleMyInfo = () => {
        setSection("myInfo");
    };

    const handleChat = () => {
        setSection("chat");
    };

    const handleExit = () => {
        const client = getClient();
        const sendUserData = {
            type: "EXIT",
            data: {
            nickname: user.nickname,
            }
          };
          console.log(currentRoom);
        client.send(`/app/interviewrooms/${currentRoom.id}`,{},JSON.stringify(sendUserData));
        leaveSession();
        navigate("/");
    };

    return (
        <S.sectionPage>
            <S.sectionWrap>
                {section === "info" && (
                    <StudyProfileAndEssay peopleList={peopleList} />
                )}
                {section === "quest" && (
                    <StudyQustionList
                        questionList={questionList}
                        setQuestionList={setQuestionList}
                    />
                )}
                {section === "myInfo" && <StudyMyEssay />}
                {section === "chat" && <StudyChatting />}
            </S.sectionWrap>
            <S.sectionSelectTaps>
                <div>
                    <S.sectionSelectTap onClick={handleInfo} menu="info">
                        INFO
                    </S.sectionSelectTap>
                    <S.sectionSelectTap onClick={handleQuest} menu="quest">
                        Q.
                    </S.sectionSelectTap>
                    <S.sectionSelectTap onClick={handleMyInfo} menu="myInfo">
                        MY
                    </S.sectionSelectTap>
                    <S.sectionSelectTap onClick={handleChat} menu="chat">
                        CHAT
                    </S.sectionSelectTap>
                </div>
                <S.exitRoom onClick={handleExit}>나가기</S.exitRoom>
            </S.sectionSelectTaps>
        </S.sectionPage>
    );
};

export default PrepareSection;
