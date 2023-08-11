import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import React, { useContext } from "react";
import axios from "axios";

// 친구 신청 알람

const initialState = {
  globalMessage: [],
};

export const globalSubscribe = createAsyncThunk(
  "global/subscribe",
  async (client, { dispatch, getState }) => {
    await client.subscribe("/sub/global", (message) => {
      const parsedMessage = JSON.parse(message.body);
      console.log(parsedMessage);
      switch (
        parsedMessage.type
        // case "FRIEND_REQUEST":
        //   const messageContent = `${parsedMessage.data.fromUser}님이 친구 신청을 했습니다.`;
        //   //dispatch(addGlobalMessage(messageContent));
        //   break;
      ) {
      }
    });
  }
);

export const globalOneUserSubscribe = createAsyncThunk(
  "global/oneSubscribe",
  async (client, { dispatch, getState }) => {
    await client.subscribe("/user/sub/global.one", (message) => {
      const parsedMessage = JSON.parse(message.body);
      switch (parsedMessage.type) {
        case "FRIEND_REQUEST":
          const messageContent = `${parsedMessage.data.fromUser}님이 친구 신청을 했습니다.`;
          console.log(messageContent);
          //dispatch(addGlobalMessage(messageContent));
          dispatch(addGlobalMessage(messageContent));
          break;
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

export const { addGlobalMessage } = globalSlice.actions;
export default globalSlice.reducer;
