import * as S from "../../StudyRoomStyledComponents";

const StudyMyEssaySelected = ({
    selectedValue,
    selectedValueIndex,
    mainEssay,
    setMainEssay,
    checkedMain,
    setCheckedMain,
}) => {
    const handleMain = () => {
        if (window.confirm("현재 자소서를 메인으로 설정하시겠습니까?")) {
            setMainEssay(selectedValueIndex);
            setCheckedMain(true);
            alert(`${selectedValue.title}이(가) 메인 자소서로 설정되었습니다.`);
        }
    };
    return (
        <div onClick={handleMain}>
            {selectedValue.content.map((items, index) => (
                <S.essaySet>
                    <S.myQuestion>
                        {index + 1}. {items.quest}
                    </S.myQuestion>
                    <S.myAnswer>{items.answer}</S.myAnswer>
                </S.essaySet>
            ))}
            {/* <button onClick={click}>클릭</button> */}
        </div>
    );
};

export default StudyMyEssaySelected;
