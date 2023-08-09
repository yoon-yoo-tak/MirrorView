import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setCurrentRoomWebSocket } from "./InterviewWebSocketStore";
import { useDispatch } from "react-redux";

axios.defaults.withCredentials = true;

const initialState = {
    room: [],
    // ------------------------------
    feedbackList: [
        {
            name: "",
            feedbacks: { question: [], feedback: [] },
        },
    ],
    myRole: "interviewee",
    isStarted: false,
    //-------------------------------
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
    async ({ depth, category }, { rejectWithValue }) => {
        try {
            console.log(depth);
            console.log(category);
            const res = await axios.get(
                `/api/interviews/rooms/category?depth=${depth}&category=${category}`,
                {
                    withCredentials: true,
                }
            );
            console.log(res);
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
        exitCurrentRoom: (state, action) => {
            state.currentRoom = { members: [] };
        },
        updateFeedbacks: (state, action) => {
            state.feedbackList = action.payload;
        },
        setMyRoll: (state, action) => {
            state.myRole = action.payload;
        },
        updateStarted: (state, action) => {
            state.isStarted = action.payload;
        },
    },
    extraReducers: {
        [getInterviewRoom.fulfilled]: (state, { payload }) => {
            state.room = payload.data;
            console.log(state);
        },
        [getInterviewRoomByCategory.fulfilled]: (state, { payload }) => {
            state.room = payload.data;
        },
    },
});

export const { setCurrentRoom, exitCurrentRoom, updateStarted } =
    interviewSlice.actions;

export const interviewActions = interviewSlice.actions;

export default interviewSlice.reducer;
