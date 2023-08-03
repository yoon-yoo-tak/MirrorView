import PrepareSection from "./studyroombefore/PrepareSectionComponent";
import SelectInterviewee from "./studyroombefore/SelectIntervieweeComponent";
import * as S from "./StudyRoomStyledComponents";
import { useState } from "react";

const StudyRoomBefore = (props) => {
    const nickname = "오늘 홈런친 보경이";
    // 스터디룸 페이지에서 가져온 peopleList
    const { questionList, setQuestionList, peopleList } = props;
    const [ready, setReady] = useState(false);

    const handleReady = () => {
        setReady(true);
        // 준비상태 반영 api 호출
    };

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
                    <S.myVideo>본인 화면 (WebRTC) </S.myVideo>
                    <S.selectSection>
                        <SelectInterviewee username={nickname} />
                    </S.selectSection>
                </S.prepareSectionFirst>
                <S.prepareSectionSecond>
                    <PrepareSection
                        username={nickname}
                        peopleList={peopleList}
                        questionList={questionList}
                        setQuestionList={setQuestionList}
                    />
                </S.prepareSectionSecond>
            </S.prepareWrap>
        </S.page>
    );
};

export default StudyRoomBefore;
