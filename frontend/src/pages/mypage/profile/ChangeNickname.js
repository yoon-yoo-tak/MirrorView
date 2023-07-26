import Sidebar from "../Sidebar";
// import classes from "./ChangeNickname.module.scss";

import * as S from "../../../components/styledComponents/MyPageScomponents";

const ChangeNickname = () => {
    return (
        <div>
            <S.page>
                <Sidebar menu="profile" />

                <S.wrap>
                    <h2>닉네임 변경하기</h2>
                    <hr />
                </S.wrap>
            </S.page>
        </div>
    );
};

export default ChangeNickname;
