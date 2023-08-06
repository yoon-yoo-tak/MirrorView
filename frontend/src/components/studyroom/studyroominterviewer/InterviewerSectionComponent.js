import { useState, useEffect } from "react";

import StudyQustionList from "../studyroombefore/preparesection/StudyQuestionListComponent";
import EssayInfoSection from "./EssayInfoSectionComponent";
import ChattingSection from "./ChattingSectionComponent";
import MakingFeedbackTap from "./MakingFeedbackTapComponent";
// 일단 임시로 불러오겠음
import StudyRating from "../starrating/StudyRatingComponent";

import * as S from "../StudyRoomStyledComponents";

const InterviewerSection = (props) => {
    const [section, setSection] = useState("info");
    const { peopleList, questionList, feedbackList, setFeedbackList } = props;

    const handleInfo = () => {
        setSection("info");
    };

    const handleQuest = () => {
        setSection("quest");
    };

    const handleChat = () => {
        setSection("chat");
    };

    // 여기서 나가면 면접 준비방으로 가는게 맞는건데
    // 일단 여기서 테스트용으로 처리만 해봄
    const [modalStates, setModalStates] = useState(false);

    const handleExit = () => {
        setModalStates(true);
    };
    return (
        <div>
            <S.interviewerSectionWrap>
                <S.sectionWrap menu="viewer">
                    {section === "info" && (
                        <EssayInfoSection
                            peopleList={peopleList}
                            questionList={questionList}
                        />
                    )}
                    {section === "quest" && (
                        <MakingFeedbackTap
                            questionList={questionList}
                            // setQuestionList={setQuestionList}
                            peopleList={peopleList}
                            feedbackList={feedbackList}
                            setFeedbackList={setFeedbackList}
                        />
                    )}
                    {section === "chat" && <ChattingSection />}
                </S.sectionWrap>
                {/* <S.selectTapsWrap>
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
                    {modalStates && <StudyRating peopleList={peopleList} />}
                </S.selectTapsWrap> */}
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
                    {modalStates && <StudyRating peopleList={peopleList} />}
                </S.sectionSelectTaps>
            </S.interviewerSectionWrap>
        </div>
    );
};
export default InterviewerSection;
