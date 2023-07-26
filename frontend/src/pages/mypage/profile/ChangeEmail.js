import Sidebar from "../Sidebar";
// import classes from "./ChangeEmail.module.scss";

import * as S from "../../../components/styledComponents/MyPageScomponents";

const ChangeEmail = () => {
    return (
        <div>
            <S.page>
                <Sidebar menu="profile" />
                <S.wrap>
                    <h2>이메일 변경하기</h2>
                    <hr />
                </S.wrap>
            </S.page>
        </div>
    );
};

export default ChangeEmail;
