import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {setNickname} from "../../store/AuthStore"
import * as S from "./MypageStyledComponents";

const ChangeNicknameComponent = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [newNickname,setNewNickname] = useState("");
    const [nicknameValid,setNicknameValid] = useState(null);
    const {user,refreshToken} = useSelector((state)=> state.auth);
    
    axios.defaults.headers.common["Authorization"] = `Bearer ${refreshToken}`;

    const handleNickname = (e) => {
        setNewNickname(e.target.value);
    }

    const onClickVaildNickname = async (e) => {
        await axios.get(`/api/users/${newNickname}/check-nickname`)
        .then((response)=>{
            setNicknameValid(true);
        }).catch((error)=>{
            console.error(error);
            setNicknameValid(false);
        })
    }
    const changeNickname = async (e) => {
        if(!nicknameValid){
            alert("중복확인 필요");
            return;
        }
        await axios.patch(`/api/mypage/nickname?userId=${user.userId}&nickname=${newNickname}`)
        .then((response)=>{
            dispatch(setNickname(newNickname));
            navigate("/mypage/profile")
        }).catch((error)=>{
            console.error(error);
        })
    }
    return (
        <div>
            <S.changeInput2 placeholder=" 변경할 닉네임을 입력하세요"/>
            <S.btn2>중복확인</S.btn2>
            <S.btn3>변경</S.btn3>
            <S.comment>
                새로운 닉네임
            </S.comment>
        </div>
    );
};

export default ChangeNicknameComponent;
