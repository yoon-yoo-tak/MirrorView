import Sidebar from "../Sidebar";
import classes from "./ChangeEmail.module.scss";

const ChangeEmail = () => {
    return (
        <div>
            <div className={classes.changeEmailPage}>
                <Sidebar menu="profile" />
                <div className={classes.ChangeEmailWrap}>이메일 변경</div>
            </div>
        </div>
    );
};

export default ChangeEmail;
