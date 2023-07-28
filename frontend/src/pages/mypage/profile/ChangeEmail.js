import Sidebar from "../Sidebar";
// import classes from "./ChangeEmail.module.scss";
import ChangeEmailComponent from "../../../components/mypage/ChangeEmailComponent";
import * as S from "../../../components/styledComponents/MyPageScomponents";

const ChangeEmail = () => {
    return (
        <div>
            <S.page>
                <Sidebar menu="profile" />
                <S.wrap>
                    <h2>이메일 변경하기</h2>
                    <hr />
                    <div>
                        <div>이메일 바꾸기 ㄱㄱ</div>
                        <S.formComponent>
                            <ChangeEmailComponent />
                        </S.formComponent>
                    </div>
                </S.wrap>
            </S.page>
        </div>
    );
};

export default ChangeEmail;
