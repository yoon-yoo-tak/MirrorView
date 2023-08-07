import { useEffect, useState } from "react";
import * as S from "./StudyRoomStyledComponents";
import SubscriberVideo from "./studyroominterviewer/SubscriberVideo";
import { useDispatch, useSelector } from "react-redux";
import { setNickname } from "store/AuthStore";

const StudyRoomInterviewee = ({ peopleList, subscribers }) => {
  const [selectSubscriber, setSelectSubscriber] = useState(null);
   const selectPerson = (e) => {
        setSelectSubscriber(e);
  };
const dispatch = useDispatch();
const {currentRoom} = useSelector((state)=>state.interviewWebSocket);
const {user} = useSelector((state)=>state.auth);
  useEffect(()=>{
    dispatch(setNickname(
      currentRoom.members
        .filter((member) => member.nickname !== user.nickname)
        .map((member) => member.nickname)
    ))
  },[])
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
