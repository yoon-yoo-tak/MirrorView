import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import classes from "./EssayDetail.module.scss";
import Sidebar from "../MypageSidebarPage";

import * as S from "../../../components/mypage/MypageStyledComponents";

const EssayDetail = () => {
    const navigate = useNavigate();

    const { nickname } = useSelector((state) => state.auth);

    // const essayUpdate = (e) => {
    //     e.preventDefault();
    //     navigate("essaydetail/:id/update");
    // };

    return (
        <div>
            <S.page>
                <Sidebar menu="essay" />
                <S.wrap>
                    <h2>{nickname}님의 자기소개서</h2>
                    <hr />
                    {/* <button onClick={essayUpdate}>수정하기</button> */}
                    <div className="essayBox"></div>
                </S.wrap>
            </S.page>
        </div>
    );
};

export default EssayDetail;
