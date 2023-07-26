import Sidebar from "../Sidebar";

import * as S from "../../../components/styledComponents/MyPageScomponents";

const EssayCreate = () => {
    return (
        <div>
            <S.page>
                <Sidebar menu="essay" />
                <S.wrap>
                    <div>자기소개서 작성하기</div>
                    <button>작성하기</button>
                    <div className="essayCreateBox">
                        <div className="essayTitle">
                            <input />
                        </div>
                        <div className="essayContentBox">
                            <input />
                        </div>
                    </div>
                </S.wrap>
            </S.page>
        </div>
    );
};

export default EssayCreate;
