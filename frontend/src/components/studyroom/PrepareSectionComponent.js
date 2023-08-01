import * as S from "./StudyRoomStyledComponents";

const PrepareSection = (props) => {
    return (
        <S.sectionPage>
            <S.sectionWrap>네모네모박스</S.sectionWrap>
            <S.sectionSelectTaps>
                <S.sectionSelectTap>첫번쨰</S.sectionSelectTap>
                <S.sectionSelectTap>두번쨰</S.sectionSelectTap>
                <S.sectionSelectTap>세번쨰</S.sectionSelectTap>
                <S.sectionSelectTap>네번째</S.sectionSelectTap>
            </S.sectionSelectTaps>
        </S.sectionPage>
    );
};

export default PrepareSection;
