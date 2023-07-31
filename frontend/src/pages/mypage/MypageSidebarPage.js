import { useNavigate } from "react-router-dom";
// import classes from "./Sidebar.module.scss";

import * as S from "../../components/mypage/MypageStyledComponents";

const Sidebar = ({ menu }) => {
    const navigate = useNavigate();

    const Profile = (e) => {
        e.preventDefault();
        navigate("/mypage/profile");
    };

    const ChangePassword = (e) => {
        e.preventDefault();
        navigate("/mypage/changepassword");
    };
    const Feedback = (e) => {
        e.preventDefault();
        navigate("/mypage/feedback");
    };
    const MyEssay = (e) => {
        e.preventDefault();
        navigate("/mypage/myessay");
    };

    return (
        <div>
            <S.sidebarWrap>
                <S.sideMenuWrap>
                    <div>
                        {menu === "profile" ? (
                            <S.sideMenuNow onClick={Profile}>
                                <S.pf_icon />
                                <div>회원 정보 조회</div>
                            </S.sideMenuNow>
                        ) : (
                            <S.sideMenu onClick={Profile}>
                                <S.pf_icon />
                                <div>회원 정보 조회</div>
                            </S.sideMenu>
                        )}
                    </div>
                    <div>
                        {menu === "password" ? (
                            <S.sideMenuNow onClick={ChangePassword}>
                                <S.pc_icon />
                                <div>비밀번호 변경</div>
                            </S.sideMenuNow>
                        ) : (
                            <S.sideMenu onClick={ChangePassword}>
                                <S.pc_icon />
                                <div>비밀번호 변경</div>
                            </S.sideMenu>
                        )}
                    </div>
                    <div>
                        {menu === "feedback" ? (
                            <S.sideMenuNow onClick={Feedback}>
                                <S.fb_icon />
                                <div>피드백 아카이브</div>
                            </S.sideMenuNow>
                        ) : (
                            <S.sideMenu onClick={Feedback}>
                                <S.fb_icon />
                                <div>피드백 아카이브</div>
                            </S.sideMenu>
                        )}
                    </div>
                    <div>
                        {menu === "essay" ? (
                            <S.sideMenuNow onClick={MyEssay}>
                                <S.es_icon />
                                <div>자기소개서 관리</div>
                            </S.sideMenuNow>
                        ) : (
                            <S.sideMenu onClick={MyEssay}>
                                <S.es_icon />
                                <div>자기소개서 관리</div>
                            </S.sideMenu>
                        )}
                    </div>
                </S.sideMenuWrap>
            </S.sidebarWrap>
        </div>
    );
};

export default Sidebar;
