import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {user} from "../../../../store/AuthStore"
import * as S from "../../StudyRoomStyledComponents";

const StudyMyEssay = () => {
    // 사용자 정보 더미데이터
    const {user} = useSelector((state)=>state.auth);
    
    const [essayList, setEssyList] = useState([]);
    

    useEffect(()=>{
        axios.get(`/api/mypage/essays`)
        .then(({data})=>{
            console.log(data);
            let essays = [];
             data.data.forEach(element => {
                
                axios.get(`/api/mypage/essays/${element.id}`)
                .then(({data})=>{
                  const essay = {
                    title:element.title,
                    essayDetails:data.data,
                  }
                  essays=[...essays,essay];
                  
                  setEssyList(essays);
                }).catch((error)=>{
                    console.log(error);
                });
                
            });
            
        }).catch((error)=>{
            console.error(error);
        })
        
    },[])

    return (
        <div>
            <S.myEssayWrap>
                <S.myEssayIntro>{user.nickname}님의 자기소개서</S.myEssayIntro>
                <hr />
                <S.myEssayContentWrap>
                    {essayList.map((items, index) => (
                        <S.essaySet key={index}>
                            {items.title}
                            {items.essayDetails.map((qa,index) => (
                                <>
                                <S.myQuestion>
                                    {index + 1}. {qa.question}
                                </S.myQuestion>
                                <S.myAnswer>{qa.answer}</S.myAnswer>
                                </>
                            ))}
                            
                        </S.essaySet>
                    ))}
                </S.myEssayContentWrap>
            </S.myEssayWrap>
        </div>
    );
};

export default StudyMyEssay;
