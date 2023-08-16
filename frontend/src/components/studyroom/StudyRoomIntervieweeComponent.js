import { useEffect, useState } from "react";
import * as S from "./StudyRoomStyledComponents";
import SubscriberVideo from "./studyroominterviewer/SubscriberVideo";
import { useDispatch, useSelector } from "react-redux";
import React, { useContext } from "react";
import { WebSocketContext } from "WebSocketContext";
import { setNicknames } from "store/InterviewWebSocketStore";
import Swal from "sweetalert2";
import AWN from "awesome-notifications";
import "awesome-notifications/dist/style.css";
import { styled } from "styled-components";

const StudyRoomInterviewee = (props) => {
    const {
        peopleList,
        streamManager,
        subscribers,
        setIsVideoOn,
        isVideoOn,
        setIsAudioOn,
        isAudioOn,
    } = props;
    const { client } = useContext(WebSocketContext);
    const [selectSubscriber, setSelectSubscriber] = useState(null);
    const selectPerson = (e) => {
        setSelectSubscriber(e);
    };
    const dispatch = useDispatch();
    const { currentRoom } = useSelector((state) => state.interviewWebSocket);
    const { user } = useSelector((state) => state.auth);
    const notifier = new AWN();

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
                // console.log("나가기 동작");
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

    useEffect(() => {
        dispatch(
            setNicknames(
                currentRoom.members
                    .filter((member) => member.nickname !== user.nickname)
                    .map((member) => member.nickname)
            )
        );
    }, []);

    const handleCamEnable = () => {
        if (isVideoOn) {
            streamManager.publishVideo(false);
            setIsVideoOn(false);
        } else {
            streamManager.publishVideo(true);
            setIsVideoOn(true);
        }
    };

    const handleMicEnable = () => {
        if (isAudioOn) {
            streamManager.publishAudio(false);
            setIsAudioOn(false);
        } else {
            streamManager.publishAudio(true);
            setIsAudioOn(true);
        }
    };

    const style = {
        height: "100%",
    };

    return (
        <S.page>
            <S.vieweeWrap>
                <S.mainWrap>
                    <div>
                        {selectSubscriber && (
                            <>
                                <S.mainBox>
                                    <SubscriberVideo
                                        main={true}
                                        subscriber={selectSubscriber}
                                    ></SubscriberVideo>
                                </S.mainBox>
                                <S.nameTextSelected>
                                    {
                                        JSON.parse(
                                            selectSubscriber.stream.connection
                                                .data
                                        ).clientData
                                    }
                                    님의 화면
                                </S.nameTextSelected>
                            </>
                        )}
                        {!selectSubscriber && (
                            <>
                                <S.mainBox>
                                    {/* <SubscriberVideo
                                        subscriber={selectSubscriber}
                                    ></SubscriberVideo> */}
                                </S.mainBox>
                                <S.nameTextSelected>
                                    {/* {
                                        JSON.parse(
                                            selectSubscriber.stream.connection
                                                .data
                                        ).clientData
                                    }
                                    님의 화면 */}
                                    화면을 선택해주세요.
                                </S.nameTextSelected>
                            </>
                        )}
                        <S.roomTitle>현재 면접자로 참여중입니다</S.roomTitle>
                    </div>
                    <S.exitRoom menu="viewee" onClick={handleExit}>
                        나가기
                    </S.exitRoom>
                </S.mainWrap>

                <S.leftBox>
                    <S.boxes onClick={() => selectPerson(streamManager)}>
                        {streamManager && (
                            <>
                                {/* <S.videoParent> */}
                                <SubscriberVideo
                                    main={false}
                                    subscriber={streamManager}
                                    key={
                                        streamManager.stream.connection
                                            .connectionId
                                    }
                                ></SubscriberVideo>
                                <S.nameText>
                                    {/* {
                                        JSON.parse(
                                            streamManager.stream.connection.data
                                        ).clientData
                                    } */}
                                    나
                                </S.nameText>

                                {/* </S.videoParent> */}
                            </>
                        )}
                    </S.boxes>
                    {subscribers.map((sub) => (
                        <>
                            <S.boxes onClick={() => selectPerson(sub)}>
                                <SubscriberVideo
                                    subscriber={sub}
                                    key={sub.stream.connection.connectionId}
                                ></SubscriberVideo>
                                <S.nameText>
                                    {
                                        JSON.parse(sub.stream.connection.data)
                                            .clientData
                                    }
                                </S.nameText>
                            </S.boxes>
                        </>
                    ))}
                </S.leftBox>
                <S.controlbtns>
                    {isVideoOn && (
                        <S.videoOn onClick={handleCamEnable} value="viewer" />
                    )}
                    {!isVideoOn && (
                        <S.videoff onClick={handleCamEnable} value="viewer" />
                    )}
                    {isAudioOn && <S.micCOn onClick={handleMicEnable} />}
                    {!isAudioOn && <S.micCOff onClick={handleMicEnable} />}
                </S.controlbtns>
            </S.vieweeWrap>
        </S.page>
    );
};

export default StudyRoomInterviewee;
