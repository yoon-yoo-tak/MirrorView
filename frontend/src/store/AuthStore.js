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

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// -----------------------------------------------------------
// import defaultImage from "../assets/defaultimage.png";
// -----------------------------------------------------------
import axios from "axios";

axios.defaults.withCredentials = true;
// action에 대한 함수와  reducer를 따로 생성하지 않아도 된다!
const initialState = {
  id: "",
  password: "",
  name: "",
  loginLoading: false,
  loginDone: false,
  loginError: null,
  nickname: "",
  email: "",
  accessToken: "",
  refreshToken: "",
  idValid: false,
  passwordValid: false,
  passwordCheckValid: false,
  nicknameValid: false,
  emailValid: false,
  notAllow: true,
  user: null,
  provider: "",
  // ---------------
  photo: "",
  // ---------------
};
// initialState를 통해 state의 처음 상태를 정의한다.

export const login = createAsyncThunk(
  "login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/users/login", data, {
        withCredentials: true,
      });

      //console.log(res);

      return res.data;
    } catch (error) {
      //console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "getUserInfo",
  async (accessToken, { rejectWithValue }) => {
    //console.log(accessToken);
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      const res = await axios.get("/api/mypage", {
        withCredentials: true,
      });

      //console.log(res);

      return res.data;
    } catch (error) {
      //console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const kakaoLogin = createAsyncThunk(
  "kakaoLogin",
  async (accessToken, { rejectWithValue }) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    try {
      const res = await axios.post("/api/users/login/kakao", {
        withCredentials: true,
      });
      //console.log(res);

      return res.data;
    } catch (error) {
      //console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setIdValid: (state, action) => {
      state.id = action.payload;
    },

    setUserEmail: (state, action) => {
      state.user.email = action.payload;
    },

    setEmailValid: (state, action) => {
      // state.email = action.payload;
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
    setNickname: (state, action) => {
      state.user.nickname = action.payload;
    },
    // --------------------------------------------
    setPhoto: (state, action) => {
      state.user.photo = action.payload;
    },
    // --------------------------------------------
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
    logout: (state, action) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.loginDone = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loginLoading = true;
        state.loginDone = false;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loginLoading = false;
        state.loginDone = true;
        state.loginError = null;
        state.accessToken = payload.data["access-token"];
        state.refreshToken = payload.data["refresh-token"];
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginDone = false;
        state.loginError = action.error;
      })
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        state.user = payload.data;
      })
      .addCase(kakaoLogin.pending, (state, action) => {
        state.loginLoading = true;
        state.loginDone = false;
        state.loginError = null;
      })
      .addCase(kakaoLogin.fulfilled, (state, { payload }) => {
        state.loginLoading = false;
        state.loginDone = true;
        state.loginError = null;
        state.provider = "kakao";
        state.accessToken = payload.data["access-token"];
        state.refreshToken = payload.data["refresh-token"];
      })
      .addCase(kakaoLogin.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginDone = false;
        state.loginError = action.error;
      });
  },
});
// reducers에서 action을 정의한다!

export const {
  setPassword,
  setIdValid,
  setPasswordValid,
  setPasswordCheckValid,
  setUserEmail,
  setEmailValid,
  setNicknameValid,
  setNotAllow,
  loginSuccess,
  loginFailure,
  setNickname,
  setPhoto,
  logout,
  setFullName,
} = authSlice.actions;

export const authActions = authSlice.actions;

export default authSlice.reducer;
// 내보내자!
