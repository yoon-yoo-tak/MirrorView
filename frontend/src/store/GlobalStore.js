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

export const formatDateTime = (datetimeStr) => {
  const date = new Date(datetimeStr);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Intl.DateTimeFormat("default", options).format(date);
};

export const globalOneUserSubscribe = createAsyncThunk(
  "global/oneSubscribe",
  async (client, { dispatch, getState }) => {
    await client.subscribe("/user/sub/global.one", (message) => {
      const parsedMessage = JSON.parse(message.body);
      switch (parsedMessage.type) {
        case "FRIEND_REQUEST":
          dispatch(addNotification(parsedMessage.data.notification));
          break;
      }
    });
  }
);

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.globalMessage = action.payload;
    },
    addNotification: (state, action) => {
      state.globalMessage.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.globalMessage = state.globalMessage.filter(
        (notif) => notif.id !== action.payload
      );
    },
  },
});

export const { addNotification, removeNotification, setNotifications } =
  globalSlice.actions;
export default globalSlice.reducer;
