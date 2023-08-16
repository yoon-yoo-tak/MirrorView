import * as S from "../StudyRoomStyledComponents";

const PrepareTap = (props) => {
    return (
        <div>
            <S.sectionSelectTap>
                {props.menu === "info" && <div>정보</div>}
                {props.menu === "quest" && <div>질문</div>}
                {props.menu === "myInfo" && <div>내정보</div>}
                {props.menu === "chat" && <div>채팅</div>}
            </S.sectionSelectTap>
        </div>
    );
};

export default PrepareTap;
