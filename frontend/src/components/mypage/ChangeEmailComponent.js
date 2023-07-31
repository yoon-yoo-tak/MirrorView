// import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserEmail } from "../../store/AuthStore";

import * as S from "./MypageStyledComponents";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";

const ChangeEmailComponent = () => {
    const { user } = useSelector((state) => state.auth);
    const [email, setEmail] = useState("");
    const [emailValid,setEmailValid] = useState(false);
    const [key,setKey] = useState("");
    const [keyValid,setKeyValid] = useState(null);
    const [completeSend,setCompleteSend] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [confirmEmail, setConfirmEmail] = useState("");

    const handleEmail = (e) => {
        const value = e.target.value;
        const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        setEmail(value);
        setEmailValid(regex.test(value));
    };

    const onClickSendKey = async (e) => {
        await axios.get(`http://localhost:8080/api/users/${email}`)
        .then(()=>{
            alert("이메일 전송 완료");
            setCompleteSend(true);
        }).catch((error)=>{
            console.log(error);
        })
    }
    const onCheckKey = async (e) => {
        await axios.post(`http://localhost:8080/api/users/${email}`,{key:key})
        .then(()=>{
            alert("인증 확인 완료");
            setKeyValid(true);
        }).catch((error)=>{
            console.log(error);
            setKeyValid(false);
        })
    }
    const handleKey = (e) =>{
        const value = e.target.value;
        setKey(value);
    }

    const handleConfirm = async (e) => {
        await axios.patch("http://localhost:8080/api/mypage/email",{
            userId : user.userId,
            email : email
        }).then((response)=>{
            console.log(response);
            dispatch(setUserEmail(email));
            navigate("/mypage/profile");
        }).catch((error)=>{
            console.log(error);
        })
    };

    const correctStyle = {
        color: "green",
        fontWeight: "bold",
    };
    const failStyle = {
        color: "red",
        fontWeight: "bold",
    };
    const hiddenStyle = {
        visibility: "hidden",
    };

    return (
        <div>
            <S.changePwForm>
                <S.changeFormExBtn>
                    <S.changePwFormEach>
                        <S.newEmailForm>
                            <div>새로운 이메일</div>
                            <S.confirmBtn onClick={onClickSendKey}>
                                인증요청
                            </S.confirmBtn>
                        </S.newEmailForm>
                        <S.changeInput type="email" onChange={handleEmail} />
                        <S.errorMessageWrap>
                            {!emailValid && email.length > 0 && !completeSend && (
                                <div style={failStyle}>
                                    이메일 양식이 아닙니다!
                                </div>
                            )}
                            {emailValid && email.length > 0 && !completeSend && (
                                <div style={correctStyle}>
                                    이메일 양식에 적합합니다!
                                </div>
                            )}
                            {completeSend && (
                                <div style={correctStyle}>
                                    전송 완료
                                </div>
                            )}
                            {email.length === 0 && !completeSend &&(
                                <div style={hiddenStyle}>숨김</div>
                            )}
                        </S.errorMessageWrap>
                    </S.changePwFormEach>
                    <S.changePwFormEach>
                        <S.newEmailForm>
                            <div>인증번호 입력</div>
                            <S.confirmBtn onClick={onCheckKey}>
                                인증확인
                            </S.confirmBtn>
                        </S.newEmailForm>
                        <S.changeInput type="text" onChange={handleKey} />
                        <S.errorMessageWrap>
                            {keyValid && (
                            <div style={correctStyle}>
                                인증이 완료되었습니다!
                            </div>
                            )}
                            {!keyValid && keyValid !=null && (
                                <div style={failStyle}>
                                    다시 입력해주세요
                                </div>
                            )}
                            {keyValid==null && (
                                <div style={hiddenStyle}>숨김</div>
                            )}
                        </S.errorMessageWrap>
                    </S.changePwFormEach>
                </S.changeFormExBtn>
                <div>
                    <S.changeBtn
                    disabled={
                        !keyValid
                    }
                    onClick={handleConfirm}
                    >
                        변경하기
                    </S.changeBtn>
                </div>
            </S.changePwForm>
        </div>
    );
};

export default ChangeEmailComponent;
