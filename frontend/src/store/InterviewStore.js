import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setCurrentRoomWebSocket } from "./InterviewWebSocketStore";
import { useDispatch } from "react-redux";

axios.defaults.withCredentials = true;

const initialState = {
  room: [],
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
          message: "cccccchhhhaattt",
        },
      },
      {
        type: "SYSTEM",
        data: {
          memberId: "testuser1",
          message: "syasss",
        },
      },
      {
        type: "CHAT",
        data: {
          memberId: "testuser1",
          message: "cccccchhhhaattt123123",
        },
      },
    ],
  },
};

export const getInterviewRoom = createAsyncThunk(
  "getInterViewRoom",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/interviews/rooms", _, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getInterviewRoomByCategory = createAsyncThunk(
  "getInterviewRoomByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/interviews/rooms/${category}`, {
        withCredentials: true,
      });
      console.log(res);
      return res.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// interviewWebSocketStore state 에 currentRoom 방을 전달
export const joinInterviewRoom = createAsyncThunk(
  "joinInterviewRoom",
  async (roomId, thunkAPI) => {
    try {
      const res = await axios.post(`/api/interviews/join/${roomId}`, {
        withCredentials: true,
      });
      thunkAPI.dispatch(setCurrentRoomWebSocket(res.data));
      return res.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    setCurrentRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
    exitCurrentRoom: (state, action) => {
      state.currentRoom = { members: [] };
    },
  },
  extraReducers: {
    [getInterviewRoom.fulfilled]: (state, { payload }) => {
      state.room = payload.data;
    },
    [getInterviewRoomByCategory.fulfilled]: (state, { payload }) => {
      state.room = payload.data;
    },
    [joinInterviewRoom.fulfilled]: (state, { payload }) => {
      console.log("get11", payload.data);
      state.currentRoom = payload.data;
    },
  },
});

export const { setCurrentRoom, exitCurrentRoom } = interviewSlice.actions;

export const interviewActions = interviewSlice.actions;

export default interviewSlice.reducer;
