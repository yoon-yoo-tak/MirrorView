import * as S from "../../../StudyRoomStyledComponents";

const StudyEssayDetail = ({ essay }) => {
    return (
        <div>
            <S.essayDetailWrap>
                {essay.map((item, index) => (
                    <S.essayDetailEach key={index}>
                        <S.essayDetailQuest>
                            {index + 1}. {item.quest}
                        </S.essayDetailQuest>
                        <S.essayDetailContent>
                            {item.answer}
                        </S.essayDetailContent>
                    </S.essayDetailEach>
                ))}
            </S.essayDetailWrap>
        </div>
    );
};

export default StudyEssayDetail;
