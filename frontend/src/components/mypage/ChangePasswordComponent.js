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
    const [passwordCheckVaild, setPasswordCheckValid] = useState(null);
    const [confirmVaild, setConfirmVaild] = useState(null);
    const [confirmCheckVaild, setConfirmCheckVaild] = useState(null);
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
        fontWeight: "bold",
    };

    const handleCurrentPassword = (e) => {
        setCurrentPassword(e.target.value);
    };

    const handlePassword = (e) => {
        const value = e.target.value;
        const regex = new RegExp(
            "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[$@!%*#?&])[a-zA-Z0-9$@!%*#?&]{8,}$"
        );
        setNewPassword(value);
        setPasswordCheckValid(regex.test(value));
        // setPasswordValid(value);
    };

    const handleConfirmPassword = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setConfirmVaild(newPassword === value);
    };

    const onClickChangePassword = async (e) => {
        e.preventDefault();
        if (!passwordCheckVaild) {
            alert("올바른 비밀번호를 입력해주세요.");
            return;
        }
        if (!confirmVaild) {
            alert("새로운 비밀번호가 일치하지 않습니다.");
            return;
        }
        try {
            const response = await axios.post("/api/mypage/password", {
                originPass: currentPassword,
                newPass: newPassword,
                checkNewPass: confirmPassword,
            });
            console.log(response);
            if (response.data.success) {
                navigate("/mypage/profile");
            }
        } catch (error) {
            alert(error.response.data.msg);
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
                            onChange={handleCurrentPassword}
                        />
                        <div style={hiddenStyle}>숨김</div>
                    </S.changePwFormEach>
                    <S.changePwFormEach>
                        <div>새로운 비밀번호</div>
                        <S.changeInput
                            type="password"
                            value={newPassword}
                            onChange={handlePassword}
                            placeholder="영문,숫자,특수기호 포함 8글자 이상 되어야 합니다."
                        />
                        {!passwordCheckVaild && newPassword.length != 0 && (
                            <S.errorMessageWrap style={failStyle}>
                                형식에 맞게 입력해 주세요.
                            </S.errorMessageWrap>
                        )}
                        {passwordCheckVaild && (
                            <S.errorMessageWrap style={correctStyle}>
                                사용가능한 비밀번호 입니다.
                            </S.errorMessageWrap>
                        )}
                        {!passwordCheckVaild && newPassword.length === 0 && (
                            <S.hidden style={hiddenStyle}>숨김</S.hidden>
                        )}
                    </S.changePwFormEach>
                    <S.changePwFormEach>
                        <div>새로운 비밀번호 (확인)</div>
                        <S.changeInput
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPassword}
                            placeholder="영문,숫자,특수기호 포함 8글자 이상 되어야 합니다."
                        />
                        {!confirmVaild && confirmPassword.length > 0 && (
                            <S.errorMessageWrap style={failStyle}>
                                비밀번호가 일치하지 않습니다.
                            </S.errorMessageWrap>
                        )}
                        {confirmVaild && (
                            <S.errorMessageWrap style={correctStyle}>
                                비밀번호가 일치합니다.
                            </S.errorMessageWrap>
                        )}
                    </S.changePwFormEach>
                </div>
                <div>
                    <S.changeBtn
                        disabled={
                            !confirmVaild ||
                            newPassword !== confirmPassword ||
                            newPassword.length === 0
                        }
                        onClick={onClickChangePassword}
                    >
                        변경하기
                    </S.changeBtn>
                </div>
            </S.changePwForm>
        </div>
    );
};

export default ChangePwComponent;
