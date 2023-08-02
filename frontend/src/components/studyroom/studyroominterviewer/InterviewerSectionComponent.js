import { useState } from "react";

import StudyQustionList from "../studyroombefore/preparesection/StudyQuestionListComponent";
import EssayInfoSection from "./EssayInfoSectionComponent";
import ChattingSection from "./ChattingSectionComponent";
import MakingFeedback from "./MakingFeedbackComponent";

import * as S from "../StudyRoomStyledComponents";

const InterviewerSection = (props) => {
    const [section, setSection] = useState("info");
    const { peopleList, questionList, setQuestionList } = props;

    const handleInfo = () => {
        setSection("info");
    };

    const handleQuest = () => {
        setSection("quest");
    };

    const handleChat = () => {
        setSection("chat");
    };

    const handleExit = () => {};
    return (
        <div>
            <div>
                <S.sectionWrap>
                    {section === "info" && (
                        <EssayInfoSection peopleList={peopleList} />
                    )}
                    {section === "quest" && (
                        <MakingFeedback
                            questionList={questionList}
                            setQuestionList={setQuestionList}
                        />
                    )}
                    {section === "chat" && <ChattingSection />}
                </S.sectionWrap>
                <S.sectionSelectTaps>
                    <div>
                        <S.sectionSelectTap onClick={handleInfo} menu="info">
                            INFO
                        </S.sectionSelectTap>
                        <S.sectionSelectTap onClick={handleQuest} menu="quest">
                            Q.
                        </S.sectionSelectTap>
                        <S.sectionSelectTap onClick={handleChat} menu="chat">
                            CHAT
                        </S.sectionSelectTap>
                    </div>
                    <S.exitRoom onClick={handleExit}>나가기</S.exitRoom>
                </S.sectionSelectTaps>
            </div>
        </div>
    );
};
export default InterviewerSection;
