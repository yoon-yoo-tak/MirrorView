import PrepareSection from "./studyroombefore/PrepareSectionComponent";
import SelectInterviewee from "./studyroombefore/SelectIntervieweeComponent";
import * as S from "./StudyRoomStyledComponents";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const StudyRoomBefore = (props) => {
    // 스터디룸 페이지에서 가져온 peopleList
    const { questionList, setQuestionList, peopleList, streamManager } = props;
    const [ready, setReady] = useState(false);
    const memberList = useSelector((state)=>state.interview.currentRoom.members);
    const nickname = useSelector((state)=>state.auth.user.nickname);
    useEffect(()=>{
        memberList.forEach(member => {
            if (member.nickname==nickname) {
                setReady(member.ready);
                return;
            }
        });
    },[memberList])
    const handleReady = () => {
        setReady(!ready);
        // 준비상태 반영 api 호출
    };
    const videoRef = React.createRef();

    useEffect(()=>{
        componentDidUpdate();
        componentDidMount();
    },[streamManager])

    const componentDidUpdate =() => {
        if (streamManager && !!videoRef) {
            streamManager.addVideoElement(videoRef.current);
        }
    }

    const componentDidMount = () =>{
        if (streamManager && !!videoRef) {
            streamManager.addVideoElement(videoRef.current);
        }
    }

    return (
        <S.page>
            <S.prepareWrap>
                <S.prepareSectionFirst>
                    <S.readySection>
                        <S.readyText>
                            {!ready && (
                                <S.readyText>
                                    지금은 준비시간 입니다. <br />
                                    준비가 완료되면 버튼을 눌러주세요
                                </S.readyText>
                            )}
                            {ready && (
                                <S.readyText>
                                    준비가 완료되었습니다. <br />곧 면접이
                                    시작됩니다!
                                </S.readyText>
                            )}
                        </S.readyText>
                        <S.readyButtonDiv>
                            <S.readyButton
                                onClick={handleReady}
                                status={!ready ? "true" : ""}
                                disabled={ready}
                            >
                                준비완료
                            </S.readyButton>
                        </S.readyButtonDiv>
                    </S.readySection>
                    <S.myVideo>
                        본인 화면 (WebRTC)
                        <video autoPlay = {true} ref={videoRef} />
                         </S.myVideo>
                    <S.selectSection>
                        <SelectInterviewee username={nickname} />
                    </S.selectSection>
                </S.prepareSectionFirst>
                <S.prepareSectionSecond>
                    <PrepareSection
                        username={nickname}
                        peopleList={memberList}
                        questionList={questionList}
                        setQuestionList={setQuestionList}
                    />
                </S.prepareSectionSecond>
            </S.prepareWrap>
        </S.page>
    );
};

export default StudyRoomBefore;
