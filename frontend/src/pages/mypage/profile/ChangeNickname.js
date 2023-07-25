import Sidebar from "../Sidebar";
import classes from "./ChangeNickname.module.scss";

const ChangeNickname = () => {
    return (
        <div>
            <div className={classes.changeNicknamePage}>
                <Sidebar menu="profile" />

                <div className={classes.changeNicknameWrap}>닉네임 변경</div>
            </div>
        </div>
    );
};

export default ChangeNickname;
