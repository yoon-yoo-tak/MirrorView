import * as S from "./StudyRoomStyledComponents";
import InterviewerSection from "./studyroominterviewer/InterviewerSectionComponent";

import { useSelector } from "react-redux";
import { interviewActions } from "store/InterviewStore";

const StudyRoomInterviewer = (props) => {
  const {
    peopleList,
    questionList,
    setQuestionList,
    // feedbackList,
    setFeedbackList,
  } = props;

  const gosim = useSelector((state) => state.interview.feedbackList[0]);

  const test = () => {
    console.log(gosim);
  };

  return (
    <S.page>
      <S.interviewerWrap>
        <S.videoSection>
          <S.videoWrap>
            <S.mainContainer>
              <S.mainVideo onClick={test}>
                말하는 사람 ? 메인 사람 화면
              </S.mainVideo>
            </S.mainContainer>
            <S.lastVideos>
              {peopleList.map((props, index) => (
                <S.lastVideoEach>{props.name}님의 화면입니다</S.lastVideoEach>
              ))}
            </S.lastVideos>
          </S.videoWrap>
        </S.videoSection>
        <S.secondSection>
          <InterviewerSection
            peopleList={peopleList}
            // questionList={questionList}
            // setQuestionList={setQuestionList}
            // feedbackList={feedbackList}
            // setFeedbackList={setFeedbackList}
          />
        </S.secondSection>
      </S.interviewerWrap>
    </S.page>
  );
};

export default StudyRoomInterviewer;
