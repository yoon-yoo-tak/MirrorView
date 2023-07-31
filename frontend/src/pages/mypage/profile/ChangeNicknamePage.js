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
                        <div>닉네임 바꾸기 ㄱㄱ</div>
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
