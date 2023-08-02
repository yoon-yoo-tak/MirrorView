// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// import {user} from "../../../../store/AuthStore"
import * as S from "../../StudyRoomStyledComponents";

const StudyMyEssay = () => {
    // 사용자 정보 더미데이터
    const user = {
        nickname: "그로밋",
        email: "ssafy@ssafy.com",
        averageRating: 4.2,
        essay: [
            { quest: "1번질문이에요", answer: "1번답변이에요" },
            { quest: "2번질문이에요", answer: "2번답변이에요" },
            { quest: "3번질문이에요", answer: "3번답변이에요" },
        ],
    };
    // const [essayList, setEssyList] = useState([]);
    // const {user} = useSelector((state) => state.auth);

    // useEffect(()=>{
    //     axios.get(`http://localhost:8080/api/mypage/essays?userId=${user.userId}`)
    //     .then(({data})=>{
    //         setEssyList(data.data);
    //         console.log(data);
    //     }).catch((error)=>{
    //         console.error(error);
    //     })
    // },[])

    return (
        <div>
            <S.myEssayWrap>
                <S.myEssayIntro>{user.nickname}님의 자기소개서</S.myEssayIntro>
                <S.myEssayContentWrap>
                    {user.essay.map((items, index) => (
                        <div>
                            <S.myQuestion>1. {items.quest}</S.myQuestion>
                            <S.myAnswer>{items.answer}</S.myAnswer>
                        </div>
                    ))}
                </S.myEssayContentWrap>
            </S.myEssayWrap>
        </div>
    );
};

export default StudyMyEssay;
