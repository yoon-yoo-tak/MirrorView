import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as S from "../../../StudyRoomStyledComponents";
import { interviewActions } from "store/InterviewStore";
import { addQuestion } from 'store/InterviewWebSocketStore';
import * as ST from "components/mypage/MypageStyledComponents";
const StudyProfileDetail = (props) => {
  const {
    profile,
    // questionList,
    // setQuestionList,
    // targetObject,
    // setTargetObject,
    // addQuestionToProfile,
  } = props;
  const [newQuestion, setNewQuestion] = useState("");
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log(profile);
  },[])
  const feedbackList = useSelector((state) => state.interviewWebSocket.feedbackList);
  // questionList : 사람과 질문 모두가 들어있는 객체 배열
  // 그러니 지금 프로필에 접속한 사람과 일치하는 객체만 뽑아와보자.

  // 사람과 질문들 덩어리 객체
  // 그니까 얘는 기존에 존재하던 애들을 일단 가져와본거다
  // 새로 질문을 입력받으면 추가해야하니까

  // 새로운 질문 입력시 input
  const handleQuestion = (e) => {
    setNewQuestion(e.target.value);
    console.log(profile);
  };

  // 입력된 질문을 질문 리스트에 업데이트!
  // const submitQuestion = () => {
  //     // input칸이 빈칸이 아닌지 일단 체크하고
  //     if (newQuestion.trim() !== "") {
  //         // 기존 질문 배열에 위에서 저장된 input인 newQuestion을 추가해주자
  //         setTargetObject((prevTarget) => ({
  //             ...prevTarget,
  //             questions: [...prevTarget.questions, newQuestion],
  //         }));
  //         // 그럼 타겟 객체(이 프로필에 해당하는 사람의 질문들)가 업데이트 됐으니까
  //         // 전체 questionList를 업데이트하자
  //         // 기존 객체들을 돌면서 name이 일치하는 객체를 tartgetObject로 대체한다.
  //         setQuestionList((prevList) =>
  //             prevList.map((item) =>
  //                 item.name === profile.name ? targetObject : item
  //             )
  //         );
  //     }
  // };
  // const updateMatchingObject = (value) => {
  //   const targetUserIdx = feedbackList.findIndex(
  //     (obj) => obj.nickname === profile.nickname
  //   );
  //   const updatedMatchingObject = {
  //     nickname:profile.nickname,
  //     feedbacks: [
  //       ...feedbackList[targetUserIdx].feedbacks,
  //       { question: value, feedback: [] },
  //     ],
  //   };

  //   return updatedMatchingObject;
  // };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      submitQuestion(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };
  const submitQuestion = () => {
    // if (newQuestion.trim() !== "") {
    //     setTargetObject((prevTarget) => ({
    //         ...prevTarget,
    //         questions: [...prevTarget.questions, newQuestion],
    //     }));

    //     addQuestionToProfile(newQuestion); // 새로운 질문을 부모 컴포넌트에 추가
    // }

    // const handleUpdateArray = (newQuestion) => {
    // const updatedMatchingObject = updateMatchingObject(newQuestion);
    dispatch(addQuestion({nickname:profile.nickname,question:newQuestion}));
    setNewQuestion("");
    console.log(feedbackList);
  };

  const imageStyle = {
    width: "160px",
    height: "160px",
    filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.4))",
    position: "relatice",
    borderRadius: "50%",
};

  return (
    <div>
      {profile.name === "" && <div>참여자를 클릭해서 정보를 확인하세요!</div>}
      {profile && (
        <S.profileWrap>
          <S.profileInfo>
          <ST.profileImage>
                <img
                    src={profile.photo}
                    alt="profileImage"
                    style={imageStyle}
                />
              </ST.profileImage>
            <S.profileKey>
              <S.profileContent>닉네임</S.profileContent>
              <S.profileContent>EMAIL</S.profileContent>
              <S.profileContent>평점</S.profileContent>
            </S.profileKey>
            <S.vLine />
            <S.profileDetail>
              <S.profileContent>{profile.nickname}</S.profileContent>
              <S.profileContent>{profile.email}</S.profileContent>
              <S.profileContent>{profile.rating}</S.profileContent>
            </S.profileDetail>
          </S.profileInfo>
          <S.questionWrap>
            <S.questInputText>
              {profile.nickname}님에게 사전 질문 등록하기
            </S.questInputText>
            <S.questSubmit>
              <S.questionInput
                value={newQuestion}
                onChange={handleQuestion}
                onKeyPress={handleOnKeyPress}
              />
              <S.questionButton onClick={submitQuestion}>
                질문등록
              </S.questionButton>
            </S.questSubmit>
          </S.questionWrap>
        </S.profileWrap>
      )}
    </div>
  );
};

export default StudyProfileDetail;
