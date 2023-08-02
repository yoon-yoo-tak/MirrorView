import { useEffect, useState } from "react";
import * as S from "./MypageStyledComponents";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const EssayComponent = () => {
    const navigate = useNavigate();
    const {user, accessToken} = useSelector((state)=>state.auth);
    const [essayList, setEssyList] = useState([]);

    axios.defaults.headers.common["Authorization"] =  `Bearer ${accessToken}`;
    
    useEffect(()=>{
        axios.get(`/api/mypage/essays?userId=${user.userId}`)
        .then(({data})=>{
            setEssyList(data.data);
            console.log(data);
        }).catch((error)=>{
            console.error(error);
        })
    },[])

    const essay = [
        { id: 1, name: "히히", time: 10 },
        { id: 2, name: "헤헤", time: 30 },
        { id: 3, name: "하하", time: 50 },
    ];

    const essayDetail = (item) => {
        // axios
        //     .get(`/api/mypage/essays/${id}`)
        //     .then((response) => {
        //         setSelectedEssay(response.data);
        //         navigate(`/mypage/essaydetail/${id}`);
        //     })
        //     .catch((error) => {
        //         // console.error("Error fetching essay:", error);
        //     });
        // e.preventDefault();
        navigate(`/mypage/essaydetail/${item.id}`,{state: item.title});
    };

    return (
        <div>
            <S.essayComponent>
                {/* <div className="essayList"> */}
                {essayList.map((item) => (
                    <S.essayThumbnail
                        // className="essay"
                        key={item.id}
                        onClick={() => essayDetail(item)}
                    >
                        <div>{item.title}</div>
                        <div>작성일시 : {item.createdTime.substring(0,10)}</div>
                    </S.essayThumbnail>
                ))}
                {/* </div> */}
            </S.essayComponent>
        </div>
    );
};

export default EssayComponent;
