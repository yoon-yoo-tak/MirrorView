// src/components/RegisterForm.js

// 회원가입에 필요한 것 아이디 비밀번호 이메일 별명

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    setIdValid,
    setPasswordValid,
    setEmailValid,
    setNicknameValid,
    setNotAllow,
} from "../../store/AuthStore";
import axios from "axios";

const Signup = () => {
    const {
        id,
        password,
        nickname,
        email,
        idValid,
        passwordValid,
        nicknameValid,
        emailValid,
        notAllow,
    } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        id: "",
        password: "",
        email: "",
        nickname: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleId = (e) => {
        dispatch(setIdValid(e.target.value));
        dispatch(setNotAllow());
        setFormData((prevState) => ({
            ...prevState,
            id: e.target.value,
        }));
    };

    const handlePassword = (e) => {
        dispatch(setPasswordValid(e.target.value));
        dispatch(setNotAllow());
        setFormData((prevState) => ({
            ...prevState,
            password: e.target.value,
        }));
    };

    const handleNickname = (e) => {
        dispatch(setNicknameValid(e.target.value));
        dispatch(setNotAllow());
        setFormData((prevState) => ({
            ...prevState,
            nickname: e.target.value,
        }));
    };

    const handleEmail = (e) => {
        dispatch(setEmailValid(e.target.value));
        dispatch(setNotAllow());
        setFormData((prevState) => ({
            ...prevState,
            email: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/users", formData);
            // 회원가입이 성공하면 사용자 정보를 스토어에 저장
            dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
            navigate.push("/login"); // 회원가입 후 리다이렉션할 페이지 설정
        } catch (error) {
            // 회원가입 실패 시 에러 처리
            dispatch({
                type: "USER_LOGIN_FAILURE",
                payload: error.response.data.error,
            });
        }
    };

    return (
        // <form onSubmit={handleSubmit}>
        //   <input
        //     type="text"
        //     name="username"
        //     value={formData.username}
        //     onChange={handleChange}
        //     placeholder="Username"
        //   />
        //   <input
        //     type="email"
        //     name="email"
        //     value={formData.email}
        //     onChange={handleChange}
        //     placeholder="Email"
        //   />
        //   <input
        //     type="password"
        //     name="password"
        //     value={formData.password}
        //     onChange={handleChange}
        //     placeholder="Password"
        //   />
        //   <button type="submit">회원가입</button>
        // </form>
        <form onSubmit={handleSubmit}>
            <div className="page">
                <div className="titleWrap">회원 정보를 입력해주세요</div>

                <div className="contentWrap">
                    <div className="inputTitle">아이디</div>
                    <div className="inputWrap">
                        <input
                            type="text"
                            className="input"
                            placeholder="id"
                            value={id}
                            onChange={handleId}
                        />
                    </div>
                    <div className="errorMessageWrap">
                        {!idValid && id.length > 0 && (
                            <div>아이디를 입력하세요</div>
                        )}
                    </div>
                    <div className="inputTitle">비밀번호</div>
                    <div className="inputWrap">
                        <input
                            type="password"
                            className="input"
                            value={password}
                            onChange={handlePassword}
                            placeholder="영문, 숫자 어쩌구"
                        />
                    </div>
                    <div className="errorMessageWrap">
                        {!passwordValid && password.length > 0 && (
                            <div>올바른 비밀번호를 입력하세요</div>
                        )}
                    </div>
                    <div className="inputTitle">닉네임</div>
                    <div className="inputWrap">
                        <input
                            type="text"
                            className="input"
                            placeholder="id"
                            value={nickname}
                            onChange={handleNickname}
                        />
                    </div>
                    <div className="errorMessageWrap">
                        {!nicknameValid && nickname.length > 0 && (
                            <div>올바른 닉네임을 입력하세요</div>
                        )}
                    </div>
                    <div className="inputTitle">이메일</div>
                    <div className="inputWrap">
                        <input
                            type="text"
                            className="input"
                            placeholder="email"
                            value={email}
                            onChange={handleEmail}
                        />
                    </div>
                    <div className="errorMessageWrap">
                        {!emailValid && email.length > 0 && (
                            <div>올바른 이메일을 입력하세요</div>
                        )}
                    </div>
                </div>

                <div>
                    <button disabled={notAllow} className="bottomButton">
                        확인
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Signup;
