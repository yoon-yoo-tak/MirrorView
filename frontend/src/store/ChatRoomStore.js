import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  chatRooms: [], // 내부 객체 방
  selectedRoom: "",
};

// 비동기 thunk 생성
export const createChatRoomAsync = createAsyncThunk(
  "chatRooms/createChatRoomAsync",
  async ({ title, client }, { dispatch, getState }) => {
    if (!client) {
      throw new Error("WebSocket is not connected");
    }

    let roomOjb = {
      roomId: title,
    };

    const message = {
      type: "create",
      data: roomOjb,
    };
    await client.send("/app/chatrooms.room", {}, JSON.stringify(message));
  }
);

export const subscribeRoomCountAsync = createAsyncThunk(
  "chatRooms/subscribeRoomCountAsync",
  async (client, { dispatch, getState }) => {
    if (!client) {
      throw new Error("WebSocket is not connected");
    }
    await client.subscribe("/sub/chatrooms.count", function (message) {
      const payload = JSON.parse(message.body);
      console.log(payload);
      const count = payload.count;
      const roomId = payload.roomId; // 서버에서 보낸 roomId를 읽습니다.

      console.log("count sub에 대한 message 도착");

      dispatch(
        updateRoomCount({
          roomId: roomId,
          count: count,
        })
      );
    });
  }
);

export const loadChatRooms = createAsyncThunk(
  "chatRooms/loadChatRooms",
  async (client, { dispatch, getState }) => {
    if (!client) {
      throw new Error("WebSocket is not connected");
    }
    const chatRooms = await client.send("/app/chatrooms.get");
    return chatRooms;
  }
);

const chatRoomSlice = createSlice({
  name: "chatRooms",
  initialState,
  reducers: {
    updateChatRooms: (state, action) => {
      state.chatRooms = action.payload;
    },
    updateSelectedRoom: (state, action) => {
      state.selectedRoom = action.payload.title;
    },
    addChatRoom: (state, action) => {
      state.chatRooms = [...state.chatRooms, action.payload];
    },
    deleteChatRoom: (state, action) => {
      const roomIdToDelete = action.payload;
      state.chatRooms = state.chatRooms.filter(
        (room) => room.id !== roomIdToDelete
      );
    },
    updateRoomCount: (state, action) => {
      const index = state.chatRooms.findIndex(
        (room) => room.id === action.payload.roomId
      );

      if (index !== -1) {
        const room = state.chatRooms[index];
        const updatedRoom = { ...room, count: action.payload.count }; // 방의 새로운 사본을 만들고 count 속성을 업데이트
        state.chatRooms[index] = updatedRoom; // chatRooms 배열의 해당 방을 새로운 사본으로 대체
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase("/user/sub/chatrooms", (state, action) => {
      console.log(action.payload);
      state.chatRooms = action.payload;
    });
  },
});

export const {
  updateChatRooms,
  updateSelectedRoom,
  addChatRoom,
  updateRoomCount,
  deleteChatRoom,
} = chatRoomSlice.actions;

export default chatRoomSlice.reducer;
