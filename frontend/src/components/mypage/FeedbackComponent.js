import { useEffect, useState } from "react";
import FeedbackModal from "./FeedbackModalComponent";

import * as S from "./MypageStyledComponents";
import axios from "axios";
import { useSelector } from "react-redux";

const FeedbackComponent = ({feedbackList}) => {
    // 더미데이터
    const [feedbacks,setFeedbacks] = useState([]);
    const {user,accessToken} = useSelector((state)=>state.auth);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    // useEffect(()=>{
    //     axios.get(`/api/mypage/feedbacks?userId=${user.userId}`)
    //     .then(({data})=>{
    //         setFeedbacks(data.data);

    //     })
    //     .catch((error)=>{
    //         console.log(error);
    //     })
    // },[])

    useEffect(()=>{
        setModalStates(feedbackList.map(()=>false));
    },[feedbackList])
    
    // const archive = [
    //     { id: 1, nickname: "히히", time: 10 },
    //     { id: 2, nickname: "헤헤", time: 20 },
    //     { id: 3, nickname: "깍깍", time: 30 },
    //     { id: 4, nickname: "메롱", time: 40 },
    //     { id: 5, nickname: "졸려", time: 50 },
    //     { id: 6, nickname: "랄랄", time: 60 },
    //     { id: 7, nickname: "롤롤", time: 70 },
    //     { id: 8, nickname: "률류", time: 80 },
    //     { id: 9, nickname: "악악", time: 90 },
    // ];

    const [modalStates, setModalStates] = useState(feedbackList.map(() => false));

    const handleModal = (index) => {
        const newModalStates = modalStates.map((state, idx) =>{
            console.log(state);
            return idx === index ? true : state;
        }
        );
        setModalStates(newModalStates);
    };

    const handleModalClose = (index) => {
        const newModalStates = modalStates.map((state, idx) =>
            idx === index ? false : state
        );
        setModalStates(newModalStates);
    };

    return (
        <div>
            <S.fbComponent>
                {feedbackList.map((item, index) => (
                    <S.fbThumbnail
                        // className="archive"
                        key={item.id}
                        onClick={() => handleModal(index)}
                    >
                        <div>작성자 : {item.senderNickname}</div>
                        <div>도착한 날짜 : {item.createdTime.substring(0,10)}</div>
                        {modalStates[index] && (
                            <FeedbackModal
                                item={item}
                                setModalStates={() => handleModalClose(index)}
                            />
                        )}
                    </S.fbThumbnail>
                ))}
            </S.fbComponent>
        </div>
    );
};

export default FeedbackComponent;
