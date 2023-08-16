import * as S from "../../components/auth/UserStyledComponents";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    setIdValid,
    setPasswordValid,
    setEmailValid,
    setNicknameValid,
    setFullName, // 실명 유효성 액션 추가
    setNotAllow,
} from "../../store/AuthStore";
import axios from "axios";
import Header from "../../components/common/HeaderComponent";
import Footer from "../../components/common/FooterComponent";
import Swal from "sweetalert2";
import AWN from "awesome-notifications";
import "awesome-notifications/dist/style.css";

const Signup = () => {
    //   const {
    //        id,
    //        password,
    //        nickname,
    //        email,
    //        name,
    //        idValid,
    //        passwordValid,
    //        nicknameValid,
    //        emailValid,
    //        notAllow,
    //        verificationCode, // 추가: 인증번호 입력값
    //        fullName,
    //        fullNameValid,
    //    } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        userId: "",
        password: "",
        email: "",
        nickname: "",
        username: "",
    });
    const notifier = new AWN();

    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatchError, setPasswordMatchError] = useState(null); // 새로운 상태 추가

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputCheckPassword, setInputCheckPassword] = useState(null);
    const [userIdCheck, setUserIdCheck] = useState(null);
    const [userNickNameCheck, setUserNickNameCheck] = useState(null);
    const [userEmailCheck, setEmailCheck] = useState(null);
    const [verificationCode, setVerificationCode] = useState(null);
    const [verificationCodeValid, setVerificationCodeValid] = useState(null);
    const [emailValid, setEmailValid] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // setPasswordMatchError(e.target.value !== confirmPassword);
    };

    useEffect(() => {
        //console.log(formData);
    }, [formData]);

    const onClickCheckId = (e) => {
        e.preventDefault();
        if (formData.userId === "") {
            alert("아이디를 입력해주세요.");
        } else {
            axios({
                url: `/api/users/${formData.userId}/check-id`,
                method: "GET",
            })
                .then((res) => {
                    // alert(res.data.msg);
                    notifier.success(
                        `<div style="font-size:18px; font-family: HakgyoansimWoojuR;font-weight:bold;">${res.data.msg}</div>`,
                        {
                            durations: { success: 2000 },
                        }
                    );
                    setUserIdCheck(true);
                })
                .catch((err) => {
                    // alert("이미 존재하는 아이디입니다.");
                    notifier.alert(
                        `<div style="font-size:18px; font-family: HakgyoansimWoojuR;font-weight:bold;">중복되는 아이디입니다.</div>`,
                        {
                            durations: { success: 2000 },
                        }
                    );
                    setUserIdCheck(false);
                });
        }
    };
    const onClickCheckNickName = (e) => {
        e.preventDefault();
        if (formData.nickname === "") {
            alert("닉네임을 입력해 주세요.");
        } else {
            axios({
                url: `/api/users/${formData.nickname}/check-nickname`,
                method: "GET",
            })
                .then((res) => {
                    // alert(res.data.msg);
                    notifier.success(
                        `<div style="font-size:18px; font-family: HakgyoansimWoojuR;font-weight:bold;">${res.data.msg}</div>`,
                        {
                            durations: { success: 2000 },
                        }
                    );
                    setUserNickNameCheck(true);
                })
                .catch((err) => {
                    // alert("중복된 닉네임입니다.");
                    notifier.alert(
                        `<div style="font-size:18px; font-family: HakgyoansimWoojuR;font-weight:bold;">중복되는 닉네임입니다.</div>`,
                        {
                            durations: { success: 2000 },
                        }
                    );
                    setUserNickNameCheck(false);
                });
        }
    };

    const handleEmail = (e) => {
        const value = e.target.value;
        const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
        setFormData((prevData) => ({
            ...prevData,
            email: value,
        }));
        setVerificationCodeValid(null);
        setEmailValid(regex.test(value));
    };

    const handlePassword = (e) => {
        const value = e.target.value;
        const regex = new RegExp(
            "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[$@!%*#?&])[a-zA-Z0-9$@!%*#?&]{8,}$"
        );
        setFormData((prevData) => ({
            ...prevData,
            password: value,
        }));
        setInputCheckPassword(regex.test(value));
    };

    const emailAuth = async (e) => {
        // 이메일인증 버튼 누르면 실행
        e.preventDefault();
        if (formData.email === "") {
            alert("이메일을 입력해 주세요.");
        } else if (!emailValid) {
            alert("이메일 형식을 맞춰주세요.");
        } else {
            try {
                const resCheck = await axios.get(
                    `api/users/${formData.email}/check-email`
                );
                alert("사용 가능한 이메일입니다. 인증 메일을 전송합니다.");

                try {
                    const resForm = await axios.get(
                        `/api/users/${formData.email}`
                    );
                    alert(resForm.data.msg);
                } catch (err) {
                    alert("이메일 인증을 다시 시도해 주세요.");
                }
            } catch (err) {
                alert(err.response.data.msg);
            }

            // axios({
            //     url: `api/users/${formData.email}/check-email`,
            //     method: "GET",
            // })
            //     .then((res) => {
            //         alert("사용 가능한 이메일입니다. 인증 메일을 전송합니다.");
            //         axios({
            //             url: `/api/users/${formData.email}`,
            //             method: "GET",
            //         })
            //             .then((res) => {
            //                 alert(res.data.msg);
            //             })
            //             .catch((err) => {
            //                 alert("이메일 인증을 다시 시도해 주세요.");
            //             });
            //     })
            //     .catch((error) => {
            //         alert(error.response.data.msg);
            //     });

            // axios({
            //     url: `/api/users/${formData.email}`,
            //     method: "GET",
            // })
            //     .then((res) => {
            //         alert(res.data.msg);
            //     })
            //     .catch((err) => {
            //         alert("이메일 인증을 다시 시도해 주세요.");
            //     });
        }
    };

    const correctStyle = {
        color: "green",
        fontWeight: "bold",
    };

    const failStyle = {
        color: "red",
        fontWeight: "bold",
    };

    const handleCheckPassword = (e) => {
        setInputCheckPassword(e.target.value);
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordMatchError(formData.password !== e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (password !== confirmPassword) {
        //     return; // 비밀번호가 일치하지 않을 경우 아무 작업도 하지 않음
        // }
        if (!userIdCheck) {
            alert("아이디 중복체크를 해주세요.");
            return;
        }

        if (!userNickNameCheck) {
            alert("닉네임 중복체크를 해주세요.");
            return;
        }
        if (!emailValid) {
            alert("이메일 형식 맞게 해주세요.");
            return;
        }
        if (!verificationCodeValid) {
            alert("이메일 인증을 해주세요.");
            return;
        }
        if (!inputCheckPassword) {
            alert("올바른 비밀번호를 입력해주세요.");
            return;
        }
        if (passwordMatchError) {
            alert("비밀번호가 일치하지않습니다.");
            return;
        }
        //console.log(formData);
        try {
            const response = await axios.post("/api/users", formData);
            // 회원가입이 성공하면 사용자 정보를 스토어에 저장
            //console.log(response.data);
            navigate("/login"); // 회원가입 후 리다이렉션할 페이지 설정
        } catch (error) {
            // 회원가입 실패 시 에러 처리
            dispatch({
                type: "USER_LOGIN_FAILURE",
                payload: error.response.data.error,
            });
        }
    };

    const handleVerificationCode = (e) => {
        setVerificationCode(e.target.value);
    };

    const onClickVerficationCode = async (e) => {
        await axios
            .post(`/api/users/${formData.email}`, { key: verificationCode })
            .then((res) => {
                setVerificationCodeValid(true);
            })
            .catch((err) => {
                alert("인증코드를 다시 입력하세요.");
                setVerificationCodeValid(false);
            });
    };

    const handleFullName = (e) => {
        // dispatch(setFullName(e.target.value));
        // dispatch(setNotAllow());
        setFormData((prevState) => ({
            ...prevState,
            fullName: e.target.value,
        }));
    };

    const handleDuplicateCheck = (field) => {
        // TODO: 중복 확인 로직을 구현하세요
        // field 매개변수를 통해 어떤 필드에 대한 중복 확인을 할 지 결정할 수 있습니다.
        //console.log(`Checking duplicate for ${field}...`);
    };

    return (
        <div>
            <Header />
            <S.form>
                <form onSubmit={handleSubmit}>
                    <S.page>
                        <S.wrap>
                            <S.pageTitle>SIGN UP</S.pageTitle>
                            <S.contentWrap>
                                <S.inputTitle>아이디</S.inputTitle>
                                <S.inputWrap>
                                    <S.inputContent
                                        type="text"
                                        className="input"
                                        name="userId"
                                        placeholder="사용하실 ID를 입력하세요"
                                        value={formData.userId}
                                        onChange={handleChange}
                                        menu="dup"
                                    />
                                    <S.CheckBtn
                                        type="button"
                                        onClick={onClickCheckId}
                                    >
                                        중복 확인
                                    </S.CheckBtn>
                                </S.inputWrap>
                                {userIdCheck && (
                                    <S.errorMessage style={correctStyle}>
                                        사용 가능한 아이디입니다
                                    </S.errorMessage>
                                )}
                                {!userIdCheck && <S.hidden>숨김</S.hidden>}
                                {/* ... (나머지 입력 항목) */}
                                <S.inputTitle>이메일</S.inputTitle>
                                <S.inputWrap>
                                    <S.inputContent
                                        type="text"
                                        className="input"
                                        placeholder="사용하실 email을 입력하세요"
                                        value={formData.email}
                                        onChange={handleEmail}
                                        menu="dup"
                                    />
                                    <S.CheckBtn
                                        type="button"
                                        onClick={emailAuth}
                                    >
                                        인증 요청
                                    </S.CheckBtn>
                                </S.inputWrap>

                                {!emailValid && formData.email.length !== 0 ? (
                                    <S.errorMessage style={failStyle}>
                                        올바른 이메일을 입력하세요
                                    </S.errorMessage>
                                ) : (
                                    <S.hidden>숨김</S.hidden>
                                )}
                                <S.inputWrap>
                                    <S.inputContent
                                        type="text"
                                        className="verificationInput"
                                        placeholder="인증번호 입력"
                                        value={verificationCode}
                                        onChange={handleVerificationCode}
                                        menu="dup"
                                    />
                                    <S.CheckBtn
                                        type="button"
                                        onClick={onClickVerficationCode}
                                    >
                                        인증 확인
                                    </S.CheckBtn>
                                </S.inputWrap>
                                {verificationCodeValid && (
                                    <S.errorMessage style={correctStyle}>
                                        이메일 인증 완료.
                                    </S.errorMessage>
                                )}
                                {verificationCodeValid !== null &&
                                !verificationCodeValid ? (
                                    <S.errorMessage style={failStyle}>
                                        이메일 인증 실패
                                    </S.errorMessage>
                                ) : (
                                    <S.hidden>숨김</S.hidden>
                                )}
                                <div className="inputTitle">닉네임</div>
                                <S.inputWrap>
                                    <S.inputContent
                                        type="text"
                                        className="input"
                                        name="nickname"
                                        placeholder="사용하실 닉네임을 입력하세요"
                                        value={formData.nickname}
                                        onChange={handleChange}
                                        menu="dup"
                                    />
                                    <S.CheckBtn
                                        type="button"
                                        onClick={onClickCheckNickName}
                                    >
                                        중복 확인
                                    </S.CheckBtn>
                                </S.inputWrap>
                                {userNickNameCheck && (
                                    <S.errorMessage style={correctStyle}>
                                        사용 가능한 닉네임입니다.
                                    </S.errorMessage>
                                )}
                                {!userNickNameCheck && (
                                    <S.hidden>숨김</S.hidden>
                                )}
                                <S.inputTitle>비밀번호</S.inputTitle>
                                <S.inputWrap>
                                    <S.inputContent
                                        type="password"
                                        className="input"
                                        name="password"
                                        value={formData.password}
                                        onChange={handlePassword}
                                        placeholder="영문,숫자,특수기호 포함 8글자 이상 되어야 합니다."
                                    />
                                </S.inputWrap>
                                {!inputCheckPassword &&
                                    formData.password.length != 0 && (
                                        <S.errorMessage style={failStyle}>
                                            형식에 맞게 입력해 주세요.
                                        </S.errorMessage>
                                    )}
                                {inputCheckPassword && (
                                    <S.errorMessage style={correctStyle}>
                                        사용가능한 비밀번호 입니다.
                                    </S.errorMessage>
                                )}
                                {!inputCheckPassword &&
                                    formData.password.length === 0 && (
                                        <S.hidden>숨김</S.hidden>
                                    )}
                                <S.inputTitle>비밀번호 확인</S.inputTitle>
                                <S.inputWrap>
                                    <S.inputContent
                                        type="password"
                                        className="input"
                                        value={confirmPassword}
                                        onChange={handleConfirmPassword}
                                        placeholder="비밀번호 확인"
                                    />
                                </S.inputWrap>
                                {passwordMatchError && (
                                    <S.errorMessage style={failStyle}>
                                        비밀번호가 일치하지 않습니다.
                                    </S.errorMessage>
                                )}
                                {passwordMatchError !== null &&
                                    !passwordMatchError && (
                                        <S.errorMessage style={correctStyle}>
                                            비밀번호가 일치합니다.
                                        </S.errorMessage>
                                    )}
                                {passwordMatchError === null && (
                                    <S.hidden>숨김</S.hidden>
                                )}
                                <S.signupWrap>
                                    <S.signupButton onClick={handleSubmit}>
                                        회원가입
                                    </S.signupButton>
                                </S.signupWrap>
                            </S.contentWrap>
                        </S.wrap>
                    </S.page>
                </form>
            </S.form>

            <Footer />
        </div>
    );
};

export default Signup;
