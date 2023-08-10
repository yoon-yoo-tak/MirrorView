import { useDispatch, useSelector } from "react-redux";
import * as S from "./StudyStyledComponents";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudyRoomThumbnail = (info) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const handleEnter = () => {
        console.log(info);
        if (!user) {
            alert("로그인 후 이용 가능합니다.");
            navigate("/login");
            return;
        }
        if (info.maxMemberCount === info.currentMemberCount) {
            alert("인원이 꽉 찼습니다.");
            return;
        }
        if (info.havePassword) {
            let pass = window.prompt("비밀번호를 입력하세요");
            axios
                .post("/api/interviews/join/check", {
                    roomId: info.roomId,
                    password: pass,
                })
                .then(() => {
                    navigate(`/studyroom/${info.roomId}`, {
                        state: { isHost: false },
                    });
                })
                .catch((error) => {
                    alert("비밀번호가 틀렸습니다.");
                    console.log(error);
                });
            return;
        }
        if (
            window.confirm(
                `${info.host}님이 생성한 ${info.title}에 입장하시겠습니까?`
            )
        ) {
            navigate(`/studyroom/${info.roomId}`, {
                state: { isHost: false },
            }); // 이동
        }
    };
    return (
        <S.thumbnailPage>
            <S.titleAndHost>
                <div>{info.title}</div>
                <div>{info.host}</div>
                <div>{info.category}</div>
            </S.titleAndHost>
            <S.personAndButton>
                <div>
                    {info.currentMemberCount} / {info.maxMemberCount}
                </div>
                <S.enterButtonDiv>
                    <S.enterButton onClick={() => handleEnter(info)}>
                        입장하기
                    </S.enterButton>
                </S.enterButtonDiv>
            </S.personAndButton>
        </S.thumbnailPage>
    );
};

export default StudyRoomThumbnail;
