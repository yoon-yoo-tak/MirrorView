import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setIdValid,
  setPasswordValid,
  setNotAllow,
  loginSuccess,
  loginFailure,
} from "../../store/auth";
import axios from "axios";

const Login = () => {
  const { id, password, idValid, passwordValid, notAllow } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 여기까지는 기존 react랑 일치하는거고

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("/api/login", formData);
  //     // 로그인이 성공하면 사용자 정보를 스토어에 저장
  //     dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
  //     history.push("/"); // 로그인 후 리다이렉션할 페이지 설정
  //   } catch (error) {
  //     // 로그인 실패 시 에러 처리
  //     dispatch({
  //       type: "USER_LOGIN_FAILURE",
  //       payload: error.response.data.error,
  //     });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", formData);
      dispatch(loginSuccess(response.data.user));
      navigate.push("/");
    } catch (error) {
      dispatch(loginFailure(error.response.data.error));
    }
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  //   console.log(formData);
  // };

  // const handleEmail = (e) => {
  //   dispatch(setEmailValid(e.target.value));
  //   dispatch(setNotAllow());
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     email: e.target.value,
  //   }));
  // };

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

  return (
    <form onSubmit={handleSubmit}>
      <div className="page">
        <div className="titleWrap">아이디와 비밀번호를 입력하세요</div>

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
            {!idValid && id.length > 0 && <div>아이디를 입력하세요</div>}
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

export default Login;

// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { loginSuccess, loginFailure } from "./slices/authSlice";
// import axios from "axios";

// const LoginForm = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const dispatch = useDispatch();
//   const history = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/api/login", formData);
//       // 로그인이 성공하면 사용자 정보를 스토어에 저장
//       dispatch(loginSuccess(formData));
//       history.push("/"); // 로그인 후 리다이렉션할 페이지 설정
//     } catch (error) {
//       // 로그인 실패 시 에러 처리
//       dispatch(loginFailure(error.response.data.error));
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         placeholder="Email"
//       />
//       <input
//         type="password"
//         name="password"
//         value={formData.password}
//         onChange={handleChange}
//         placeholder="Password"
//       />
//       <button type="submit">로그인</button>
//     </form>
//   );
// };

// export default LoginForm;
