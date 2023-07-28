// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import StarRating from "../../../components/mypage/StarRating";

// import classes from "./Profile.module.scss";
import * as S from "../../../components/styledComponents/MyPageScomponents";

const Profile = () => {
    // const id = useSelector((state) => state.auth.id);
    // const nickname = useSelector((state) => state.auth.nickname);
    // const email = useSelector((state) => state.auth.email);
    // user 자체를 가져오게 되면 state.auth.user
    // 대신 user가 자체적으로 정보를 가지고 있어야 함

    const user = {
        id: "ssafy1226",
        nickname: "그로밋",
        email: "ssafy1226@ssafy.com",
        grade: 0.3,
    };

    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const ChangeNickname = (e) => {
        e.preventDefault();
        navigate("/mypage/changenickname");
    };

    const ChangeEmail = (e) => {
        e.preventDefault();
        navigate("/mypage/changeemail");
    };

    const hidden = {
        visibility: "hidden",
    };

    return (
        <div>
            <S.profilePage>
                <Sidebar menu="profile" />
                <S.profileWrap>
                    <S.profileBox>
                        <h2>{user.nickname}님 반갑습니다!</h2>
                        <hr />
                        <S.profileInfo>
                            <S.profileImage />
                            <S.profileKey>
                                <S.profileContent>ID</S.profileContent>
                                <S.profileContent>EMAIL</S.profileContent>
                                <S.profileContent>닉네임</S.profileContent>
                            </S.profileKey>
                            <S.vLine></S.vLine>
                            <S.profileDetail>
                                <S.profileContent>{user.id}</S.profileContent>
                                <S.profileContent>
                                    {user.email}
                                </S.profileContent>
                                <S.profileContent>
                                    {user.nickname}
                                </S.profileContent>
                            </S.profileDetail>
                            <S.profileUpdate>
                                <S.profileContent style={hidden}>
                                    숨김
                                </S.profileContent>
                                <S.profileContent onClick={ChangeEmail}>
                                    버튼 ㄱ
                                </S.profileContent>
                                <S.profileContent onClick={ChangeNickname}>
                                    버튼 ㄱ
                                </S.profileContent>
                            </S.profileUpdate>
                        </S.profileInfo>
                        <br />
                        <h2>{user.nickname}님의 현재 평점</h2>
                        <hr />
                        <S.gradeGroup>
                            <S.grade>{user.grade}</S.grade>
                            <S.gradeStar>
                                <StarRating grade={user.grade} />
                            </S.gradeStar>
                        </S.gradeGroup>
                    </S.profileBox>

                    <div></div>
                </S.profileWrap>
            </S.profilePage>
        </div>
    );
};

export default Profile;
