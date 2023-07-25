import { useNavigate } from "react-router-dom";
import classes from "./Sidebar.module.scss";

import pfImage from "../../assets/sidebar/🦆 icon _person outline_.png";
import pcImage from "../../assets/sidebar/🦆 icon _people outline_.png";
import fbImage from "../../assets/sidebar/🦆 icon _book open outline_.png";
import essayImage from "../../assets/sidebar/🦆 icon _file text outline_.png";

const Sidebar = ({ menu }) => {
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
                <div className={classes.sideMenuWrap}>
                    <div
                        className={`${classes.sideMenu} ${
                            menu === "profile" ? classes.sideMenuNow : ""
                        }`}
                        onClick={Profile}
                    >
                        <img
                            src={pfImage}
                            className={classes.icons}
                            alt="pfImage"
                        />
                        <div>회원 정보 조회</div>
                    </div>
                    <div
                        className={`${classes.sideMenu} ${
                            menu === "password" ? classes.sideMenuNow : ""
                        }`}
                        onClick={ChangePassword}
                    >
                        <img
                            src={pcImage}
                            className={classes.icons}
                            alt="pcImage"
                        />
                        <div>비밀번호 변경</div>
                    </div>
                    <div
                        className={`${classes.sideMenu} ${
                            menu === "feedback" ? classes.sideMenuNow : ""
                        }`}
                        onClick={Feedback}
                    >
                        <img
                            src={fbImage}
                            className={classes.icons}
                            alt="fbImage"
                        />
                        <div>피드백 아카이브</div>
                    </div>
                    <div
                        className={`${classes.sideMenu} ${
                            menu === "essay" ? classes.sideMenuNow : ""
                        }`}
                        onClick={MyEssay}
                    >
                        <img
                            src={essayImage}
                            className={classes.icons}
                            alt="essayImage"
                        />
                        <div>자기소개서 관리</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
