// import { useState } from "react";
import Sidebar from "./Sidebar";

import classes from "./ChangePassword.module.scss";

const ChangePassword = () => {
    return (
        <div>
            <div className={classes.cpPage}>
                <Sidebar menu="password" />
                <div className={classes.cpWrap}>
                    <div>비밀번호 변경</div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
