import Sidebar from "../Sidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyEssay = () => {
    const nickname = useSelector((state) => state.auth.nickname);
    // const user = useSelector((state) => state.auth.user);

    const essay = [
        { id: 1, name: "히히", time: 10 },
        { id: 2, name: "헤헤", time: 30 },
    ];

    const navigate = useNavigate();

    const essayCreate = async (e) => {
        // 작성 ㄱ
        e.preventDefault();
        navigate("/mypage/essaycreate");
    };

    const essayDetail = async (id) => {
        navigate(`/mypage/essaydetail/${id}`);
    };

    return (
        <div>
            <Sidebar />
            <div className="essayWrap">
                <div>{nickname}님의 자기소개서</div>
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
    );
};

export default MyEssay;
