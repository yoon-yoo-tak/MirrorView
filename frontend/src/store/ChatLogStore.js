import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getClient } from "store/WebSocketStore";

const initialState = {
  chatHistory: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    fetchChatHistoryReducer: (state, action) => {
      console.log(action.payload, " update history");
      state.chatHistory = action.payload;
    },
    addChatMessageReducer: (state, action) => {
      state.chatHistory.push(action.payload);
    },
  },
});

export const { fetchChatHistoryReducer, addChatMessageReducer } =
  chatSlice.actions;

export const fetchChatHistory = createAsyncThunk(
  "chat/fetchChatHistory",
  async (roomTitle, thunkAPI) => {
    const client = getClient();
    const { dispatch } = thunkAPI;

    client.subscribe("/user/sub/chatrooms/" + roomTitle, (message) => {
      console.log("pub 발생");
      const chatHistory = JSON.parse(message.body);
      dispatch(fetchChatHistoryReducer(chatHistory));
    });

    client.subscribe("/sub/chatrooms/" + roomTitle, (message) => {
      console.log("pub 발생");
      const newMessage = JSON.parse(message.body);
      dispatch(addChatMessageReducer(newMessage));
    });

    client.send("/app/chatrooms/" + roomTitle);
  }
);

const createChatMessage = (userId, content, timestamp) => {
  return {
    userId: userId,
    message: content,
    timestamp: timestamp,
  };
};

export const sendChat = createAsyncThunk(
  "chat/send",
  async ({ roomId, message, nickname }, thunkAPI) => {
    const client = getClient();
    const chatMessage = createChatMessage(
      nickname,
      message,
      new Date().toISOString()
    ); // 임시 유저

      console.log(chatMessage)

    client.publish({
      destination: `/app/chatrooms.send/${roomId}`,
      body: JSON.stringify(chatMessage),
    });
  }
);

export default chatSlice.reducer;
