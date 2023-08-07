// src/components/RegisterForm.js

// 회원가입에 필요한 것 아이디 비밀번호 이메일 별명

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as S from "../../components/auth/UserStyledComponents";
// import {
//     // setIdValid,
//     // setPasswordValid,
//     // setEmailValid,
//     // setNicknameValid,
//     // setNotAllow,
// } from "../../store/AuthStore";
import axios from "axios";

const Signup = () => {
    // const {
    //     id,
    //     password,
    //     nickname,
    //     email,
    //     idValid,
    //     passwordValid,
    //     nicknameValid,
    //     emailValid,
    //     notAllow,
    // } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        userId: "",
        password: "",
        email: "",
        nickname: "",
        username:"",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputCheckPassword, setInputCheckPassword] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const onClickCheckId = (e) => {
        e.preventDefault();
        if (formData.userId === "") {
            alert("아이디를 입력해주세요.");
        } else {
            axios({
                url: `http://localhost:8000/api/users/${formData.userId}/check-id`,
                method: 'GET',
            })
                .then((res) => {
                    alert(res.data.msg);
                    
                })
                .catch((err) => {
                    alert("이미 잇는 아이디");
                    console.log("에러임");
                });
        }
    };
    const onClickCheckNickName = (e) => {
        e.preventDefault();
        if (formData.nickname === ""){
            alert("닉네임을 입력해 주세요.");
        }else{
            axios({
                url : `http://localhost:8000/api/users/${formData.nickname}/check-nickname`,
                method: 'GET',
            })
            .then((res) =>{
                alert(res.data.msg);
            }).catch((err) => {
                alert("이미 잇는 닉네임");
            })
        }
    }

    const emailAuth = (e) => { // 이메일인증 버튼 누르면 실행
        e.preventDefault();
        if (formData.email === ""){
            alert("이메일을 입력해 주세요.");
        }else{
            axios({
                url : `http://localhost:8000/api/users/${formData.email}`,
                method: 'GET',
            })
            .then((res) => {
                alert(res.data.msg);
            })
            .catch((err) => {
                alert("뭔가 잘못됨");
            })
        }
    }

    const handleCheckPassword = (e) => {
        setInputCheckPassword(e.target.value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/users", formData);
            // 회원가입이 성공하면 사용자 정보를 스토어에 저장
            console.log(response.data);
            // dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
            navigate("/login"); // 회원가입 후 리다이렉션할 페이지 설정
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
                            name="userId"
                            className="input"
                            placeholder="id"
                            value={formData.userId}
                            onChange={handleChange}
                        />
                    </div>
                    <button onClick={onClickCheckId}>아이디 중복 체크</button>
                    {/* <div className="errorMessageWrap">
                        {!idValid && id.length > 0 && (
                            <div>아이디를 입력하세요</div>
                        )}
                    </div> */}
                    <div className="inputTitle">비밀번호</div>
                    <div className="inputWrap">
                        <input
                            type="password"
                            name="password"
                            className="input"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="영문, 숫자 어쩌구"
                        />
                    </div>
                    {/* <div className="errorMessageWrap">
                        {!passwordValid && password.length > 0 && (
                            <div>올바른 비밀번호를 입력하세요</div>
                        )}
                    </div> */}
                    <div className="inputTitle">비밀번호 확인</div>
                    <div className="inputWrap">
                        <input
                            type="password"
                            className="input"
                            name = "inputCheckPassword"
                            value={inputCheckPassword}
                            onChange={handleCheckPassword}
                            placeholder="영문, 숫자 어쩌구"
                        />
                    </div>
                    <div className="inputTitle">닉네임</div>
                    <div className="inputWrap">
                        <input
                            type="text"
                            name = "nickname"
                            className="input"
                            placeholder="id"
                            value={formData.nickname}
                            onChange={handleChange}
                        />
                    </div>
                    <button onClick={onClickCheckNickName}>닉네임 중복체크</button>
                    {/* <div className="errorMessageWrap">
                        {!nicknameValid && nickname.length > 0 && (
                            <div>올바른 닉네임을 입력하세요</div>
                        )}
                    </div> */}
                    <div className="inputTitle">이메일</div>
                    <div className="inputWrap">
                        <input
                            type="text"
                            name = "email"
                            className="input"
                            placeholder="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    {/* <div className="errorMessageWrap">
                        {!emailValid && email.length > 0 && (
                            <div>올바른 이메일을 입력하세요</div>
                        )}
                    </div> */}
                </div>

                <div>
                    <button /*disabled={notAllow}*/ className="bottomButton">
                        확인
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Signup;
