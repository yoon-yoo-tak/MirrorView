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
        setNicknameValid(false);
    }

    const onClickVaildNickname = async (e) => {
        await axios.get(`/api/users/${newNickname}/check-nickname`)
        .then((response)=>{
            alert("사용가능한 닉네임입니다.");
            setNicknameValid(true);
        }).catch((error)=>{
            console.error(error);
            alert("사용 불가능한 아이디입니다.");
            setNicknameValid(false);
        })
    }
    const changeNickname = async (e) => {
        if(!nicknameValid){
            alert("중복확인 필요");
            return;
        }
        await axios.post(`/api/mypage/nickname?userId=${user.userId}&nickname=${newNickname}`)
        .then((response)=>{
            dispatch(setNickname(newNickname));
            navigate("/mypage/profile")
        }).catch((error)=>{
            console.error(error);
        })
    }
    return (
        <div>
            <S.changeInput2 placeholder=" 변경할 닉네임을 입력하세요" onChange={handleNickname}/>
            <S.btn2 onClick={onClickVaildNickname}>중복확인</S.btn2>
            <S.btn3 disabled={!nicknameValid} onClick={changeNickname}>변경</S.btn3>
            <S.comment>
                새로운 닉네임
            </S.comment>
        </div>
    );
};

export default ChangeNicknameComponent;
