// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

// import classes from "./Profile.module.scss";
import * as S from "../../../components/styledComponents/MyPageScomponents";

const Profile = () => {
    // const id = useSelector((state) => state.auth.id);
    // const nickname = useSelector((state) => state.auth.nickname);
    // const email = useSelector((state) => state.auth.email);
    // user 자체를 가져오게 되면 state.auth.user
    // 대신 user가 자체적으로 정보를 가지고 있어야 함

    const nickname = "그로밋";
    const id = "ssafy1226";
    const email = "ssafy1226@ssafy.com";

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

    return (
        <div>
            <S.profilePage>
                <Sidebar menu="profile" />
                <S.profileWrap>
                    <S.profileBox>
                        <h2>{nickname}님 반갑습니다!</h2>
                        <hr />
                        <S.profileImage></S.profileImage>
                        <S.profileInfo>
                            <S.profileKey>
                                <div>ID</div>
                                <div>EMAIL</div>
                                <div>닉네임</div>
                            </S.profileKey>
                            <S.profileDetail>
                                <div>{id}</div>
                                <div>{email}</div>
                                <div>{nickname}</div>
                            </S.profileDetail>
                            <S.profileUpdate>
                                <div onClick={ChangeEmail}>버튼 ㄱ</div>
                                <div onClick={ChangeNickname}>버튼 ㄱ</div>
                            </S.profileUpdate>
                        </S.profileInfo>
                        <br />
                        <h2>{nickname}님의 현재 평점</h2>
                        <hr />
                    </S.profileBox>

                    <div></div>
                </S.profileWrap>
            </S.profilePage>
        </div>
    );
};

export default Profile;
