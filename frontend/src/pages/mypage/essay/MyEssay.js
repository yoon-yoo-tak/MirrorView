import Sidebar from "../Sidebar";
// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

import classes from "./MyEssay.module.scss";

const MyEssay = () => {
    const nickname = useSelector((state) => state.auth.nickname);
    // const user = useSelector((state) => state.auth.user);

    const essay = [
        { id: 1, name: "히히", time: 10 },
        { id: 2, name: "헤헤", time: 30 },
    ];

    const navigate = useNavigate();
    // const dispatch = useDispatch();

    const essayCreate = async (e) => {
        e.preventDefault();
        navigate("/mypage/essaycreate");
    };

    // const [selectedEssay, setSelectedEssay] = useState(null);

    const essayDetail = (id) => {
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
        navigate(`/mypage/essaydetail/${id}`);
    };

    return (
        <div>
            <div className={classes.essayPage}>
                <Sidebar menu="essay" />
                <div className={classes.essayWrap}>
                    <div>{nickname}님의 자기소개서</div>
                    <hr />
                    <button onClick={essayCreate}>작성하기</button>
                    <div className="essayBox">
                        <div className="essayList">
                            {essay.map((item) => (
                                <div
                                    className="essay"
                                    key={item.id}
                                    onClick={() => essayDetail(item.id)}
                                >
                                    <div>{item.name}</div>
                                    <div>작성일시 : {item.time}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyEssay;
