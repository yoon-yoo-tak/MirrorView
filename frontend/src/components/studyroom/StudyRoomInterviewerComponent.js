import * as S from "./StudyRoomStyledComponents";
import InterviewerSection from "./studyroominterviewer/InterviewerSectionComponent";

import { useSelector } from "react-redux";
import { interviewActions } from "store/InterviewStore";
import SubscriberVideo from "./studyroominterviewer/SubscriberVideo";
import { useEffect, useState } from "react";
const StudyRoomInterviewer = (props) => {
  const {
    peopleList,
    streamManager,
    subscribers,
    questionList,
    setQuestionList,
    // feedbackList,
    setFeedbackList,
  } = props;

  const gosim = useSelector((state) => state.interview.feedbackList[0]);
  const [selectSubscriber,setSelectSubscriber] = useState(null);

  const test = (e) => {
        setSelectSubscriber(e);
    };

  return (
    <S.page>
      <S.interviewerWrap>
        <S.videoSection>
          <S.videoWrap>
            <S.mainContainer>
                <S.mainVideo>
                    <SubscriberVideo subscriber={selectSubscriber}>
                    </SubscriberVideo>
                </S.mainVideo>
            </S.mainContainer>
              <S.lastVideos>
                  {subscribers.map((sub) => (
                      <S.lastVideoEach onClick={()=>test(sub)}>
                          {JSON.parse(sub.stream.connection.data).clientData}님의 화면입니다
                          <SubscriberVideo subscriber={sub} key={sub.stream.connection.connectionId}>
                          </SubscriberVideo>
                      </S.lastVideoEach>
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
