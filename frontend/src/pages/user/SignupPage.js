import * as S from "../../components/mypage/MypageStyledComponents";
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
    const [emailValid,setEmailValid] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // setPasswordMatchError(e.target.value !== confirmPassword);
    };

    useEffect(() => {
        console.log(formData);
    }, [formData])


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
                    alert(res.data.msg);
                    setUserIdCheck(true);
                })
                .catch((err) => {
                    alert("이미 잇는 아이디");
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
                    alert(res.data.msg);
                    setUserNickNameCheck(true);
                })
                .catch((err) => {
                    alert("이미 잇는 닉네임");
                    setUserNickNameCheck(false);
                });
        }
    };

    const handleEmail = (e) => {
        const value = e.target.value;
        const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        setFormData((prevData) => ({
            ...prevData,
            email: value,
        }));
        setVerificationCodeValid(false);
        setEmailValid(regex.test(value));
    };

    const handlePassword = (e) => {
        const value = e.target.value;
        const regex = new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[$@!%*#?&])[a-zA-Z0-9$@!%*#?&]{8,}$');
        setFormData((prevData) => ({
            ...prevData,
            password: value,
        }));
        setInputCheckPassword(regex.test(value));
    }
    
    const emailAuth = (e) => {
        // 이메일인증 버튼 누르면 실행
        e.preventDefault();
        if (formData.email === "") {
            alert("이메일을 입력해 주세요.");
        } else if (!emailValid){
            alert("이메일 형식을 맞춰주세요.");
        }
        else{
            axios({
                url: `/api/users/${formData.email}`,
                method: "GET",
            })
                .then((res) => {
                    alert(res.data.msg);
                })
                .catch((err) => {
                    alert("뭔가 잘못됨");
                });
        }
    };

    const correctStyle = {
        color: "green",
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
        console.log(formData);
        try {
            const response = await axios.post(
                "/api/users",
                formData
            );
            // 회원가입이 성공하면 사용자 정보를 스토어에 저장
            console.log(response.data);
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
        await axios.post(`/api/users/${formData.email}`, { key: verificationCode })
            .then((res) => {
                setVerificationCodeValid(true);
            })
            .catch((err) => {
                alert("인증코드를 다시 입력하세요.");
                setVerificationCodeValid(false);
        })
    }

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
        console.log(`Checking duplicate for ${field}...`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="page">
                <S.SignupCreateBox>
                    {/* <div className="titleWrap">회원 정보를 입력해주세요</div> */}

                    <div className="contentWrap">
                        <S.InputField>
                            <div className="inputTitle">이름</div>
                            <div className="inputWrap">
                                <input
                                    type="text"
                                    name="username"
                                    className="input"
                                    placeholder="이름을 입력하세요"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="errorMessageWrap">
                                {/* {!fullNameValid && (
                                        <div>
                                            {formData.fullName.length === 1 ||
                                            formData.fullName.length > 4
                                                ? "올바른 실명을 입력하세요"
                                                : ""}
                                        </div>
                                    )} */}
                            </div>

                            <div className="inputTitle">아이디</div>
                            <div className="inputWrap">
                                <input
                                    type="text"
                                    className="input"
                                    name="userId"
                                    placeholder="사용하실 ID를 입력하세요"
                                    value={formData.userId}
                                    onChange={handleChange}
                                />
                            </div>

                            <S.CheckBtn
                                type="button"
                                onClick={onClickCheckId}
                                style={{
                                    position: "absolute",
                                    top: "150px", // 원하는 위치로 조정
                                    right: "380px", // 원하는 위치로 조정
                                }}
                            >
                                중복 확인
                            </S.CheckBtn>

                            {/* ... (나머지 입력 항목) */}
                            <div className="inputTitle">이메일</div>
                            <div className="inputWrap">
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="사용하실 email을 입력하세요"
                                    value={formData.email}
                                    onChange={handleEmail}
                                />
                            </div>

                            <div className="errorMessageWrap">
                                {!emailValid && formData.email.length != 0 && (
                                        <div>올바른 이메일을 입력하세요</div>
                                    )}
                            </div>

                            <S.CheckBtn
                                type="button"
                                onClick={emailAuth}
                                style={{
                                    position: "absolute",
                                    top: "230px", // 원하는 위치로 조정
                                    right: "380px", // 원하는 위치로 조정
                                }}
                            >
                                인증
                            </S.CheckBtn>
                            

                            <S.VerificationField
                                style={{ marginLeft: "-15px" }}
                            >
                                <div className="verificationLabel"></div>
                                <div className="verificationInputWrap">
                                    <input
                                        type="text"
                                        className="verificationInput"
                                        placeholder="인증번호 입력"
                                        value={verificationCode}
                                        onChange={handleVerificationCode}
                                    />
                                </div>
                            </S.VerificationField>

                            <div className="errorMessageWrap">
                                {verificationCodeValid && (
                                        <div style={correctStyle}>이메일 인증 완료.</div>
                                )}
                                {verificationCodeValid !== null && !verificationCodeValid && (
                                        <div>이메일 인증 실패.</div>
                                    )}
                            </div>

                            <S.CheckBtn
                                type="button"
                                onClick={onClickVerficationCode}
                                style={{
                                    position: "absolute",
                                    top: "299px", // 원하는 위치로 조정
                                    right: "760px", // 원하는 위치로 조정
                                }}
                            >
                                확인
                            </S.CheckBtn>

                            <div className="inputTitle">닉네임</div>
                            <div className="inputWrap">
                                <input
                                    type="text"
                                    className="input"
                                    name="nickname"
                                    placeholder="사용하실 닉네임을 입력하세요"
                                    value={formData.nickname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="errorMessageWrap">
                                {/* {!nicknameValid && nickname.length > 10 && (
                                        <div>올바른 닉네임을 입력하세요</div>
                                    )} */}
                            </div>

                            <S.CheckBtn
                                type="button"
                                onClick={onClickCheckNickName}
                                style={{
                                    position: "absolute",
                                    top: "385px", // 원하는 위치로 조정
                                    right: "380px", // 원하는 위치로 조정
                                }}
                            >
                                중복 확인
                            </S.CheckBtn>

                            <div className="inputTitle">비밀번호</div>
                            <div className="inputWrap">
                                <input
                                    type="password"
                                    className="input"
                                    name="password"
                                    value={formData.password}
                                    onChange={handlePassword}
                                    placeholder="영문,숫자,특수기호 포함 8글자 이상 되어야 합니다."
                                />
                            </div>
                            <div className="errorMessageWrap">
                                {!inputCheckPassword && formData.password.length != 0 && (
                                        <div>형식에 맞게 입력해 주세요.</div>
                                )}
                                {inputCheckPassword && (
                                        <div style={correctStyle}>사용가능한 비밀번호 입니다.</div>
                                    )}
                            </div>
                            <div className="inputTitle">비밀번호 확인</div>
                            <div className="inputWrap">
                                <input
                                    type="password"
                                    className="input"
                                    value={confirmPassword}
                                    onChange={handleConfirmPassword}
                                    placeholder="비밀번호 확인"
                                />
                            </div>
                            <div className="errorMessageWrap">
                                {passwordMatchError && (
                                    <div>비밀번호가 일치하지 않습니다.</div>
                                )}
                                {passwordMatchError !== null && !passwordMatchError &&(
                                    <div style={correctStyle}>비밀번호가 일치합니다.</div>
                                )}
                            </div>
                        </S.InputField>
                    </div>

                    <div>
                        <S.CheckBtn
                            type="button"
                            onClick={handleSubmit}
                            style={{
                                position: "absolute",
                                top: "670px", // 원하는 위치로 조정
                                right: "700px",
                                backgroundColor: "#a1b6ff",
                            }}
                        >
                            생성
                        </S.CheckBtn>
                    </div>
                </S.SignupCreateBox>
            </div>
        </form>
    );
};

export default Signup;
