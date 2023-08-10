import useUpdateEffect from "lib/UseUpdateEffect";
import PrepareSection from "./studyroombefore/PrepareSectionComponent";
import SelectInterviewee from "./studyroombefore/SelectIntervieweeComponent";
import * as S from "./StudyRoomStyledComponents";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { interviewActions, } from "store/InterviewStore";
import { readyChange, setStartedState } from "store/InterviewWebSocketStore";
import { getClient } from "store/WebSocketStore";

const StudyRoomBefore = (props) => {
  // 스터디룸 페이지에서 가져온 peopleList
  const {
    questionList,
    setQuestionList,
    peopleList,
    streamManager,
    leaveSession,
  } = props;

  const dispatch = useDispatch();

  const [ready, setReady] = useState(false);
  const [start, setStart] = useState(false);
  const currentRoom = useSelector(
    (state) => state.interviewWebSocket.currentRoom
  );
  const { user } = useSelector((state) => state.auth);
  const nickname = useSelector((state) => state.auth.user.nickname);
  const host = currentRoom?.host;
  const availableStart = () => {

    return currentRoom.members.filter(member => member.ready).length === currentRoom.members.length - 1;
  }

  // 누르면 start로, state 변경, db도 변경
  const handleStart = () => {
    const readyCount = currentRoom.members.filter(member => member.ready).length;
    if (availableStart()) {
      dispatch(setStartedState(currentRoom.id));
    } else {
      alert("모든 참가자가 준비되지 않았습니다.");
    }
  };

  useEffect(()=>{
    console.log(user)
  },[])

  const handleTest = () => {
    setStart(true);
    //dispatch(interviewActions.updateStarted(start));
  };

  useEffect(() => {
    if (currentRoom && currentRoom.members) {
      currentRoom.members.forEach((member) => {
        if (member.nickname == nickname) {
          setReady(member.ready);
          return;
        }
      });
    }
  }, [currentRoom.members, host]);
  const handleReady = () => {
    const client = getClient();
    setReady(!ready);
    const sendData = {
      type: "READY_CHANGE",
      data: { nickname: user.nickname, ready: !ready }, // 현재 준비 상태를 반대로 전송
    };

    client.send(
      `/app/interviewrooms/${currentRoom.id}`,
      {},
      JSON.stringify(sendData)
    );

    // 이 부분은 리덕스 스토어에 준비 상태를 업데이트하는 액션을 디스패치하는 것을 가정합니다.
    // 해당 액션과 액션 생성자를 정의해야 합니다.
    dispatch(readyChange({ nickname: user.nickname, ready: !ready }));
  };
  const videoRef = React.createRef();

  useEffect(() => {
    componentDidUpdate();
    componentDidMount();
  }, [streamManager]);

  const componentDidUpdate = () => {
    if (streamManager && !!videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  };

  const componentDidMount = () => {
    if (streamManager && !!videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  };

  return (
    <S.page>
      <S.prepareWrap>
        <S.prepareSectionFirst>
          <S.readySection>
            <S.readyText>
              {
                // 면접관인 경우
                user.nickname === host ? (
                  !ready ? (
                    <S.readyText>
                      잠시만 기다려주세요<br />
                      참가자들이 준비중입니다
                    </S.readyText>
                  ) : (
                    <S.readyText>
                      모든 참가자의 준비가 완료되었습니다<br />
                      면접을 시작해주세요!
                    </S.readyText>
                  )
                ) : (
                  // 면접자인 경우
                  !ready ? (
                    <S.readyText>
                      지금은 준비시간 입니다. <br />
                      준비가 완료되면 버튼을 눌러주세요
                    </S.readyText>
                  ) : (
                    <S.readyText>
                      준비가 완료되었습니다. <br />
                      곧 면접이 시작됩니다!
                    </S.readyText>
                  )
                )
              }
            </S.readyText>
            <S.readyButtonDiv>
              {
                user.nickname === host ? (
                  <S.startButton
                    onClick={handleStart}
                    disabled={ready}
                    status={availableStart() ? "true" : ""}
                  >
                    면접시작
                  </S.startButton>
                ) : (
                  <S.readyButton
                    onClick={handleReady}
                    status={!ready ? "true" : ""}
                    disabled={ready}
                  >
                    준비완료
                  </S.readyButton>
                )
              }
            </S.readyButtonDiv>
          </S.readySection>
          <S.myVideo>
            본인 화면 (WebRTC)
            <video autoPlay={true} ref={videoRef} />
            {/* <button onClick={handleTest}>테스트</button> */}
          </S.myVideo>
          <S.selectSection>
            <SelectInterviewee username={nickname} />
          </S.selectSection>
        </S.prepareSectionFirst>
        <S.prepareSectionSecond>
          <PrepareSection
            username={nickname}
            peopleList={currentRoom.members}
            questionList={questionList}
            setQuestionList={setQuestionList}
            leaveSession={leaveSession}
          />
        </S.prepareSectionSecond>
      </S.prepareWrap>
    </S.page>
  );
};

export default StudyRoomBefore;
