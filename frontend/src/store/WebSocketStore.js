import {
  createSlice,
  createAsyncThunk,
  configureStore,
} from "@reduxjs/toolkit";
import {
  updateChatRooms,
  addChatRoom,
  deleteChatRoom,
} from "store/ChatRoomStore";

// 여기는 오픈 채팅 global sub/pub 로 사용

// state에 client 객체를 직렬화 문제 때문에 저장할 수가 없다.
//let client;

// chat room 생성 구독 thunk
export const subscribeChatRoomCreate = createAsyncThunk(
  "webSocket/subscribeChatRoomCreate",
  (client, { dispatch }) => {
    if (client) {
      client.subscribe("/sub/chatrooms.room", (message) => {
        const parsedMessage = JSON.parse(message.body);
        // console.log(parsedMessage);
        switch (parsedMessage.type) {
          case "create":
            const chatRoom = parsedMessage.data.room;
            dispatch(addChatRoom(chatRoom));
            break;
          case "delete":
            const chatRoomIdDelete = parsedMessage.data.roomId;
            dispatch(deleteChatRoom(chatRoomIdDelete)); // Assuming you have a deleteChatRoom action
            break;
          // Add more cases as needed
          default:
            // Handle unknown message types or other cases
            break;
        }
      });
    }
  }
);

// chat room 삭제 구독 thunk
export const subscribeChatRoomDelete = createAsyncThunk(
  "webSocket/subscribeChatRoomDelete",
  (client) => {
    if (client) {
      client.subscribe("/sub/chatRoom/delete", (message) => {
        const chatRoomId = JSON.parse(message.body);
        // 추가 작업 수행 (예: dispatch를 사용하여 상태 업데이트)
      });
    }
  }
);

// 유저 chat rooms 구독 thunk
export const subscribeUserChatRooms = createAsyncThunk(
  "webSocket/subscribeUserChatRooms",
  (client, { dispatch }) => {
    if (client) {
      client.subscribe("/user/sub/chatrooms", (message) => {
        const chatRooms = JSON.parse(message.body);
        dispatch(updateChatRooms(chatRooms));
      });
    }
  }
);

// 유저 카운트 thunk
export const subscribeUserCount = createAsyncThunk(
  "webSocket/subscribeUserCount",
  (client, { dispatch }) => {
    if (client) {
      client.subscribe("/sub/count", (message) => {
        const userCount = message.body;
        dispatch(updateUserCount(userCount)); // 액션 디스패치로 유저 수 업데이트
      });
    }
  }
);

// 유저 수 업데이트 액션 정의
const updateUserCount = (count) => ({
  type: "webSocket/updateUserCount",
  payload: count,
});

// 웹소켓 슬라이스 정의
const webSocketSlice = createSlice({
  name: "webSocket",
  initialState: {
    isConnected: false,
    error: null,
    userCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase("webSocket/updateUserCount", (state, action) => {
      // console.log(action.payload);
      state.userCount = action.payload;
    });
  },
});

// 스토어 생성
export const store = configureStore({
  reducer: {
    webSocket: webSocketSlice.reducer,
  },
});

// state에 client 객체를 직렬화 문제 때문에 저장할 수가 없다.
// 다른 컴포넌트에서 사용할 수 있는 getClient 함수
// 이제 client는 전역 변수로 관리되며, 필요한 경우 getClient() 함수를 통해 접근할 수 있습니다.

// 리듀서 export 추가
export default webSocketSlice.reducer;
