import * as S from "./StudyStyledComponents";
import { useState, useEffect } from "react";

const StudyRoomCategory = () => {
    const [firstCategory, setFirstCategory] = useState("선택하세요");
    const [secondCategory, setSecondCategory] = useState("선택하세요");

    // 임의 카테고리 데이터
    const firstCategories = ["선택하세요", "첫번째", "두번째", "세번쨰"];
    const secondCategories = ["선택하세요", "first", "second", "third"];

    useEffect(() => {
        // 이 카테고리 컴포넌트가 실행될 때
        // 부모 카테고리 목록 api 호출?
    }, []);

    const handleFirstCategory = (e) => {
        setFirstCategory(e.target.value);
        // + 자식 카테고리 api 호출해서 지금 state에 자식 카테고리를 저장?
    };

    const handleSubmit = () => {
        // 입력된 카테고리에 따른 스터디 방 목록 조회
    };

    return (
        <S.categoryPage>
            <S.categoryWrap>
                <S.categoryList>
                    <S.categoryDiv>
                        <div>상위 카테고리</div>
                        <S.categorySelect
                            value={firstCategory}
                            onChange={handleFirstCategory}
                        >
                            {firstCategories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </S.categorySelect>
                    </S.categoryDiv>
                    <S.categoryDiv>
                        <div>하위 카테고리</div>
                        <S.categorySelect
                            value={secondCategory}
                            onChange={(e) => setSecondCategory(e.target.value)}
                        >
                            {secondCategories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </S.categorySelect>
                    </S.categoryDiv>
                </S.categoryList>
                <S.categoryButton onChange={handleSubmit}>
                    조회
                </S.categoryButton>
            </S.categoryWrap>
        </S.categoryPage>
    );
};

export default StudyRoomCategory;
