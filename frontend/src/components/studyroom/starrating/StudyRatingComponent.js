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
                console.log(`${item.nickname}  호춝ㄱ`);
            });
        } else {
            alert("모든 사람의 평점을 누르라고");
        }
    };

    return (
        <S.ratingBackDrop>
            <S.ratingPage>
                <S.ratingWrap>
                    <S.ratingTitle>면접 잘 참여했는지 평점 ㄱㄱ</S.ratingTitle>
                    <div>
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
                    </div>
                    <button onClick={handleSubmit}>제출하기</button>
                </S.ratingWrap>
            </S.ratingPage>
        </S.ratingBackDrop>
    );
};

export default StudyRating;
