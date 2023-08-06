import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getClient } from "./WebSocketStore";
import axios from "axios";
// send는 따로 처리
// 구독과, 콜백만 처리

const initialState = {
  currentRoom: {},
  questions: [],
};

// db 에 들어온 멤버를 넣고, 방을 가져오니까 이미 멤버가 들어온 상태임
// 근데 다른 유저들은 이 멤버를 모르는 상태
// 이 멤버가 들어왔음을, 기존 다른 user들에게 알려야함
// 다른 유저들에게 해당유저 pub(방금 들어온 유저는 제외한 상태로) -> 입장유저가 방 subscribe -> 입장 유저는 디비에서 방 데이터를 가져옴(자신 포함)

// 일반 유저용 currentRoomUpdate
export const joinInterviewRoom = createAsyncThunk(
  "joinInterviewRoom",
  async (roomId, thunkAPI) => {
    try {
      const res = await axios.post(`/api/interviews/join/${roomId}`, {
        withCredentials: true,
      });
      thunkAPI.dispatch(joinedInterviewRoomCurrentRoomUpdate(res.data.data));
      return res.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// 방장용 currentRoomUpdate
export const hostJoinInterviewRoom = createAsyncThunk(
  "rooms/fetch",
  async (roomId, thunkAPI) => {
    try {
      const res = await axios.get(`/api/interviews/find/${roomId}`);
      thunkAPI.dispatch(joinedInterviewRoomCurrentRoomUpdate(res.data.data));
      return res.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// 하나의 채널 구독하고 case 로 처리
export const interviewSubscribe = createAsyncThunk(
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
    // currentRoom update
    joinedInterviewRoomCurrentRoomUpdate: (state, action) => {
      state.currentRoom = { ...action.payload, messages: [] };
    },

    // 유저가 들어 왔을 때 다른 유저들에게 해당 유저 send
    userJoinRoomPub: (state, action) => {
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

    // 유저들에게 내정보 pub, call back
    joinRoom: (state, action) => {
      state.currentRoom.members = [
        ...state.currentRoom.members,
        action.payload,
      ];
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
      if (state.currentRoom) {
        state.currentRoom.messages = [...state.currentRoom.messages, message];
      }
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
      const { nickname, roles } = action.payload;
      const member = state.currentRoom.members.find(
        (member) => member.nickname === nickname
      );
      if (member) member.roles = roles;
    },
    addQuestion: (state, action) => {
      state.questions = [...state.questions, action.payload];
    },
  },
});

export const {
  setCurrentRoom,
  userJoinRoomPub,
  sendMessage,
  receiveMessage,
  joinRoom,
  exitRoom,
  readyStatus,
  roleChange,
  addQuestion,
  joinedInterviewRoomCurrentRoomUpdate,
} = interviewSlice.actions;
export const selectMessages = (state) => state.chat.currentRoom.messages;
export default interviewSlice.reducer;
