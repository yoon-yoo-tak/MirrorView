import * as S from "./MypageStyledComponents";
import { useNavigate } from "react-router-dom";

const EssayComponent = () => {
    const navigate = useNavigate();

    const essay = [
        { id: 1, name: "히히", time: 10 },
        { id: 2, name: "헤헤", time: 30 },
        { id: 3, name: "하하", time: 50 },
    ];

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
            <S.essayComponent>
                {/* <div className="essayList"> */}
                {essay.map((item) => (
                    <S.essayThumbnail
                        // className="essay"
                        key={item.id}
                        onClick={() => essayDetail(item.id)}
                    >
                        <div>{item.name}</div>
                        <div>작성일시 : {item.time}</div>
                    </S.essayThumbnail>
                ))}
                {/* </div> */}
            </S.essayComponent>
        </div>
    );
};

export default EssayComponent;
