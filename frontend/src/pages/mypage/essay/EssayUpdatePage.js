// import classes from "./EssayUpdate.module.scss";
import Sidebar from "../MypageSidebarPage";

import * as S from "../../../components/mypage/MypageStyledComponents";

const EssayUpdate = () => {
    const essayUpdateComplete = () => {};
    return (
        <div>
            <S.page>
                <Sidebar menu="essay" />
                <S.wrap>
                    <h2>자기소개서 수정하기</h2>
                    <hr />
                    <button onClick={essayUpdateComplete}>저장하기</button>
                    <div className="essayBox"></div>
                </S.wrap>
            </S.page>
        </div>
    );
};

export default EssayUpdate;
