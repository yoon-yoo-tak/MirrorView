// 여기가 이제 redux/toolkit에서 말하는 Store
// store/index.js

import { configureStore } from "@reduxjs/toolkit";
// 기존의 리덕스에서는 스토어를 생성한 후 미들웨어가 한 개 이상이라면 여러 메소드를 통해 긴 코드를 작성해야 했다
// 그치만 toolkit의  configureStore()를 사용하면
// 별도의 메소드 없이 바로 미들웨어를 추가할 수 있음!!
import authReducer from "./auth";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;

// configureStore 함수는 Redux Toolkit에서 제공하는 함수로, 스토어를 생성하는 역할을 합니다. 기본적으로 createStore와 비슷한 역할을 하지만, 몇 가지 추가 기능과 설정을 간편하게 구성할 수 있도록 도와줍니다.
