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
        essays: {},
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
  async ({ client, interviewRoomId }, { dispatch, getState }) => {
    client.subscribe("/sub/interviewrooms/" + interviewRoomId, (message) => {
      const parsedMessage = JSON.parse(message.body);
      switch (parsedMessage.type) {
        case "SYSTEM":
        case "CHAT":
          dispatch(receiveMessage(parsedMessage));
          break;
        case "JOIN":
          dispatch(joinRoom(parsedMessage.data));
          break;
        case "EXIT":
          dispatch(exitRoom(parsedMessage.data));
          break;
        case "READY_CHANGE":
          dispatch(readyStatus(parsedMessage.data));
          break;
        case "ROLE_CHANGE":
          dispatch(roleChange(parsedMessage.data));
          break;
        default:
          break;
      }
    });
  }
);

export const interviewSlice = createSlice({
  name: "interviewWebSocket",
  initialState,
  reducers: {
    // front button after
    sendMessage: (state, action) => {
      const client = getClient();
      const { roomId, data } = action.payload;
      client.send(`/app/interviewrooms/${roomId}`, {}, JSON.stringify(data));
    },

    // call back
    receiveMessage: (state, action) => {
      const message = action.payload;
      if (state.currentRoom) {
        state.currentRoom.messages = [...state.currentRoom.messages, message];
      }
    },

    // call back
    joinRoom: (state, action) => {
      const member = action.payload;
      state.currentRoom.members.push(member);
    },

    // call back
    exitRoom: (state, action) => {
      const nickname = action.payload.nickname;
      state.currentRoom.members = state.currentRoom.members.filter(
        (member) => member.nickname !== nickname
      );
    },

    // call back
    readyStatus: (state, action) => {
      const { nickname, ready } = action.payload;
      const member = state.currentRoom.members.find(
        (member) => member.nickname === nickname
      );
      if (member) member.ready = ready;
    },

    // call back
    roleChange: (state, action) => {
      const { nickname, role } = action.payload;
      const member = state.currentRoom.members.find(
        (member) => member.nickname === nickname
      );
      if (member) member.role = role;
    },
  },
});

export const {
  sendMessage,
  receiveMessage,
  joinRoom,
  exitRoom,
  readyStatus,
  roleChange,
} = interviewSlice.actions;
export const selectMessages = (state) => state.chat.currentRoom.messages;
export default interviewSlice.reducer;
