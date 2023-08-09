import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getClient } from "./WebSocketStore";
import axios from "axios";
// send는 따로 처리
// 구독과, 콜백만 처리

const initialState = {
  currentRoom: { members: [] },
  questions: [],
  feedbackList: [],
  nicknames: null,
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
      console.log(res.data.data);
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

// 내 자소서 불러오기
export const fetchEssays = createAsyncThunk(
  "essays/fetchAll",
  async (nickname, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get("/api/essays");
      dispatch(addEssays({ data: response.data.data, nickname }));
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const setStartedState = createAsyncThunk(
  "room/setStartedState",
  async (roomId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`/api/interviews/started/${roomId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



// 하나의 채널 구독하고 case 로 처리
export const interviewSubscribe = createAsyncThunk(
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
          // 내정보는 무시, 상대 정보만 나에게 pub
          const myNickname = getState().auth.user.nickname;
          const authNickname = parsedMessage.data.nickname;
          if (myNickname === authNickname) {
            return;
          }

          dispatch(joinRoom(parsedMessage.data));
          break;
        case "EXIT":
          dispatch(exitRoom(parsedMessage.data));
          break;
        case "READY_CHANGE":
          dispatch(readyChange(parsedMessage.data));
          break;
        case "ROLE_CHANGE":
          dispatch(roleChange(parsedMessage.data));
          break;
        case "MAIN_ESSAY":
          dispatch(selectedEssay(parsedMessage.data));
          break;
        case "ROOM_START":
          dispatch(roomStartState(parsedMessage.data));
          break;
        case "ROOM_START_CANCEL":
          dispatch(roomStartCancelState(parsedMessage.data));
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
      console.log(action.payload)

      state.currentRoom = { ...action.payload, messages: [] };
    },

    // 내가 나갈 경우 (소켓이 끊어져야함)
    clearCurrentRoom: (state, action) => {
      state.currentRoom = {};
      state.feedbackList = [];
      state.nicknames = null;
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
      if (!state.currentRoom.members) return; // 방 생성 이전에 오는 내 정보 무시
      console.log(action.payload);
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
      // 방이 생성이 아직 안됐는데 SYSTEM MESSAGE가 동작해서 오류가 나서 추가
      if (state.currentRoom && state.currentRoom.messages) {
        state.currentRoom.messages = [...state.currentRoom.messages, message];
      }
    },

    publishSelectedEssay: (state, action) => {
      const client = getClient();
      const { roomId, nickname, mainEssay } = action.payload;
      const sendData = {
        type: "MAIN_ESSAY",
        data: {
          nickname: nickname,
          mainEssay: mainEssay,
        },
      };
      client.send(
        `/app/interviewrooms/${roomId}`,
        {},
        JSON.stringify(sendData)
      );
    },

    // 대표 자소서 call back
    selectedEssay: (state, action) => {
      const { nickname, mainEssay } = action.payload;
      console.log(mainEssay);
      const member = state.currentRoom.members.find(
        (member) => member.nickname === nickname
      );

      if (member) member.mainEssay = mainEssay;
    },

    // "상대"가 나갈 경우 상대 currentRoom 방에서 제거, call back
    exitRoom: (state, action) => {
      const nickname = action.payload.nickname;
      state.currentRoom.members = state.currentRoom.members.filter(
        (member) => member.nickname !== nickname
      );
    },

    // call back
    readyChange: (state, action) => {
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
      let bool = false;
      console.log(state.feedbackList);
      state.feedbackList.forEach((feedback) => {
        if (feedback.nickname === action.payload.nickname) {
          bool = true;
          feedback.feedbacks.push({ question: action.payload.question, feedback: "", });

        }
      });
      if (!bool) {
        state.feedbackList = [...state.feedbackList, { nickname: action.payload.nickname, feedbacks: [{ question: action.payload.question, feedback: "" }] }];
      }
    },
    deleteQuestion: (state, action) => {
      const { index, targetUserIdx } = action.payload;
      const deleteFeedback = state.feedbackList[targetUserIdx].feedbacks;
      state.feedbackList[targetUserIdx].feedbacks.splice(index, 1);
      console.log(state.feedbackList);
    },
    addFeedback: (state, action) => {
      const { index, targetUserIdx, value } = action.payload;
      state.feedbackList[targetUserIdx].feedbacks[index].feedback = value;
    },
    setNicknames: (state, action) => {
      state.nicknames = action.payload;
    },
    addEssays: (state, action) => {
      const member = state.currentRoom.members.find(
        (member) => member.nickname === action.payload.nickname
      );
      member.essays = action.payload.data;
    },
    roomStartState: (state, action) => {
      state.currentRoom.started = true;
    },
    roomStartCancelState: (state, action) => {
      state.currentRoom.started = false;
    },

  },
});

export const {
  joinedInterviewRoomCurrentRoomUpdate,
  clearCurrentRoom,
  setCurrentRoom,
  userJoinRoomPub,
  sendMessage,
  receiveMessage,
  joinRoom,
  exitRoom,
  readyChange,
  roleChange,
  addQuestion,
  deleteQuestion,
  addFeedback,
  setNicknames,
  addEssays,
  publishSelectedEssay,
  selectedEssay,
  roomStartState,
  roomStartCancelState,

} = interviewSlice.actions;
export const selectMessages = (state) => state.chat.currentRoom.messages;
export default interviewSlice.reducer;
