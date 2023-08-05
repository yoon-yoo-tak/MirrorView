import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getClient } from "./WebSocketStore";

// send는 따로 처리
// 구독과, 콜백만 처리

const initialState = {
  currentRoom: {},
  questions: [],
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
    setCurrentRoomWebSocket: (state, action) => {
      state.currentRoom = { ...action.payload.data, messages: [] };
    },

    // component chat button after
    sendMessage: (state, action) => {
      const client = getClient();
      const { roomId, data } = action.payload;
      client.send(`/app/interviewrooms/${roomId}`, {}, JSON.stringify(data));
    },

    // call back
    receiveMessage: (state, action) => {
      const message = action.payload;
      console.log("메시지 도착");
      console.log(state);
      if (state.currentRoom) {
        state.currentRoom.messages = [...state.currentRoom.messages, message];
      }
    },

    // component userjoinroom after
    userJoinRoom: (state, action) => {
      const client = getClient();
      const { interviewRoomId, userJoinData } = action.payload;

      console.log(userJoinData, " 유저데이터");

      client.send(
        `/app/interviewrooms/${interviewRoomId}`,
        {},
        JSON.stringify(userJoinData)
      );
    },

    // call back
    joinRoom: (state, action) => {
      console.log("callback ", action.payload);
      const member = action.payload;
      state.currentRoom.members = [...state.currentRoom.members, member];
    },

    // call back
    exitRoom: (state, action) => {
      console.log(action.payload, " exit call back 확인");
      const nickname = action.payload.nickname;
      console.log(nickname);
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
    addQuestion: (state, action) => {
      state.questions = [...state.questions, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(interviewThunk.fulfilled, (state, action) => {
      //state.client = action.payload;
    });
  },
});

export const {
  setCurrentRoomWebSocket,
  userJoinRoom,
  sendMessage,
  receiveMessage,
  joinRoom,
  exitRoom,
  readyStatus,
  roleChange,
  addQuestion,
} = interviewSlice.actions;
export const selectMessages = (state) => state.chat.currentRoom.messages;
export default interviewSlice.reducer;
