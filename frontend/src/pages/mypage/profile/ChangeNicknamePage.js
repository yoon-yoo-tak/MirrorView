import Sidebar from "../MypageSidebarPage";
// import classes from "./ChangeNickname.module.scss";

import * as S from "../../../components/mypage/MypageStyledComponents";
import ChangeNicknameComponent from "../../../components/mypage/ChangeNicknameComponent";
const ChangeNickname = () => {
    return (
        <div>
            <S.page>
                <Sidebar menu="profile" />

                <S.wrap>
                    <h2>닉네임 변경하기</h2>
                    <hr />
                    <div>
                        <div>비속어가 포함되어 있는 닉네임을 사용시 제재당할 수 있습니다.</div>
                        <S.formComponent>
                            <ChangeNicknameComponent />
                        </S.formComponent>
                    </div>
                </S.wrap>
            </S.page>
        </div>
    );
};

export default ChangeNickname;
