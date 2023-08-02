import { useState } from "react";

import * as S from "../StudyRoomStyledComponents";
// import PrepareTap from "./PrepareTapComponent";
import StudyChatting from "./preparesection/StudyChattingComponent";
import StudyMyEssay from "./preparesection/StudyMyEssayCheckComponent";
import StudyProfileAndEssay from "./preparesection/StudyProfileAndEssayComponent";
import StudyQustionList from "./preparesection/StudyQuestionListComponent";

const PrepareSection = (props) => {
    const [section, setSection] = useState("info");
    const { peopleList, questionList, setQuestionList } = props;

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
                <S.sectionSelectTap onClick={handleInfo} menu="info">
                    정보
                </S.sectionSelectTap>
                <S.sectionSelectTap onClick={handleQuest} menu="quest">
                    질문
                </S.sectionSelectTap>
                <S.sectionSelectTap onClick={handleMyInfo} menu="myInfo">
                    내정보
                </S.sectionSelectTap>
                <S.sectionSelectTap onClick={handleChat} menu="chat">
                    채팅
                </S.sectionSelectTap>
            </S.sectionSelectTaps>
        </S.sectionPage>
    );
};

export default PrepareSection;
