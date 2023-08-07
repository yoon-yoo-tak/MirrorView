import * as S from "../../StudyRoomStyledComponents";

const StudyMyEssaySelected = ({
    selectedEssay,
    selectedValueIndex,
    mainEssay,
    setMainEssay,
    isMainChecked,
    setMainChecked,
}) => {
    const handleMain = () => {
        if (window.confirm("현재 자소서를 메인으로 설정하시겠습니까?")) {
            setMainEssay(selectedValueIndex);
            setMainChecked(true);
            alert(`${selectedEssay.title}이(가) 메인 자소서로 설정되었습니다.`);
        }
    };
    return (
        <div onClick={handleMain}>
        {selectedEssay && selectedEssay.essayDetails && selectedEssay.essayDetails.map((items, index) => (
            <S.essaySet key={items.id}>
                <S.myQuestion>
                    {index + 1}. {items.question}
                </S.myQuestion>
                <S.myAnswer>{items.answer}</S.myAnswer>
            </S.essaySet>
        ))}
    </div>
    );
};

export default StudyMyEssaySelected;
