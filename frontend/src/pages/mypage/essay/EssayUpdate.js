// import classes from "./EssayUpdate.module.scss";
import Sidebar from "../Sidebar";

import * as S from "../../../components/styledComponents/MyPageScomponents";

const EssayUpdate = () => {
    const essayUpdateComplete = () => {};
    return (
        <div>
            <S.page>
                <Sidebar menu="essay" />
                <S.wrap>
                    <div>자기소개서 수정하기</div>
                    <hr />
                    <button onClick={essayUpdateComplete}>수정하기</button>
                    <div className="essayBox"></div>
                </S.wrap>
            </S.page>
        </div>
    );
};

export default EssayUpdate;
