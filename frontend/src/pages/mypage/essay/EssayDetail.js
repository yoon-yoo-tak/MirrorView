import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./EssayDetail.module.scss";
import Sidebar from "../Sidebar";

const EssayDetail = () => {
    const navigate = useNavigate();

    const { nickname } = useSelector((state) => state.auth);

    // const essayUpdate = (e) => {
    //     e.preventDefault();
    //     navigate("essaydetail/:id/update");
    // };

    return (
        <div>
            <div className={classes.essayDetailPage}>
                <Sidebar menu="essay" />
                <div className={classes.essayWrap}>
                    <div>{nickname}님의 자기소개서</div>
                    <hr />
                    {/* <button onClick={essayUpdate}>수정하기</button> */}
                    <div className="essayBox"></div>
                </div>
            </div>
        </div>
    );
};

export default EssayDetail;
