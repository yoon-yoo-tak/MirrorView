import * as S from "./otherStyledComponents";
import { useState, useEffect } from "react";
import axios from "axios";

const ProfileModal = ({ isOpen, onClose, id }) => {
    const [nowProfile, setNowProfile] = useState({
        nickname: "",
        score: "",
        email: "",
        photo: "",
    });

    useEffect(() => {
        axios
            .get(`api/users/find/${id}`)
            .then(({ data }) => setNowProfile(data.data))
            .catch((error) => console.log(error));
    }, []);

    const imageStyle = {
        width: "110px",
        height: "110px",
        filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.4))",
        borderRadius: "50%",
        marginTop: "30px",
    };

    return (
        <S.modal>
            <S.head>
                <S.title>사용자 정보</S.title>
                <S.closeBtn onClick={onClose}>X</S.closeBtn>
            </S.head>
            <div>
                <S.userInfo>
                    <img
                        src={nowProfile.photo}
                        alt="profileImage"
                        style={imageStyle}
                    />
                    <S.infoBox>
                        <S.userName>{nowProfile.nickname}</S.userName>
                        <S.infoContent>
                            <S.infoTap>
                                <S.text>E-MAIL</S.text>
                                <S.text>평점</S.text>
                            </S.infoTap>
                            <S.infoTapDetail>
                                <S.text>{nowProfile.email}</S.text>
                                <S.text>{nowProfile.score}</S.text>
                            </S.infoTapDetail>
                        </S.infoContent>
                    </S.infoBox>
                </S.userInfo>
            </div>
            <S.btnWrap>
                <S.enterbtn>친구신청</S.enterbtn>
            </S.btnWrap>
        </S.modal>
    );
};

export default ProfileModal;
