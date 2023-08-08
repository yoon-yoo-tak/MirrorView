import { useEffect, useState } from "react";
import * as S from "./StudyRoomStyledComponents";
import SubscriberVideo from "./studyroominterviewer/SubscriberVideo";
import { useDispatch, useSelector } from "react-redux";
import { getClient } from "store/WebSocketStore";
import { setNicknames } from "store/InterviewWebSocketStore";

const StudyRoomInterviewee = ({ peopleList, subscribers,streamManager }) => {
  const [selectSubscriber, setSelectSubscriber] = useState(null);
  const selectPerson = (e) => {
    setSelectSubscriber(e);
  };
  const dispatch = useDispatch();
  const { currentRoom } = useSelector((state) => state.interviewWebSocket);
  const { user } = useSelector((state) => state.auth);

  const handleExit = () => {
    const client = getClient();
    const exitData = {
      type: "ROOM_START_CANCEL",
    }
    client.send(`/app/interviewrooms/${currentRoom.id}`, {}, JSON.stringify(exitData));
    console.log("나가기 동작");
  };

  useEffect(() => {
    dispatch(setNicknames(
      currentRoom.members
        .filter((member) => member.nickname !== user.nickname)
        .map((member) => member.nickname)
    ))
  }, [])
  return (
    <S.page>
      <S.vieweeWrap>
        <S.mainWrap>
          <S.mainBox>
            {selectSubscriber && (
              <>
                {JSON.parse(selectSubscriber.stream.connection.data).clientData}
                <SubscriberVideo subscriber={selectSubscriber}>
                </SubscriberVideo>
              </>
            )
            }
          </S.mainBox>
          <S.roomTitle>면접방 제목</S.roomTitle>
          <S.exitRoom menu="viewee" onClick={handleExit}>나가기</S.exitRoom>
        </S.mainWrap>

        <S.leftBox>
        <S.boxes onClick={() => selectPerson(streamManager)}>
              {JSON.parse(streamManager.stream.connection.data).clientData}
              <SubscriberVideo
                subscriber={streamManager}
                key={streamManager.stream.connection.connectionId}
              ></SubscriberVideo>
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
