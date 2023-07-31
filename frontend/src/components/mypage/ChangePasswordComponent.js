import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setPassword,
    setPasswordValid,
    setPasswordCheckValid,
    // setNotAllow,
} from "../../store/authStore";

import * as S from "./MypageStyledComponents";

const ChangePwComponent = () => {
    const { password, passwordValid } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const [confirmPassword, setConfirmPassword] = useState("");

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

    const handlePassword = (e) => {
        const value = e.target.value;
        dispatch(setPassword(value));
        dispatch(
            setPasswordCheckValid(
                value === confirmPassword && confirmPassword.length > 0
            )
        );
        dispatch(setPasswordValid(value));
        // dispatch(setNotAllow());
    };

    const handleConfirmPassword = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        dispatch(setPasswordCheckValid(password === value && value.length > 0));
    };

    return (
        <div>
            <S.changePwForm>
                <div>
                    <S.changePwFormEach>
                        <div>현재 비밀번호</div>
                        <S.changeInput type="password" />
                        <div style={hiddenStyle}>숨김</div>
                    </S.changePwFormEach>
                    <S.changePwFormEach>
                        <div>새로운 비밀번호</div>
                        <S.changeInput
                            type="password"
                            onChange={handlePassword}
                        />
                        <S.errorMessageWrap>
                            {!passwordValid && password.length > 0 && (
                                <div style={failStyle}>
                                    사용할 수 없는 비밀번호입니다
                                </div>
                            )}
                            {passwordValid && password.length > 0 && (
                                <div style={correctStyle}>
                                    사용할 수 있는 비밀번호입니다
                                </div>
                            )}
                            {password.length === 0 && (
                                <div style={hiddenStyle}>숨김</div>
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
                            {confirmPassword.length > 0 &&
                                password !== confirmPassword && (
                                    <div style={failStyle}>
                                        비밀번호가 일치하지 않습니다!
                                    </div>
                                )}
                            {confirmPassword.length > 0 &&
                                password === confirmPassword && (
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
                            !passwordValid ||
                            password !== confirmPassword ||
                            password.length === 0
                        }
                    >
                        변경하기
                    </S.changeBtn>
                </div>
            </S.changePwForm>
        </div>
    );
};

export default ChangePwComponent;
