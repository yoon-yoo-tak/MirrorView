import Sidebar from "../Sidebar";

import * as S from "../../../components/styledComponents/MyPageScomponents";

const EssayCreate = () => {
    return (
        <div>
            <S.page>
                <Sidebar menu="essay" />
                <S.wrap>
                    <h2>자기소개서 작성하기</h2>
                    <hr />
                    <div>
                        <S.btn theme="save">저장하기</S.btn>
                        <div className="essayCreateBox">
                            <div className="essayTitle">
                                <input />
                            </div>
                            <div className="essayContentBox">
                                <input />
                            </div>
                        </div>
                    </div>
                </S.wrap>
            </S.page>
        </div>
    );
};

export default EssayCreate;
