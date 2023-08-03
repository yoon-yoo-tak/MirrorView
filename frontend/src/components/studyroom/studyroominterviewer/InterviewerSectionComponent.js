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
            <S.interviewerSectionWrap>
                <S.sectionWrap menu="viewer">
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
                <S.selectTapsWrap>
                    <S.selectTapsHorizon>
                        <S.tapsInterviewer onClick={handleInfo} menu="info">
                            INFO
                        </S.tapsInterviewer>
                        <S.tapsInterviewer onClick={handleQuest} menu="quest">
                            Q.
                        </S.tapsInterviewer>
                        <S.tapsInterviewer onClick={handleChat} menu="chat">
                            CHAT
                        </S.tapsInterviewer>
                    </S.selectTapsHorizon>
                    <S.exitRoom menu="viewer" onClick={handleExit}>
                        나가기
                    </S.exitRoom>
                </S.selectTapsWrap>
            </S.interviewerSectionWrap>
        </div>
    );
};
export default InterviewerSection;
