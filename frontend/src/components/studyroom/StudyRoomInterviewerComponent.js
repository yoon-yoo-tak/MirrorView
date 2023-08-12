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
            <S.mainVideo>
              <SubscriberVideo subscriber={selectSubscriber}></SubscriberVideo>
            </S.mainVideo>
          </S.mainContainer>
          <S.lastVideos>
            <S.lastVideoEach onClick={() => test(streamManager)}>
              {streamManager && (
                <>
                  {JSON.parse(streamManager.stream.connection.data).clientData}
                  님의 화면입니다
                  <S.videoParent>
                    <SubscriberVideo
                      subscriber={streamManager}
                      key={streamManager.stream.connection.connectionId}
                    ></SubscriberVideo>
                    {/* <S.StyledVideo /> */}
                    {isVideoOn && (
                      <S.videoControlon
                        onClick={handleCamEnable}
                        value="viewer"
                      />
                    )}
                    {!isVideoOn && (
                      <S.videoControloff
                        onClick={handleCamEnable}
                        value="viewer"
                      />
                    )}
                    {isAudioOn && <S.micControlon onClick={handleMicEnable} />}
                    {!isAudioOn && (
                      <S.micControloff onClick={handleMicEnable} />
                    )}
                  </S.videoParent>
                </>
              )}
            </S.lastVideoEach>
            {subscribers.map((sub) => (
              <S.lastVideoEach onClick={() => test(sub)}>
                {JSON.parse(sub.stream.connection.data).clientData}
                님의 화면입니다
                <SubscriberVideo
                  subscriber={sub}
                  key={sub.stream.connection.connectionId}
                ></SubscriberVideo>
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
      </S.interviewerWrap>
    </S.page>
  );
};

export default StudyRoomInterviewer;
