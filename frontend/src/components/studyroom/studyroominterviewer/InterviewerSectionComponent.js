import { useState, useEffect } from "react";

import StudyQustionList from "../studyroombefore/preparesection/StudyQuestionListComponent";
import EssayInfoSection from "./EssayInfoSectionComponent";
import ChattingSection from "./ChattingSectionComponent";
import MakingFeedbackTap from "./MakingFeedbackTapComponent";
// 일단 임시로 불러오겠음
import StudyRating from "../starrating/StudyRatingComponent";
import * as S from "../StudyRoomStyledComponents";
import { useDispatch, useSelector } from "react-redux";
import { updateStarted } from "store/InterviewStore";
import React, { useContext } from "react";
import { WebSocketContext } from "WebSocketContext";
import Swal from "sweetalert2";
import AWN from "awesome-notifications";
import "awesome-notifications/dist/style.css";

const InterviewerSection = (props) => {
    const { client } = useContext(WebSocketContext);
    const currentRoom = useSelector(
        (state) => state.interviewWebSocket.currentRoom
    );
    const started = useSelector(
        (state) => state.interviewWebSocket.currentRoom.started
    );
    const [section, setSection] = useState("info");
    const { peopleList, questionList, feedbackList, setFeedbackList } = props;

    const notifier = new AWN();
    const handleInfo = () => {
        setSection("info");
    };

    const handleQuest = () => {
        setSection("quest");
    };

    const handleChat = () => {
        setSection("chat");
    };
    const dispatch = useDispatch();
    // 여기서 나가면 면접 준비방으로 가는게 맞는건데
    // 일단 여기서 테스트용으로 처리만 해봄
    const [modalStates, setModalStates] = useState(false);

    const handleExit = () => {
        // const exitData = {
        //   type: "ROOM_START_CANCEL",
        // };

        // client.send(
        //   `/app/interviewrooms/${currentRoom.id}`,
        //   {},
        //   JSON.stringify(exitData)
        // );
        // console.log("나가기 동작");

        Swal.fire({
            title: '<div style="font-size:20px; font-family: HakgyoansimWoojuR;font-weight:bold;">면접 준비방으로 돌아갈까요?<div>',
            icon: "question",
            width: 400,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#D4D4D4",
            cancelButtonText: "취소",
            confirmButtonText: "넹",
            // buttons: true,
            // dangerMode: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const exitData = {
                    type: "ROOM_START_CANCEL",
                };

                client.send(
                    `/app/interviewrooms/${currentRoom.id}`,
                    {},
                    JSON.stringify(exitData)
                );
                console.log("나가기 동작");
                notifier.success(
                    `<div style="font-size:18px; font-family: HakgyoansimWoojuR;font-weight:bold;">준비방으로 돌아갑니다.</div>`,
                    {
                        durations: { success: 2000 },
                    }
                );
            } else if (result.isDenied) {
            }
        });
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
                    {/* {modalStates && <StudyRating peopleList={peopleList} setModalStates={setModalStates} />} */}
                </S.sectionSelectTaps>
            </S.interviewerSectionWrap>
        </div>
    );
};
export default InterviewerSection;
