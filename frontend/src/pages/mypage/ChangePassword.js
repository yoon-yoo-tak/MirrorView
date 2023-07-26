// import { useState } from "react";
import Sidebar from "./Sidebar";

import * as S from "../../components/styledComponents/MyPageScomponents";

// import classes from "./ChangePassword.module.scss";

const ChangePassword = () => {
    return (
        <div>
            <S.page>
                <Sidebar menu="password" />
                <S.wrap>
                    <h2>비밀번호 변경</h2>
                    <hr />
                </S.wrap>
            </S.page>
        </div>
    );
};

export default ChangePassword;
