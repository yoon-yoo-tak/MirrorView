import PrepareSection from "./studyroombefore/PrepareSectionComponent";
import SelectInterviewee from "./studyroombefore/SelectIntervieweeComponent";
import * as S from "./StudyRoomStyledComponents";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { interviewActions } from "store/InterviewStore";
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
  const role = useSelector((state) => state.interview.myRole);

  const { currentRoom } = useSelector((state) => state.interviewWebSocket);
  const nickname = useSelector((state) => state.auth.user.nickname);

  useEffect(() => {
    if (currentRoom && currentRoom.members) {
      currentRoom.members.forEach((member) => {
        if (member.nickname == nickname) {
          setReady(member.ready);
          return;
        }
      });
    }
  }, [currentRoom.members]);

  const handleReady = () => {
    setReady(!ready);
    // 준비상태 반영 api 호출
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

  const handleTest = () => {
    console.log(role);
    setStart(true);
    dispatch(interviewActions.updateStarted(start));
  };

  return (
    <S.page>
      <S.prepareWrap>
        <S.prepareSectionFirst>
          <S.readySection>
            <S.readyText>
              {/* {!ready && hostName === nickname && (
                                <S.readyText>
                                    잠시만 기다려주세요<br />
                                    참가자들이 준비중입니다
                                </S.readyText>
                            )}
                            {!ready && hostName === nickname && (
                                <S.readyText>
                                    모든 참가자의 준비가 완료되었습니다<br />
                                    면접을 시작해주세요!
                                </S.readyText>
                            )} */}
              {!ready && (
                <S.readyText>
                  지금은 준비시간 입니다. <br />
                  준비가 완료되면 버튼을 눌러주세요
                </S.readyText>
              )}
              {ready && (
                <S.readyText>
                  준비가 완료되었습니다. <br />곧 면접이 시작됩니다!
                </S.readyText>
              )}
            </S.readyText>
            <S.readyButtonDiv>
              {/* {hostName !== nickname &&  */}
              <S.readyButton
                onClick={handleReady}
                status={!ready ? "true" : ""}
                disabled={ready}>
                준비완료
              </S.readyButton>
              {/* } */}
              {/* {hostName === nickname &&
                            <S.startButton
                                onClick={handleReady}
                                status={!ready ? "true" : ""}
                                disabled={ready}
                            >
                                면접시작
                            </S.startButton> } */}
            </S.readyButtonDiv>
          </S.readySection>
          <S.myVideo>
            본인 화면 (WebRTC)
            <video autoPlay={true} ref={videoRef} />
            <button onClick={handleTest}>테스트</button>
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
