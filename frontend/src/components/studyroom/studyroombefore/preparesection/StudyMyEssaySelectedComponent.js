import { publishSelectedEssay } from "store/InterviewWebSocketStore";
import * as S from "../../StudyRoomStyledComponents";
import { useDispatch, useSelector } from "react-redux";
import React, { useContext } from "react";
import { WebSocketContext } from "WebSocketContext";

const StudyMyEssaySelected = ({
  selectedEssay,
  selectedValueIndex,
  mainEssay,
  setMainEssay,
  isMainChecked,
  setMainChecked,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const roomId = useSelector(
    (state) => state.interviewWebSocket.currentRoom.id
  );
  const { client } = useContext(WebSocketContext);
  const handleMain = () => {
    if (window.confirm("현재 자소서를 메인으로 설정하시겠습니까?")) {
      setMainEssay(selectedValueIndex);
      setMainChecked(true);
      dispatch(
        publishSelectedEssay({
          client: client,
          roomId,
          nickname: user.nickname,
          mainEssay: selectedEssay,
        })
      );
      console.log(selectedEssay);
      // pub로직

      alert(`${selectedEssay.title}이(가) 메인 자소서로 설정되었습니다.`);
    }
  };
  return (
    <div onClick={handleMain}>
      {selectedEssay &&
        selectedEssay.essayDetails &&
        selectedEssay.essayDetails.map((items, index) => (
          <S.essaySet key={items.id}>
            <S.myQuestion>
              {index + 1}. {items.question}
            </S.myQuestion>
            <S.myAnswer>{items.answer}</S.myAnswer>
          </S.essaySet>
        ))}
    </div>
  );
};

export default StudyMyEssaySelected;
