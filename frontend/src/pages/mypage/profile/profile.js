// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

import classes from "./Profile.module.scss";

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
            <div className={classes.profilePage}>
                <Sidebar menu="profile" />
                <div className={classes.profileWrap}>
                    <div className={classes.profileBox}>
                        <h2>{nickname}님 반갑습니다!</h2>
                        <hr />
                        <div className="profileImage"></div>
                        <div className={classes.profileInfo}>
                            <div className={classes.profileKey}>
                                <div>ID</div>
                                <div>EMAIL</div>
                                <div>닉네임</div>
                            </div>
                            <div className={classes.profileDetail}>
                                <div>{id}</div>
                                <div>{email}</div>
                                <div>{nickname}</div>
                            </div>
                            <div className="profileUpdate">
                                <div onClick={ChangeEmail}>버튼 ㄱ</div>
                                <div onClick={ChangeNickname}>버튼 ㄱ</div>
                            </div>
                        </div>
                        <br />
                        <h2s>{nickname}님의 현재 평점</h2s>
                        <hr />
                    </div>

                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
