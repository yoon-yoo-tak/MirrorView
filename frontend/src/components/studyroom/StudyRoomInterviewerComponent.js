import * as S from "./StudyRoomStyledComponents";
import InterviewerSection from "./studyroominterviewer/InterviewerSectionComponent";

import { useDispatch, useSelector } from "react-redux";
import { interviewActions } from "store/InterviewStore";
import SubscriberVideo from "./studyroominterviewer/SubscriberVideo";
import { useEffect, useState } from "react";
import { setNicknames } from "store/InterviewWebSocketStore";
const StudyRoomInterviewer = (props) => {
    const {
        peopleList,
        streamManager,
        subscribers,
        questionList,
        setQuestionList,
        // feedbackList,
        setFeedbackList,

        setIsVideoOn,
        isVideoOn,
        setIsAudioOn,
        isAudioOn,
    } = props;

    const gosim = useSelector((state) => state.interview.feedbackList[0]);
    const { currentRoom } = useSelector((state) => state.interviewWebSocket);
    const { user } = useSelector((state) => state.auth);
    const [selectSubscriber, setSelectSubscriber] = useState(null);
    const dispatch = useDispatch();
    const test = (e) => {
        setSelectSubscriber(e);
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

    return (
        <S.page>
            <S.interviewerWrap>
                <S.videoSection>
                    {/* <S.videoWrap> */}
                    <S.mainContainer>
                        {/* <S.mainVideo>
                            <SubscriberVideo
                                main={true}
                                subscriber={selectSubscriber}
                            ></SubscriberVideo>
                            
                        </S.mainVideo> */}
                        {selectSubscriber && (
                            <>
                                <S.mainVideo>
                                    <SubscriberVideo
                                        main={true}
                                        subscriber={selectSubscriber}
                                    ></SubscriberVideo>
                                </S.mainVideo>
                                {/* <S.nameTextSelected>
                                    {
                                        JSON.parse(
                                            selectSubscriber.stream.connection
                                                .data
                                        ).clientData
                                    }
                                    님의 화면
                                </S.nameTextSelected> */}
                            </>
                        )}
                        {!selectSubscriber && (
                            <>
                                <S.mainVideo>
                                    <S.textViewer>
                                        화면을 선택해주세요
                                    </S.textViewer>
                                </S.mainVideo>
                                {/* <S.nameTextSelected>
                                   
                                    화면을 선택해주세요.
                                </S.nameTextSelected> */}
                            </>
                        )}
                    </S.mainContainer>
                    <S.lastVideos>
                        <S.lastVideoEach onClick={() => test(streamManager)}>
                            {streamManager && (
                                <>
                                    <SubscriberVideo
                                        subscriber={streamManager}
                                        key={
                                            streamManager.stream.connection
                                                .connectionId
                                        }
                                    ></SubscriberVideo>
                                    <S.nameText value="viewer">
                                        {/* {
                                                JSON.parse(
                                                    streamManager.stream.connection.data
                                                ).clientData
                                            } */}
                                        나
                                    </S.nameText>
                                </>
                            )}
                        </S.lastVideoEach>
                        {subscribers.map((sub) => (
                            <S.lastVideoEach onClick={() => test(sub)}>
                                <SubscriberVideo
                                    subscriber={sub}
                                    key={sub.stream.connection.connectionId}
                                ></SubscriberVideo>
                                <S.nameText value="viewer">
                                    {
                                        JSON.parse(sub.stream.connection.data)
                                            .clientData
                                    }
                                    님의 화면입니다
                                </S.nameText>
                            </S.lastVideoEach>
                        ))}
                    </S.lastVideos>
                    {/* </S.videoWrap> */}
                </S.videoSection>
                <S.secondSection>
                    <InterviewerSection
                        peopleList={peopleList}
                        // questionList={questionList}
                        // setQuestionList={setQuestionList}
                        // feedbackList={feedbackList}
                        // setFeedbackList={setFeedbackList}
                    />
                </S.secondSection>
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
            </S.interviewerWrap>
        </S.page>
    );
};

export default StudyRoomInterviewer;
