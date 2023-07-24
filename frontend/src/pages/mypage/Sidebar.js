import { useNavigate } from "react-router-dom";
import classes from "./Sidebar.module.scss";

const Sidebar = () => {
    const navigate = useNavigate();

    const Profile = (e) => {
        e.preventDefault();
        navigate("/mypage/profile");
    };

    const ChangePassword = (e) => {
        e.preventDefault();
        navigate("/mypage/changepassword");
    };
    const Feedback = (e) => {
        e.preventDefault();
        navigate("/mypage/feedback");
    };
    const MyEssay = (e) => {
        e.preventDefault();
        navigate("/mypage/myessay");
    };

    return (
        <div>
            <div className={classes.sidebarWrap}>
                <div className={classes.sideMenu} onClick={Profile}>
                    회원 정보 조회
                </div>
                <div className={classes.sideMenu} onClick={ChangePassword}>
                    비밀번호 변경
                </div>
                <div className={classes.sideMenu} onClick={Feedback}>
                    피드백 아카이브
                </div>
                <div className={classes.sideMenu} onClick={MyEssay}>
                    자기소개서 관리
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
