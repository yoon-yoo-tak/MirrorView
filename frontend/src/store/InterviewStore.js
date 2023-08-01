import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

const initialState = {
    room :[]
};

export const getInterviewRoom = createAsyncThunk(
    "getInterViewRoom",
    async(_,{rejectWithValue}) => {
        try{
            const res = await axios.get("http://localhost:8080/api/interviews/rooms",_,{
                withCredentials: true,
            });
            return res.data;
        } catch(error){
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
)

export const getInterviewRoomByCategory = createAsyncThunk(

)

const interviewSlice = createSlice({
    name:"interview",
    initialState,
    reducers:{

    },
    extraReducers:{
        [getInterviewRoom.fulfilled]:(state,{payload})=>{
            state.room = payload.data;
        }
    }
});

export const interviewActions = interviewSlice.actions;

export default interviewSlice.reducer;