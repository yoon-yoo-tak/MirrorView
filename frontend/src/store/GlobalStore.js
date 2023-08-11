import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import React, { useContext } from "react";
import { WebSocketContext } from "WebSocketContext";
import axios from "axios";

// 친구 신청 알람

const initialState = {};

export const globalSubscribe = createAsyncThunk(
  "global/subscribe",
  async (client, { dispatch, getState }) => {
    await client.subscribe("/sub/global", (message) => {
      console.log("asd");
      const parsedMessage = JSON.parse(message.body);
      console.log(parsedMessage);
      switch (parsedMessage.type) {
        case "FRIEND_REQUEST":
          const messageContent = `${parsedMessage.data.fromUser}님이 친구 신청을 했습니다.`;
          dispatch(addGlobalMessage(messageContent));
          break;
        // case "CHAT":
        //   dispatch(receiveMessage(parsedMessage));
        //   break;
      }
    });
  }
);

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    addGlobalMessage: (state, action) => {
      state.globalMessage.push(action.payload);
      console.log(state.globalMessage);
    },


  },
});

export const {
  addGlobalMessage,

} = globalSlice.actions;
export default globalSlice.reducer;
