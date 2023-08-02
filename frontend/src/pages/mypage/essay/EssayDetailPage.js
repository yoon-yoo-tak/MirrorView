import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// import classes from "./EssayDetail.module.scss";
import Sidebar from "../MypageSidebarPage";

import * as S from "../../../components/mypage/MypageStyledComponents";
import axios from "axios";

const EssayDetail = () => {
    const {user,accessToken} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const {pathname, state} = useLocation();
    const[essay,setEssay] = useState([]);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    useEffect(()=>{
        const id = pathname.substring(20)
        axios.get(`/api/mypage/essays/${id}`)
        .then(({data})=>{
            setEssay(data.data);
        })
        .catch((error)=>{
            console.error(error);
        })
    })

    // const essayUpdate = (e) => {
    //     e.preventDefault();
    //     navigate("essaydetail/:id/update");
    // };

    return (
        <div>
            <S.page>
                <Sidebar menu="essay" />
                <S.wrap>
                    <h2>{user.nickname}님의 자기소개서</h2>
                    제목 : {state}
                    <hr />
                    <div>
                        {essay.map((item)=>(
                            <div key={item.id}>
                                <div>answer: {item.answer}</div>
                                <div>question : {item.question}</div>
                            </div>
                        ))}
                    </div>
                    {/* <button onClick={essayUpdate}>수정하기</button> */}
                    <div className="essayBox"></div>
                </S.wrap>
            </S.page>
        </div>
    );
};

export default EssayDetail;
