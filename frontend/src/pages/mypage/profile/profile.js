import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

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
            <div>
                <Sidebar />
            </div>
            <div className="profileWrap">
                <div className="profileBox">
                    <div>{nickname}님 반갑습니다!</div>

                    <div className="profileImage"></div>
                    <div className="profileInfo">
                        <div className="profileKey">
                            <div>ID</div>
                            <div>EMAIL</div>
                            <div>닉네임</div>
                        </div>
                        <div className="profileDetail">
                            <div>{id}</div>
                            <div>{email}</div>
                            <div>{nickname}</div>
                        </div>
                        <div className="profileUpdate">
                            <div onClick={ChangeEmail}>버튼 ㄱ</div>
                            <div onClick={ChangeNickname}>버튼 ㄱ</div>
                        </div>
                    </div>
                </div>
                <div>{nickname}님의 현재 평점</div>

                <div></div>
            </div>
        </div>
    );
};

export default Profile;
