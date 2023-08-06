import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getClient } from "./WebSocketStore";
import axios from "axios";
// send는 따로 처리
// 구독과, 콜백만 처리

const initialState = {
  currentRoom: {members:[],},
  questions: [],
};

export const joinInterviewRoom = createAsyncThunk(
  "joinInterviewRoom",
  async (roomId, thunkAPI) => {
    try {
      const res = await axios.post(`/api/interviews/join/${roomId}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const interviewThunk = createAsyncThunk(
  "chat/initialize",
  async ({ client, interviewRoomId }, { dispatch, getState }) => {
    client.subscribe("/sub/interviewrooms/" + interviewRoomId, (message) => {
      const parsedMessage = JSON.parse(message.body);
      console.log(parsedMessage);
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
    // 유저가 조인시 방 가져오기
    setCurrentRoomWebSocket: (state, action) => {
      state.currentRoom = { ...action.payload.data, messages: [] };
    },

    // 방장이 방 만들 시 방 가져오기
    setCurrentRoom: (state, action) => {
      state.currentRoom = { ...action.payload, messages: [] };
    },

    // 메시지 보내기
    sendMessage: (state, action) => {
      const client = getClient();
      const { roomId, data } = action.payload;
      client.send(`/app/interviewrooms/${roomId}`, {}, JSON.stringify(data));
    },

    // 메시지 call back
    receiveMessage: (state, action) => {
      const message = action.payload;
      console.log("메시지 도착");
      console.log(state);
      if (state.currentRoom) {
        state.currentRoom.messages = [...state.currentRoom.messages, message];
      }
    },

    // 유저가 들어 왔을 때 동작
    userJoinRoom: (state, action) => {
      const client = getClient();
      const { interviewRoomId, userJoinData } = action.payload;

      const sendUserData = {
        type: "JOIN",
        data: userJoinData,
      };

      client.send(
        `/app/interviewrooms/${interviewRoomId}`,
        {},
        JSON.stringify(sendUserData)
      );
    },

    // 유저들에게 pub, call back
    joinRoom: (state, action) => {
      console.log("callback ", action.payload);
      // const member = {
      //   ...action.payload, // 기존의 데이터
      // };

      state.currentRoom.members = [...state.currentRoom.members, action.payload];
    },

    // call back
    exitRoom: (state, action) => {
      console.log(action.payload, " exit call back 확인");
      const nickname = action.payload.nickname;
      console.log(nickname);
      state.currentRoom.members = state.currentRoom.members.filter(
        (member) => member.nickname !== nickname
      );
      state.questions=[];
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
  extraReducers: {
    // db 에 들어온 멤버를 넣고, 방을 가져오니까 이미 멤버가 들어온 상태임
    // 근데 다른 유저들은 이 멤버를 모르는 상태
    // 이 멤버가 들어왔음을 기존, 다른 user들에게 알려야함
    [joinInterviewRoom.fulfilled]: (state, { payload }) => {
      state.currentRoom = { ...payload.data, messages: [] };
    },
  },
});

export const {
  setCurrentRoom,
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
