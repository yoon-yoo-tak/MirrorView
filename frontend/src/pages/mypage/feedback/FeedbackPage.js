import { useSelector } from "react-redux";
// import { useState } from "react";

import Sidebar from "../MypageSidebarPage";
import FeedbackComponent from "../../../components/mypage/FeedbackComponent";

import * as S from "../../../components/mypage/MypageStyledComponents";

const Feedback = () => {
    const nickname = useSelector((state) => state.auth.nickname);

    return (
        <div>
            <S.page>
                <Sidebar menu="feedback" />
                <S.wrap>
                    <h2>{nickname}님의 아카이브</h2>
                    <hr />
                    <div>
                        <div>{nickname}님에게 전달된 피드백들이에요!</div>
                        <FeedbackComponent />
                    </div>
                </S.wrap>
            </S.page>
        </div>
    );
};

export default Feedback;
