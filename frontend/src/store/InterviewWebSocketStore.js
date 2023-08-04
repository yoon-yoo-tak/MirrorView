import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getClient } from "./WebSocketStore";

// send는 따로 처리
// 구독과, 콜백만 처리

const initialState = {
  currentRoom: {
    id: "",
    title: "",
    host: "",
    members: [
      {
        nickname: "",
        ready: false,
        essays: [],
        role: "",
      },
    ],
    password: "",
    maxMemberCount: 0,
    category: "",
    isStarted: false,
    timestamp: null,
    messages: [
      {
        type: "CHAT",
        data: {
          memberId: "testuser1",
          message: "하이하이하이하이1111111하이",
        },
      },
      {
        type: "SYSTEM",
        data: {
          memberId: "testuser1",
          message: "하이하이하이하이하이",
        },
      },
      {
        type: "CHAT",
        data: {
          memberId: "testuser1",
          message: "하이하12312123123이하이하이하이",
        },
      },
    ],
  },
};

export const interviewThunk = createAsyncThunk(
  "chat/initialize",
  async ({ client, interviewRoomId }, { dispatch }) => {
    client.subscribe("/sub/interviewrooms/" + interviewRoomId, (message) => {
      const parsedMessage = JSON.parse(message.body);
      switch (parsedMessage.type) {
        case "CHAT": 
          console.log("메시지 수신")
          dispatch(receiveMessage(parsedMessage));
          break;
        case "JOIN":
          dispatch(enterRoom(parsedMessage));
          break;
        case "READY_STATUS":
          dispatch(readyStatus(parsedMessage));
          break;
        default:
          break;
      }
    });
  }
);

export const chatSlice = createSlice({
  name: "interviewWebSocket",
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      const client = getClient();
      const { roomId: currentRoomId, ...newMessage } = action.payload; 
      client.send(`/app/interviewrooms/${currentRoomId}`, {},
        JSON.stringify(newMessage),
      );
      //state.currentRoom.messages.push(action.payload);
    },
    receiveMessage: (state, action) => {
      console.log(action.payload)
      state.currentRoom.messages.push(action.payload);
    },
    enterRoom: (state, action) => {
      state.currentRoom.members.push(action.payload);
    },
    exitRoom:(state, action) => {
      const userId = action.payload.userId;
      state.currentRoom.members.filter(member => member.id !== userId);
    },
    readyStatus: (state, action) => {
      state.readyStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(interviewThunk.fulfilled, (state, action) => {
      //state.client = action.payload;
    });
  },
});

export const { sendMessage, receiveMessage, enterRoom, readyStatus } =
  chatSlice.actions;
export const selectMessages = (state) => state.chat.currentRoom.messages;

export default chatSlice.reducer;
