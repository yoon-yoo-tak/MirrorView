import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import classes from "./EssayDetail.module.scss";
import Sidebar from "../Sidebar";

import * as S from "../../../components/styledComponents/MyPageScomponents";

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
                    <div>{nickname}님의 자기소개서</div>
                    <hr />
                    {/* <button onClick={essayUpdate}>수정하기</button> */}
                    <div className="essayBox"></div>
                </S.wrap>
            </S.page>
        </div>
    );
};

export default EssayDetail;
