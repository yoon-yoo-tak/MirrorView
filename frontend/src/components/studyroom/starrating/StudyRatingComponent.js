import { useState } from "react";

import * as S from "../StudyRoomStyledComponents";
import Rating from "@mui/material/Rating";

const StudyRating = ({ peopleList }) => {
    const [ratingData, setRatingdata] = useState([]);

    const handleRatingChange = (name) => (newValue) => {
        const target = ratingData.find((person) => person.nickname === name);
        if (target) {
            setRatingdata((prevData) =>
                prevData.map((item) =>
                    item.nickname === name ? { ...item, rate: newValue } : item
                )
            );
        } else {
            setRatingdata((prevData) => [
                ...prevData,
                { nickname: name, rate: newValue },
            ]);
        }
    };

    const handleSubmit = () => {
        if (ratingData.length === peopleList.length - 1) {
            ratingData.forEach((item) => {
                // 각 데이터에 대한 api 호출
                // console.log(`${item.nickname}  호춝ㄱ`);
                // navigate()
            });
        } else {
            alert("모든 참여자에 대해 별점을 눌러주세요!");
        }
    };

    return (
        <S.ratingBackDrop>
            <S.ratingPage>
                <S.ratingWrap>
                    <S.ratingTitle>
                        <div>참여자들에게 별점을 남겨주세요!</div>
                    </S.ratingTitle>
                    <S.ratingSection>
                        {peopleList.map((person, index) => (
                            <S.ratingContent>
                                <div>{person.name}님</div>
                                <Rating
                                    name="star-rating"
                                    defaultValue={0}
                                    value={ratingData.rate}
                                    precision={0.5}
                                    size="large"
                                    onChange={(event, newValue) =>
                                        handleRatingChange(person.name)(
                                            newValue
                                        )
                                    }
                                />
                            </S.ratingContent>
                        ))}
                    </S.ratingSection>
                    <S.ratingButton onClick={handleSubmit}>
                        제출하기
                    </S.ratingButton>
                </S.ratingWrap>
            </S.ratingPage>
        </S.ratingBackDrop>
    );
};

export default StudyRating;
