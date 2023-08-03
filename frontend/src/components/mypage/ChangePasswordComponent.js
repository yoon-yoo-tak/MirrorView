import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";


import * as S from "./MypageStyledComponents";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePwComponent = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordCheckVaild,setPasswordCheckValid] = useState('');
    const [confirmVaild, setConfirmVaild] = useState('');
    const [confirmCheckVaild, setConfirmCheckVaild] = useState('');
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

    const handleCurrentPassword = (e) =>{
        setCurrentPassword(e.target.value);
    }

    const handlePassword = (e) => {
        const value = e.target.value
        setNewPassword(value);
        setPasswordCheckValid(value > 0)
        // setPasswordValid(value);
    };

    const handleConfirmPassword = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setConfirmCheckVaild(value >0);
        setConfirmVaild(newPassword === value && value.length > 0);
    };

    const onClickChangePassword = async (e) => {
        try {
            const response = await axios.post("/api/mypage/password",{
                originPass: currentPassword,
                newPass : newPassword,
                checkNewPass: confirmPassword
            });
            console.log(response);
            if(response.data.success){
                navigate("/mypage/profile");
            }
        } catch(error){
            console.error(error);
        }
    };

    return (
        <div>
            <S.changePwForm>
                <div>
                    <S.changePwFormEach>
                        <div>현재 비밀번호</div>
                        <S.changeInput 
                        type="password"
                        onChange={handleCurrentPassword} />
                        <div style={hiddenStyle}>숨김</div>
                    </S.changePwFormEach>
                    <S.changePwFormEach>
                        <div>새로운 비밀번호</div>
                        <S.changeInput
                            type="password"
                            onChange={handlePassword}
                        />
                        <S.errorMessageWrap>
                            {newPassword.length === 0 && (
                                <div style={hiddenStyle}>숨김</div>
                            )}
                            {newPassword.length <= 4 &&  passwordCheckVaild && (
                                <div style={failStyle}>
                                    사용할 수 없는 비밀번호입니다
                                </div>
                            )}
                            {newPassword.length > 4 && passwordCheckVaild && (
                                <div style={correctStyle}>
                                    사용할 수 있는 비밀번호입니다
                                </div>
                            )}
                            
                        </S.errorMessageWrap>
                    </S.changePwFormEach>
                    <S.changePwFormEach>
                        <div>새로운 비밀번호 (확인)</div>
                        <S.changeInput
                            type="password"
                            onChange={handleConfirmPassword}
                        />
                        <S.errorMessageWrap>
                            {!confirmVaild && confirmCheckVaild &&(
                                    <div style={failStyle}>
                                        비밀번호가 일치하지 않습니다!
                                    </div>
                                )}
                            {confirmVaild && confirmCheckVaild && (
                                    <div style={correctStyle}>
                                        비밀번호가 일치합니다!
                                    </div>
                                )}
                            {confirmPassword.length === 0 && (
                                <div style={hiddenStyle}>숨김</div>
                            )}
                        </S.errorMessageWrap>
                    </S.changePwFormEach>
                </div>
                <div>
                    <S.changeBtn
                        disabled={
                            !confirmVaild ||
                            newPassword !== confirmPassword ||
                            newPassword.length === 0
                        }
                        onClick ={onClickChangePassword}
                    >
                        변경하기
                        
                    </S.changeBtn>
                </div>
            </S.changePwForm>
        </div>
    );
};

export default ChangePwComponent;
