// import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEmail, setEmailValid } from "../../store/authStore";

import * as S from "./MypageStyledComponents";
// import { useState } from "react";

const ChangeEmailComponent = () => {
    const { email, emailValid } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    // const [confirmEmail, setConfirmEmail] = useState("");

    const handleEmail = (e) => {
        const value = e.target.value;
        dispatch(setEmail(value));
        dispatch(setEmailValid(value));
    };

    const handleConfirm = () => {
        // 이메일 인증 요청 전송 전에
        // 이메일 중복 확인 먼저
        // 인증 요청이 확인되면 store의 상태가 업데이트 되나? 아니면 그냥 ?
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
                            <S.confirmBtn onClick={handleConfirm}>
                                인증요청
                            </S.confirmBtn>
                        </S.newEmailForm>
                        <S.changeInput type="email" onChange={handleEmail} />
                        <S.errorMessageWrap>
                            {!emailValid && email.length > 0 && (
                                <div style={failStyle}>
                                    이메일 양식이 아닙니다!
                                </div>
                            )}
                            {emailValid && email.length > 0 && (
                                <div style={correctStyle}>
                                    이메일 양식에 적합합니다!
                                </div>
                            )}
                            {email.length === 0 && (
                                <div style={hiddenStyle}>숨김</div>
                            )}
                        </S.errorMessageWrap>
                    </S.changePwFormEach>
                    <S.changePwFormEach>
                        <S.newEmailForm>
                            <div>인증번호 입력</div>
                            <S.confirmBtn onClick={handleConfirm}>
                                인증확인
                            </S.confirmBtn>
                        </S.newEmailForm>
                        <S.changeInput type="text" onChange={handleConfirm} />
                        <S.errorMessageWrap>
                            {/* {!emailValid && email.length > 0 && ( */}
                            <div style={correctStyle}>
                                인증이 완료되었습니다!
                            </div>
                            {/* )}
                            {email.length === 0 && (
                                <div style={hiddenStyle}>숨김</div>
                            )} */}
                        </S.errorMessageWrap>
                    </S.changePwFormEach>
                </S.changeFormExBtn>
                <div>
                    <S.changeBtn
                    // disabled={
                    //     !emailValid ||
                    //     email !== confirmEmail ||
                    //     email.length === 0
                    // }
                    >
                        변경하기
                    </S.changeBtn>
                </div>
            </S.changePwForm>
        </div>
    );
};

export default ChangeEmailComponent;
