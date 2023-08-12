import { useEffect, useState } from "react";
import * as S from "./StudyRoomStyledComponents";
import SubscriberVideo from "./studyroominterviewer/SubscriberVideo";
import { useDispatch, useSelector } from "react-redux";
import React, { useContext } from "react";
import { WebSocketContext } from "WebSocketContext";
import { setNicknames } from "store/InterviewWebSocketStore";

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

  const handleExit = () => {
    const exitData = {
      type: "ROOM_START_CANCEL",
    };
    client.send(
      `/app/interviewrooms/${currentRoom.id}`,
      {},
      JSON.stringify(exitData)
    );
    console.log("나가기 동작");
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
      <S.vieweeWrap>
        <S.mainWrap>
          <div>
            <S.mainBox>
              {selectSubscriber && (
                <>
                  {
                    JSON.parse(selectSubscriber.stream.connection.data)
                      .clientData
                  }
                  <SubscriberVideo
                    subscriber={selectSubscriber}
                  ></SubscriberVideo>
                </>
              )}
            </S.mainBox>
            <S.roomTitle>면접방 제목</S.roomTitle>
          </div>
          <S.exitRoom menu="viewee" onClick={handleExit}>
            나가기
          </S.exitRoom>
        </S.mainWrap>

        <S.leftBox>
          <S.boxes onClick={() => selectPerson(streamManager)}>
            {streamManager && (
              <>
                {JSON.parse(streamManager.stream.connection.data).clientData}
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
                  {!isAudioOn && <S.micControloff onClick={handleMicEnable} />}
                </S.videoParent>
              </>
            )}
          </S.boxes>
          {subscribers.map((sub) => (
            <S.boxes onClick={() => selectPerson(sub)}>
              {JSON.parse(sub.stream.connection.data).clientData}
              <SubscriberVideo
                subscriber={sub}
                key={sub.stream.connection.connectionId}
              ></SubscriberVideo>
            </S.boxes>
          ))}
        </S.leftBox>
      </S.vieweeWrap>
    </S.page>
  );
};

export default StudyRoomInterviewee;
