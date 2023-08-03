import {
  createSlice,
  createAsyncThunk,
  configureStore,
} from "@reduxjs/toolkit";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {
  createChatRoomAsync,
  updateChatRooms,
  addChatRoom,
} from "store/ChatRoomStore";

// state에 client 객체를 직렬화 문제 때문에 저장할 수가 없다.
let client;

// 웹소켓 연결 Thunk 정의
export const initializeWebSocket = createAsyncThunk(
  "webSocket/initialize",
  async (accessToken, { dispatch }) => {
    // const accessToken = useSelector((state)=> state.auth.accessToken);
    const httpUrl = process.env.REACT_APP_WEBSOCKET_URL;
    const urlWithToken = `${httpUrl}?token=${accessToken}`;
    console.log(urlWithToken);
    try {
      client = Stomp.over(() => new SockJS(urlWithToken));
    } catch (error) {
      console.error(error);
    }
    // Promise를 반환합니다.
    return new Promise((resolve, reject) => {
      client.connect(
        { Authorization: `Bearer ${accessToken}` },
        (frame) => {
          console.log("WebSocket 연결 성공");
          resolve(true);
        },
        (error) => {
          console.log("WebSocket 오류: ", error);
          reject(Error(error)); // 연결에 실패하면 오류를 반환합니다.
        }
      );
    });
  }
);

// 웹소켓 연결 종료 Thunk 정의
export const closeWebSocket = createAsyncThunk(
  "webSocket/close",
  (_, { getState }) => {
    if (client !== null) {
      client.disconnect(
        () => {
          console.log("WebSocket 연결 종료");
          client = null;
        },
        (error) => {
          console.log("WebSocket 종료 오류: ", error);
          throw Error(error);
        }
      );
    }
  }
);

// chat room 생성 구독 thunk
export const subscribeChatRoomCreate = createAsyncThunk(
  "webSocket/subscribeChatRoomCreate",
  (client, { dispatch }) => {
    if (client) {
      client.subscribe("/sub/chatrooms.create", (message) => {
        const chatRoom = JSON.parse(message.body);
        dispatch(addChatRoom(chatRoom));
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
        const userCount = message.body
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
    builder
      .addCase("webSocket/updateUserCount", (state, action) => {
        console.log(action.payload)
        state.userCount = action.payload;
      })
      .addCase(initializeWebSocket.pending, (state) => {
        state.isConnected = false;
      })
      .addCase(initializeWebSocket.fulfilled, (state) => {
        state.isConnected = true;
      })
      .addCase(initializeWebSocket.rejected, (state, action) => {
        state.isConnected = false;
        state.error = action.error.message;
      })
      .addCase(closeWebSocket.pending, (state) => {
        state.isConnected = false;
      })
      .addCase(closeWebSocket.rejected, (state, action) => {
        state.error = action.error.message;
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
export function getClient() {
  return client;
}

// 리듀서 export 추가
export default webSocketSlice.reducer;
