import PrepareSection from "../../components/studyroom/PrepareSectionComponent";
import SelectInterviewee from "../../components/studyroom/SelectIntervieweeComponent";
import * as S from "../../components/studyroom/StudyRoomStyledComponents";
// import { useSelector } from "react-redux";

const StudyRoomPrepare = () => {
    // useSelector로 불러서 가져오기
    // const nickname = useSelector((state) => state.auth);
    const nickname = "오늘 홈런친 보경이";

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
                        <SelectInterviewee nick={nickname} />
                    </S.selectSection>
                </S.prepareSectionFirst>
                <S.prepareSectionSecond>
                    <PrepareSection nick={nickname} />
                </S.prepareSectionSecond>
            </S.prepareWrap>
        </S.preparePage>
    );
};

export default StudyRoomPrepare;
