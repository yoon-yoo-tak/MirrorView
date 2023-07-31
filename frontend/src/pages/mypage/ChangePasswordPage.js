// import { useState } from "react";
import Sidebar from "./MypageSidebarPage";
import ChangePwComponent from "../../components/mypage/ChangePasswordComponent";
import * as S from "../../components/mypage/MypageStyledComponents";

const ChangePassword = () => {
    return (
        <div>
            <S.page>
                <Sidebar menu="password" />
                <S.wrap>
                    <h2>비밀번호 변경</h2>
                    <hr />
                    <div>
                        <div>비밀번호를 바꾸려면 확인을 해야해요!</div>
                        <S.formComponent>
                            <ChangePwComponent />
                        </S.formComponent>
                    </div>
                </S.wrap>
            </S.page>
        </div>
    );
};

export default ChangePassword;
