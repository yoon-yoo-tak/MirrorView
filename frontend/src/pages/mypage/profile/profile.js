import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

import classes from "./Profile.module.scss";

const Profile = () => {
    const id = useSelector((state) => state.auth.id);
    const nickname = useSelector((state) => state.auth.nickname);
    const email = useSelector((state) => state.auth.email);
    // user 자체를 가져오게 되면 state.auth.user
    // 대신 user가 자체적으로 정보를 가지고 있어야 함

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
                <Sidebar />
                <div className={classes.profileWrap}>
                    <div className="profileBox">
                        <div>{nickname}님 반갑습니다!</div>
                        <hr />
                        <div className="profileImage"></div>
                        <div className={classes.profileInfo}>
                            <div className={classes.profileKey}>
                                <div>ID</div>
                                <div>EMAIL</div>
                                <div>닉네임</div>
                            </div>
                            <div className={classes.profileDetail}>
                                <div>{id}아이디임</div>
                                <div>{email}이메일임</div>
                                <div>{nickname}닉네임임</div>
                            </div>
                            <div className="profileUpdate">
                                <div onClick={ChangeEmail}>버튼 ㄱ</div>
                                <div onClick={ChangeNickname}>버튼 ㄱ</div>
                            </div>
                        </div>
                        <br />
                        <div>{nickname}님의 현재 평점</div>
                        <hr />
                    </div>

                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
