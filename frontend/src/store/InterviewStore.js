import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

export const joinInterviewRoom = createAsyncThunk(
  "joinInterviewRoom",
  async (roomId, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/interviews/join/${roomId}`, {
        withCredentials: true,
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
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
      exitCurrentRoom:(state, action)=>{
          state.currentRoom = {members :[]};
      }
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

export const {setCurrentRoom,exitCurrentRoom} = interviewSlice.actions;

export const interviewActions = interviewSlice.actions;

export default interviewSlice.reducer;