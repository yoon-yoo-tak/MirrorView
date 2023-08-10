import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as S from "../../../StudyRoomStyledComponents";
import { interviewActions } from "store/InterviewStore";
import { addQuestion } from "store/InterviewWebSocketStore";
import * as ST from "components/mypage/MypageStyledComponents";
import ProfileModal from "components/ProfileModal";
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
    useEffect(() => {
        console.log(profile);
    }, []);
    const feedbackList = useSelector(
        (state) => state.interviewWebSocket.feedbackList
    );
    // questionList : 사람과 질문 모두가 들어있는 객체 배열
    // 그러니 지금 프로필에 접속한 사람과 일치하는 객체만 뽑아와보자.

    // 사람과 질문들 덩어리 객체
    // 그니까 얘는 기존에 존재하던 애들을 일단 가져와본거다
    // 새로 질문을 입력받으면 추가해야하니까

    const showProfile = (nickname) => {};

    const imageStyle = {
        width: "8rem",
        height: "8rem",
        filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.4))",
        borderRadius: "50%",
    };

    return (
        <div>
            {profile.name === "" && (
                <div>참여자를 클릭해서 정보를 확인하세요!</div>
            )}
            {profile && (
                <S.profileWrap>
                    {/* <div> */}
                    <S.profileImageWrap>
                        <img
                            src={profile.photo}
                            alt="profileImage"
                            style={imageStyle}
                        />
                        <div>
                            <S.goProfile
                                onClick={showProfile(profile.nickname)}
                            >
                                프로필 상세보기
                            </S.goProfile>
                        </div>
                    </S.profileImageWrap>
                    <S.profileInfo>
                        <S.profileKey>
                            <S.profileContent>닉네임</S.profileContent>
                            <S.profileContent>EMAIL</S.profileContent>
                            <S.profileContent>평점</S.profileContent>
                        </S.profileKey>
                        <S.vLine />
                        <S.profileDetail>
                            <S.profileContent>
                                {profile.nickname}
                            </S.profileContent>
                            <S.profileContent>{profile.email}</S.profileContent>
                            <S.profileContent>
                                {profile.rating}
                            </S.profileContent>
                        </S.profileDetail>
                    </S.profileInfo>
                    {/* </div> */}
                </S.profileWrap>
            )}
        </div>
    );
};

export default StudyProfileDetail;
