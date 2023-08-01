import PrepareSection from "../../components/studyroom/PrepareSectionComponent";
import SelectInterviewee from "../../components/studyroom/SelectIntervieweeComponent";
import * as S from "../../components/studyroom/StudyRoomStyledComponents";

const StudyRoomPrepare = () => {
    return (
        <S.preparePage>
            <S.prepareWrap>
                <S.prepareSectionFirst>
                    <S.readySection>
                        <S.readyText>
                            지금은 준비시간 입니다. <br />
                            준비가 완료되면 버튼을 눌러주세요
                        </S.readyText>
                        <S.readyButtonDiv>
                            <S.readyButton>준비완료</S.readyButton>
                        </S.readyButtonDiv>
                    </S.readySection>
                    <S.myVideo>본인 화면 (WebRTC) </S.myVideo>
                    <S.selectSection>
                        <SelectInterviewee />
                    </S.selectSection>
                </S.prepareSectionFirst>
                <S.prepareSectionSecond>
                    <PrepareSection />
                </S.prepareSectionSecond>
            </S.prepareWrap>
        </S.preparePage>
    );
};

export default StudyRoomPrepare;
