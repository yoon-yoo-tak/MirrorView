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
            {
                quest: "3번질문이에요",
                answer: "솔직히, 말할게 많이 기다려 왔어너도 그랬을 거라 믿어오늘이 오길 매일같이 달력을 보면서솔직히, 나에게도, 지금 이 순간은꿈만 같아, 너와 함께라오늘을 위해 꽤 많은 걸 준비해 봤어ll about you and I, 다른 건 다 제쳐 두고Now come with me, take my hand아름다운 청춘의 한 장 함께 써내려 가자너와의 추억들로 가득 채울래 (come on!)아무 걱정도 하지는 마, 나에게 다 맡겨 봐지금 이 순간이 다시 넘겨볼 수 있는한 페이지가 될 수 있게Yah, yeah-oh, yah, yo-oh, this is our pageYah, yeah-oh, yah, yo-oh, our page솔직히, 말할게 지금이 오기까지마냥 순탄하진 않았지오늘이 오길 나도 목 빠져라 기다렸어 솔직히, 나보다도 네가 몇 배는 더힘들었을 거라고 믿어오늘을 위해 그저 견뎌줘서 고마워All about you and I, 다른 건 다 제쳐 두고Now come with me, take my hand아름다운 청춘의 한 장 함께 써내려 가자추억들로 가득 채울래 (come on!)아무 걱정도 하지는 마, 나에게 다 맡겨 봐지금 이 순간이 다시 넘겨볼 수 있는한 페이지가 될 수 있게Want you to come on out and have funWant us to have the time of our life추억들로 가득 채울래 (come on!)아무 걱정도 하지는 마, 나에게 다 맡겨 봐지금 이 순간이 다시 넘겨볼 수 있는한 페이지가 될 수 있게Yah, yeah-oh, yah, yo-oh, this is our pageYah, yeah-oh, yah, yo-oh, our page 솔직히, 말할게 많이 기다려 왔어너도 그랬을 거라 믿어오늘이 오길 매일같이 달력을 보면서솔직히, 나에게도, 지금 이 순간은꿈만 같아, 너와 함께라오늘을 위해 꽤 많은 걸 준비해 봤어ll about you and I, 다른 건 다 제쳐 두고Now come with me, take my hand아름다운 청춘의 한 장 함께 써내려 가자너와의 추억들로 가득 채울래 (come on!)아무 걱정도 하지는 마, 나에게 다 맡겨 봐지금 이 순간이 다시 넘겨볼 수 있는한 페이지가 될 수 있게Yah, yeah-oh, yah, yo-oh, this is our pageYah, yeah-oh, yah, yo-oh, our page솔직히, 말할게 지금이 오기까지마냥 순탄하진 않았지오늘이 오길 나도 목 빠져라 기다렸어 솔직히, 나보다도 네가 몇 배는 더힘들었을 거라고 믿어오늘을 위해 그저 견뎌줘서 고마워All about you and I, 다른 건 다 제쳐 두고Now come with me, take my hand아름다운 청춘의 한 장 함께 써내려 가자추억들로 가득 채울래 (come on!)아무 걱정도 하지는 마, 나에게 다 맡겨 봐지금 이 순간이 다시 넘겨볼 수 있는한 페이지가 될 수 있게Want you to come on out and have funWant us to have the time of our life추억들로 가득 채울래 (come on!)아무 걱정도 하지는 마, 나에게 다 맡겨 봐지금 이 순간이 다시 넘겨볼 수 있는한 페이지가 될 수 있게Yah, yeah-oh, yah, yo-oh, this is our pageYah, yeah-oh, yah, yo-oh, our page ",
            },
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
                <hr />
                <S.myEssayContentWrap>
                    {user.essay.map((items, index) => (
                        <S.essaySet>
                            <S.myQuestion>
                                {index + 1}. {items.quest}
                            </S.myQuestion>
                            <S.myAnswer>{items.answer}</S.myAnswer>
                        </S.essaySet>
                    ))}
                </S.myEssayContentWrap>
            </S.myEssayWrap>
        </div>
    );
};

export default StudyMyEssay;
