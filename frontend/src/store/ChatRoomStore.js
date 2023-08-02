import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getClient } from "store/WebSocketStore";

const initialState = {
  chatRooms: [],
  selectedRoom: "",
};

// 비동기 thunk 생성
export const createChatRoomAsync = createAsyncThunk(
  "chatRooms/createChatRoomAsync",
  async (title, { dispatch, getState }) => {
    const client = getClient();
    if (!client) {
      throw new Error("WebSocket is not connected");
    }
    let roomOjb = {
      id: title,
      users: [],
      messages: [],
    };
    await client.send("/app/chatrooms.create", {}, JSON.stringify(roomOjb));
    return roomOjb;
  }
);

export const loadChatRooms = createAsyncThunk(
  "chatRooms/loadChatRooms",
  async (_, { dispatch, getState }) => {
    const client = getClient();
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
      state.selectedRoom = action.payload;
    },
    addChatRoom: (state, action) => {
      state.chatRooms.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase("/user/sub/chatrooms", (state, action) => {
      console.log(action.payload);
      state.chatRooms = action.payload;
    });
  },
});

export const { updateChatRooms, updateSelectedRoom, addChatRoom } =
  chatRoomSlice.actions;

export default chatRoomSlice.reducer;
