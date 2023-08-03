import * as S from "./StudyRoomStyledComponents";
import InterviewerSection from "./studyroominterviewer/InterviewerSectionComponent";

const StudyRoomInterviewer = (props) => {
    const { peopleList, questionList, setQuestionList } = props;

    return (
        <S.page>
            <S.interviewerWrap>
                <S.videoSection>
                    <S.mainContainer>
                        <S.mainVideo>말하는 사람 ? 메인 사람 화면</S.mainVideo>
                    </S.mainContainer>
                    <S.lastVideos>
                        <S.lastVideoEach>기타 사람 1</S.lastVideoEach>
                        <S.lastVideoEach>기타 사람 2</S.lastVideoEach>
                        <S.lastVideoEach>기타 사람 3</S.lastVideoEach>
                    </S.lastVideos>
                </S.videoSection>
                <S.secondSection>
                    <InterviewerSection
                        peopleList={peopleList}
                        questionList={questionList}
                        setQuestionList={setQuestionList}
                    />
                </S.secondSection>
            </S.interviewerWrap>
        </S.page>
    );
};

export default StudyRoomInterviewer;
