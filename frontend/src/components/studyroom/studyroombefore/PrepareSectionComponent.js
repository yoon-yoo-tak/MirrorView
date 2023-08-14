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
import Swal from "sweetalert2";
import AWN from "awesome-notifications";
import "awesome-notifications/dist/style.css";

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
    const notifier = new AWN();

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
        // console.log(nicknames);
        // if (!nicknames) {
        //   const sendUserData = {
        //     type: "EXIT",
        //     data: {
        //       nickname: user.nickname,
        //     },
        //   };
        //   client.send(
        //     `/app/interviewrooms/${currentRoom.id}`,
        //     {},
        //     JSON.stringify(sendUserData)
        //   );
        //   leaveSession();
        //   navigate("/");
        // } else {
        //   setModalStates(true);
        // }

        // -------------

        Swal.fire({
            title: '<div style="font-size:20px; font-family: HakgyoansimWoojuR;font-weight:bold;">스터디를 종료할까요?<div>',
            icon: "question",
            width: 400,
            showCancelButton: true,
            confirmButtonColor: "#55A8F5",
            cancelButtonColor: "#D4D4D4",
            cancelButtonText:
                '<div style="font-size:17px; font-family: HakgyoansimWoojuR;font-weight:bold;">아니요<div>',
            confirmButtonText:
                '<div style="font-size:17px; font-family: HakgyoansimWoojuR;font-weight:bold;">네<div>',
        }).then((result) => {
            if (result.isConfirmed) {
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
                    notifier.success(
                        `<div style="font-size:18px; font-family: HakgyoansimWoojuR;font-weight:bold;">스터디를 종료합니다</div>`,
                        {
                            durations: { success: 2000 },
                        }
                    );
                    navigate("/");
                } else {
                    setModalStates(true);
                }
            }
        });
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
