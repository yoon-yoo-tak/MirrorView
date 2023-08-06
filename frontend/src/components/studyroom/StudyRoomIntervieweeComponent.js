import { useState } from "react";
import * as S from "./StudyRoomStyledComponents";
import SubscriberVideo from "./studyroominterviewer/SubscriberVideo";

const StudyRoomInterviewee = ({ peopleList, subscribers }) => {
  const [selectSubscriber, setSelectSubscriber] = useState(null);
   const selectPerson = (e) => {
        setSelectSubscriber(e);
  };
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
          <S.exitRoom menu="viewee">나가기</S.exitRoom>
        </S.mainWrap>

        <S.leftBox>
          {subscribers.map((sub) => (
            <S.boxes onClick={()=>selectPerson(sub)}>
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
