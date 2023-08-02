// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../MypageSidebarPage";
import StarRating from "../../../components/mypage/StarRatingComponent";
import {user} from "../../../store/AuthStore"
import { useSelector } from "react-redux";
// import classes from "./Profile.module.scss";
import * as S from "../../../components/mypage/MypageStyledComponents";



const Profile = () => {
    // const id = useSelector((state) => state.auth.id);
    // const nickname = useSelector((state) => state.auth.nickname);
    // const email = useSelector((state) => state.auth.email);
    // user 자체를 가져오게 되면 state.auth.user
    // 대신 user가 자체적으로 정보를 가지고 있어야 함

    const {user} = useSelector((state) => state.auth);

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
                                <S.profileContent>{user.userId}</S.profileContent>
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
                                {/* <button variant="outlined">email 변경</button> */}
                                <S.Button>e-mail 변경</S.Button>
                                </S.profileContent>
                                <S.profileContent onClick={ChangeNickname}>
                                <S.Button>닉네임 변경</S.Button>
                                </S.profileContent>
                            </S.profileUpdate>
                        </S.profileInfo>
                        <br />
                        <h2>{user.nickname}님의 현재 평점</h2>
                        <hr />
                        <S.gradeGroup>
                            <S.grade>{user.averageRating}</S.grade>
                            <S.gradeStar>
                                <StarRating grade={user.averageRating} />
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
