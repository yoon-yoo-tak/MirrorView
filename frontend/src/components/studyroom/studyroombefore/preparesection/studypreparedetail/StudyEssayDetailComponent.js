import * as S from "../../../StudyRoomStyledComponents";

const StudyEssayDetail = ({ essay }) => {

    if(!essay){
        return(
            <div>
                <S.essayDetailWrap>
                    사용자를 선택하세요.
                </S.essayDetailWrap>
            </div>
        )
    }
    return (
        <div>
            <S.essayDetailWrap>
                {essay.title}
                {essay.essayDetails.map((item, index) => (
                    <S.essayDetailEach key={index}>
                        <S.essayDetailQuest>
                            {index + 1}. {item.question}
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
