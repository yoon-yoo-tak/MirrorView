import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {user} from "../../../../store/AuthStore"
import * as S from "../../StudyRoomStyledComponents";
import StudyMyEssaySelected from "./StudyMyEssaySelectedComponent";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const StudyMyEssay = () => {
    // 사용자 정보 더미데이터
    // const {user} = useSelector((state)=>state.auth);
    //
    // const [essayList, setEssyList] = useState([]);
    
    const user = {
        nickname: "그로밋",
        email: "ssafy@ssafy.com",
        averageRating: 4.2,
        essay: [
            {
                title: "1번 자소서",
                content: [
                    {
                        quest: "1번 자소서 1번 질문이에요",
                        answer: "1번자소서 1번 답변 와랄라라라라랄",
                    },
                    { quest: "2번질문이에요", answer: "답변이에요" },
                    {
                        quest: "3번질문이에요",
                        answer: "길 매일같이 달력을 보면서솔직히, 나에게도, 지금 이 순간은꿈만 같아, 너와 함께라오늘을 위해 꽤 많은 걸 준비해 봤어ll about you and I, 다른 건 다 제쳐 두고Now come with me, take my hand아름다운 청춘의 한 장 함께 써내려 가자너와의 추억들로 가득 채울래 (come on!)아무 걱정도 하지는 마, 나에게 다 맡겨 봐지금 이 순간이 다시 넘겨볼 수 있는한 페이지가 될 수 있게Yah, yeah-oh, yah, yo-oh, this is our pageYah, yeah-oh, yah, yo-oh, our page솔직히, 말할게 지금이 오기까지마냥 순탄하진 않았지오늘이 오길 나도 목 빠져라 기다렸어 솔직히, 나보다도 네가 몇 배는 더힘들었을 거라고 믿어오늘을 위해 그저 견뎌줘서 고마워All about you and I, 다른 건 다 제쳐 두고Now come with me, take my hand아름다운 청춘의 한 장 함께 써내려 가자추억들로 가득 채울래 (come on!)아무 걱정도 하지는 마, 나에게 다 맡겨 봐지금 이 순간이 다시 넘겨볼 수 있는한 페이지가 될 수 있게Want you to come on out and have funWant us to have the time of our life추억들로 가득 채울래 (come on!)아무 걱정도 하지는 마, 나에게 다 맡겨 봐지금 이 순간이 다시 넘겨볼 수 있는한 페이지가 될 수 있게Yah, yeah-oh, yah, yo-oh, this is our pageYah, yeah-oh, yah, yo-oh, our page 솔직히, 말할게 많이 기다려 왔어너도 그랬을 거라 믿어오늘이 오길 매일같이 달력을 보면서솔직히, 나에게도, 지금 이 순간은꿈만 같아, 너와 함께라오늘을 위해 꽤 많은 걸 준비해 봤어ll about you and I, 다른 건 다 제쳐 두고Now come with me, take my hand아름다운 청춘의 한 장 함께 써내려 가자너와의 추억들로 가득 채울래 (come on!)아무 걱정도 하지는 마, 나에게 다 맡겨 봐지금 이 순간이 다시 넘겨볼 수 있는한 페이지가 될 수 있게Yah, yeah-oh, yah, yo-oh, this is our pageYah, yeah-oh, yah, yo-oh, our page솔직히, 말할게 지금이 오기까지마냥 순탄하진 않았지오늘이 오길 나도 목 빠져라 기다렸어 솔직히, 나보다도 네가 몇 배는 더힘들었을 거라고 믿어오늘을 위해 그저 견뎌줘서 고마워All about you and I, 다른 건 다 제쳐 두고Now come with me, take my hand아름다운 청춘의 한 장 함께 써내려 가자추억들로 가득 채울래 (come on!)아무 걱정도 하지는 마, 나에게 다 맡겨 봐지금 이 순간이 다시 넘겨볼 수 있는한 페이지가 될 수 있게Want you to come on out and have funWant us to have the time of our life추억들로 가득 채울래 (come on!)아무 걱정도 하지는 마, 나에게 다 맡겨 봐지금 이 순간이 다시 넘겨볼 수 있는한 페이지가 될 수 있게Yah, yeah-oh, yah, yo-oh, this is our pageYah, yeah-oh, yah, yo-oh, our page ",
                    },
                ],
            },
            {
                title: "2번 자소서",
                content: [
                    {
                        quest: "2번 자소서 1번 질문이에요",
                        answer: "답변이에요",
                    },
                    { quest: "2번질문이에요", answer: "답변이에요" },
                    {
                        quest: "3번질문이에요",
                        answer: "솔직히, 말할게 많이 기다려 왔어너도 그랬걱정도 하지는 마, 나에게 다 맡겨 봐지금 이 순간이 다시 넘겨볼 수 있는한 페이지가 될 수 있게Yah, yeah-oh, yah, yo-oh, this is our pageYah, yeah-oh, yah, yo-oh, our page솔직히, 말할게 지금이 오기까지마냥 순탄하진 않았지오늘이 오길 나도 목 빠져라 기다렸어 솔직히, 나보다도 네가 몇 배는 더힘들었을 거라고 믿어오늘을 위해 그저 견뎌줘서 고마워All about you and I, 다른 건 다 제쳐 두고Now come with me, take my hand아름다운 청춘의 한 장 함께 써내려 가자추억들로 가득 채울래 (come on!)아무 걱정도 하지는 마, 나에게 다 맡겨 봐지금 이 순간이 다시 넘겨볼 수 있는한 페이지가 될 수 있게Want you to come on out and have funWant us to have the time of our life추억들로 가득 채울래 (come on!)아무 걱정도 하지는 마, 나에게 다 맡겨 봐지금 이 순간이 다시 넘겨볼 수 있는한 페이지가 될 수 있게Yah, yeah-oh, yah, yo-oh, this is our pageYah, yeah-oh, yah, yo-oh, our page 솔직히, 말할게 많이 기다려 왔어너도 그랬을 거라 믿어오늘이 오길 매일같이 달력을 보면서솔직히, 나에게도, 지금 이 순간은꿈만 같아, 너와 함께라오늘을 위해 꽤 많은 걸 준비해 봤어ll about you and I, 다른 건 다 제쳐 두고Now come with me, take my hand아름다운 청춘의 한 장 함께 써내려 가자너와의 추억들로 가득 채울래 (come on!)아무 걱정도 하지는 마, 나에게 다 맡겨 봐지금 이 순간이 다시 넘겨볼 수 있는한 페이지가 될 수 있게Yah, yeah-oh, yah, yo-oh, this is our pageYah, yeah-oh, yah, yo-oh, our page솔직히, 말할게 지금이 오기까지마냥 순탄하진 않았지오늘이 오길 나도 목 빠져라 기다렸어 솔직히, 나보다도 네가 몇 배는 더힘들었을 거라고 믿어오늘을 위해 그저 견뎌줘서 고마워All about you and I, 다른 건 다 제쳐 두고Now come with me, take my hand아름다운 청춘의 한 장 함께 써내려 가자추억들로 가득 채울래 (come on!)아무 걱정도 하지는 마, 나에게 다 맡겨 봐지금 이 순간이 다시 넘겨볼 수 있는한 페이지가 될 수 있게Want you to come on out and have funWant us to have the time of our life추억들로 가득 채울래 (come on!)아무 걱정도 하지는 마, 나에게 다 맡겨 봐지금 이 순간이 다시 넘겨볼 수 있는한 페이지가 될 수 있게Yah, yeah-oh, yah, yo-oh, this is our pageYah, yeah-oh, yah, yo-oh, our page ",
                    },
                ],
            },
            {
                title: "3번 자소서",
                content: [
                    {
                        quest: "3번 자소서 1번 질문이에요",
                        answer: "답변이에요",
                    },
                    { quest: "2번질문이에요", answer: "답변이에요" },
                    {
                        quest: "3번질문이에요",
                        answer: "랄랄랄 ",
                    },
                ],
            },
        ],
    };
    // const [essayList, setEssyList] = useState([]);
    // const {user} = useSelector((state) => state.auth);

    // useEffect(()=>{
    //     axios.get(`/api/mypage/essays`)
    //     .then(({data})=>{
    //         console.log(data);
    //         let essays = [];
    //          data.data.forEach(element => {
    //
    //             axios.get(`/api/mypage/essays/${element.id}`)
    //             .then(({data})=>{
    //               const essay = {
    //                 title:element.title,
    //                 essayDetails:data.data,
    //               }
    //               essays=[...essays,essay];
    //
    //               setEssyList(essays);
    //             }).catch((error)=>{
    //                 console.log(error);
    //             });
    //
    //         });
    //
    //     }).catch((error)=>{
    //         console.error(error);
    //     })
    //
    // },[])

    const [selectedValueIndex, setSelectedValueIndex] = useState(0);
    const [checkedMain, setCheckedMain] = useState(false);
    const [mainEssay, setMainEssay] = useState(null);

    const handleEssay = (e) => {
        setSelectedValueIndex(e.target.value);
    };

    const style = {
        fontFamily: "HakgyoansimWoojuR",
    };

    return (
        <div>
            <S.myEssayWrap>
                <S.myEssaySide>
                    <S.myEssayIntro>
                        {user.nickname}님의 자기소개서
                    </S.myEssayIntro>
                    {!checkedMain && (
                        <S.myEssayMain>
                            자소서 본문을 클릭해서 메인 자소서를 설정하세요
                        </S.myEssayMain>
                    )}
                    {mainEssay === selectedValueIndex && (
                        <S.myEssayMain>
                            메인 자소서로 설정되어있어요
                        </S.myEssayMain>
                    )}
                </S.myEssaySide>
                <hr />

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    {/* <InputLabel id="demo-simple-select-standard-label">
                        TITLE
                    </InputLabel> */}
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={selectedValueIndex}
                        onChange={handleEssay}
                        style={style}
                        // label="TITLE"
                    >
                        {user.essay.map((item, i) => (
                            <MenuItem style={style} key={i} value={i}>
                                {user.essay[i].title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <S.myEssayContentWrap>
                    <StudyMyEssaySelected
                        selectedValue={user.essay[selectedValueIndex]}
                        selectedValueIndex={selectedValueIndex}
                        mainEssay={mainEssay}
                        setMainEssay={setMainEssay}
                        checkedMain={checkedMain}
                        setCheckedMain={setCheckedMain}
                    />
                    {/* <div>{selectedValue.title}</div> */}
                </S.myEssayContentWrap>
            </S.myEssayWrap>
        </div>
    );
};

export default StudyMyEssay;
