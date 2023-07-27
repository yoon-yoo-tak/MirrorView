// src/store/userReducer.js
// const initialState = {
//   currentUser: null,
//   error: null,
// };

// const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "USER_LOGIN_SUCCESS":
//       return {
//         ...state,
//         currentUser: action.payload,
//         error: null,
//       };
//     case "USER_LOGIN_FAILURE":
//       return {
//         ...state,
//         error: action.payload,
//       };
//     case "USER_LOGOUT":
//       return {
//         ...state,
//         currentUser: null,
//       };
//     default:
//       return state;
//   }
// };

// export default userReducer;

// 위의 코드까지는 기존의 redux인거고
// toolkit을 사용하면 아래의 createSlice를 사용한다!

// slice, 기존 reducer를 따로 만들지 않고 이렇게 생성

import { createSlice } from "@reduxjs/toolkit";
// action에 대한 함수와  reducer를 따로 생성하지 않아도 된다!
const initialState = {
    id: "",
    password: "",
    nickname: "",
    email: "",
    idValid: false,
    passwordValid: false,
    passwordCheckValid: false,
    nicknameValid: false,
    emailValid: false,
    notAllow: true,
    user: null,
};
// initialState를 통해 state의 처음 상태를 정의한다.

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIdValid: (state, action) => {
            state.id = action.payload;
        },

        setEmailValid: (state, action) => {
            state.email = action.payload;
            state.emailValid =
                /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
                    action.payload
                );
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setPasswordValid: (state, action) => {
            // state.password = action.payload;
            state.passwordValid =
                /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/.test(
                    action.payload
                );
        },
        // setPassword: (state, action) => {
        //     state.password = action.payload;
        // },
        setPasswordCheckValid: (state, action) => {
            state.passwordCheckValid = action.payload;
        },
        setNicknameValid: (state, action) => {
            state.nickname = action.payload;
        },
        setNotAllow: (state, action) => {
            state.notAllow = action.payload;
        },
        signInSuccess: (state, action) => {},
        loginSuccess: (state, action) => {
            state.user = action.payload;
        },
        loginFailure: (state, action) => {
            state.user = null;
        },
    },
});
// reducers에서 action을 정의한다!

export const {
    setPassword,
    setIdValid,
    setPasswordValid,
    setPasswordCheckValid,
    setEmailValid,
    setNicknameValid,
    setNotAllow,
    loginSuccess,
    loginFailure,
} = authSlice.actions;

export default authSlice.reducer;
// 내보내자!
