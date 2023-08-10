import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { interviewActions } from "store/InterviewStore";
import * as S from "../StudyRoomStyledComponents";
import { getClient } from "store/WebSocketStore";
import { roleChange } from "store/InterviewWebSocketStore";

const SelectInterviewee = (props) => {
  const [interviewee, setInterviewee] = useState(true);
  const dispatch = useDispatch();
  const members = useSelector(
    (state) => state.interviewWebSocket.currentRoom.members
  );
  const currentRoom = useSelector(
    (state) => state.interviewWebSocket.currentRoom
  );
  const { user } = useSelector((state) => state.auth);
  const nickname = useSelector((state) => state.auth.nickname);
  const {myRole} = useSelector((state)=>state.interview);

  useEffect(() => {
    if (members == null) return;
    console.log(myRole);
    const interviewee = [];
    const interviewer = [];

    // 준비 상태 바꾸기 필요. 임시로 넣어뒀음. 155, 190 라인

    members.forEach((member) => {
      if (member.role === "interviewee") {
        if (member.nickname == nickname) {
          setInterviewee(true);
        }
        interviewee.push({ name: member.nickname, ready: member.ready });
      } else {
        if (member.nickname == nickname) {
          setInterviewee(false);
        }
        interviewer.push({ name: member.nickname, ready: member.ready });
      }
    });
    setIntervieweeList(interviewee);
    setInterviewerList(interviewer);
  }, [members]);

  // 더미데이터
  const [intervieweeList, setIntervieweeList] = useState([
    // 입장 시 유저의 기본값은 면접자로 설정
    { name: `${props.username}` },
    { name: "최고심" },
    { name: "춘식이" },
    { name: "빤쮸토끼" },
  ]);
  const [interviewerList, setInterviewerList] = useState([
    { name: "동글이" },
    { name: "수리" },
    { name: "빅또리" },
  ]);

  const changeRole = () => {
    const client = getClient();
    const newRole = myRole==="interviewee" ? "interviewer" : "interviewee"; // 현재 상태를 기반으로 새 역할 결정
    dispatch(interviewActions.setMyRoll(newRole));
    setInterviewee(!interviewee); // 상태 토글

    const sendData = {
      type: "ROLE_CHANGE",
      data: { nickname: user.nickname },
    };

    client.send(
      `/app/interviewrooms/${currentRoom.id}`,
      {},
      JSON.stringify(sendData)
    );

    dispatch(roleChange({ nickname: user.nickname, role: newRole })); // 리듀서 액션 디스패치
  };



  return (
    <S.selectPage>
      <S.selectChild now="wee">
        <S.selectSectionTop>
          <S.nowText now="interviewee">면접자</S.nowText>
          <label htmlFor="interviewee">
            {myRole==="interviewer" && (
              <S.changeButtonActive onClick={changeRole}>
                전환하기
              </S.changeButtonActive>
            )}
            {myRole === "interviewee" && (
              <S.changeButtonGray disabled={myRole==="interviewee"} onClick={changeRole} >
                전환하기
              </S.changeButtonGray>
            )}
            <S.inputHidden
              type="radio"
              checked={interviewee === true}
              name="interview"
              onChange={() => {}}
            />
          </label>
        </S.selectSectionTop>

        <S.selectSectionList>
          {intervieweeList.map((items, index) => (
            <S.personList
              checkname={items.name === props.username ? "true" : ""}
              key={index}>
              {items.name} {items.ready && "(준비)"}
            </S.personList>
          ))}
        </S.selectSectionList>
      </S.selectChild>

      <S.selectChild>
        <S.selectSectionTop>
          <S.nowText now="interviewer">면접관</S.nowText>
          <label htmlFor="interviewer">
            {myRole==="interviewee" && (
              <S.changeButtonActive onClick={changeRole}>
                전환하기
              </S.changeButtonActive>
            )}
            {myRole==="interviewer" && (
              <S.changeButtonGray disabled={myRole==="interviewer"} onClick={changeRole}>
                전환하기
              </S.changeButtonGray>
            )}
            <S.inputHidden
              type="radio"
              checked={interviewee === false}
              name="interview"
              onChange={() => {}}
            />
          </label>
        </S.selectSectionTop>

        <S.selectSectionList>
          {interviewerList.map((items, index) => (
            <S.personList
              checkname={items.name === props.username ? "true" : ""}
              key={index}>
              {items.name}
              {items.ready && "(준비)"}
            </S.personList>
          ))}
        </S.selectSectionList>
      </S.selectChild>
    </S.selectPage>
  );
};

export default SelectInterviewee;
