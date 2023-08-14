import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import React, { useContext } from "react";
import axios from "axios";

// 친구 신청 알람

const initialState = {
  globalMessage: [],
  privateRooms: [],
  currentPrivateRoom: null,
  currentPrivateChat: [],
};

export const globalSubscribe = createAsyncThunk(
  "global/subscribe",
  async (client, { dispatch, getState }) => {
    await client.subscribe("/sub/global", (message) => {
      const parsedMessage = JSON.parse(message.body);
      switch (parsedMessage.type) {
        case "GLOBAL_MESSAGE":
          dispatch(addNotification(parsedMessage.data.notification));
          break;
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
        case "FRIEND_ACCEPTED":
          dispatch(addNotification(parsedMessage.data.notification));
          break;
        case "GET_PRIVATE_ROOMS":
          // 사용자의 모든 채팅방 정보
          dispatch(setPrivateRooms(parsedMessage.data.rooms));
          break;
        case "GET_PRIVATE_ROOM":
          // 특정 사용자와의 채팅방 정보
          dispatch(addNotification(parsedMessage.data.notification));
          dispatch(setPrivateRoom(parsedMessage.data));
          break;
        case "GET_PRIVATE_ROOM_CHAT":
          // 특정 채팅방의 채팅 내역
          dispatch(setPrivateChat(parsedMessage.data.chatList));
          break;
        case "SEND_PRIVATE_ROOM":
          // 메시지를 전송한
          dispatch(addPrivateChatMessage(parsedMessage.data.message));
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
      state.globalMessage = [...state.globalMessage, action.payload];
    },
    removeNotification: (state, action) => {
      state.globalMessage = state.globalMessage.filter(
        (notif) => notif.id !== action.payload
      );
    },
    setPrivateRooms: (state, action) => {
      state.privateRooms = action.payload;
    },
    setPrivateRoom: (state, action) => {
      state.currentPrivateRoom = action.payload;
    },
    setPrivateChat: (state, action) => {
      console.log(action.payload);
      state.currentPrivateChat = action.payload;
    },
    addPrivateChatMessage: (state, action) => {
      console.log(action.payload);
      state.currentPrivateChat.push(action.payload);
    },
  },
});

export const {
  addNotification,
  removeNotification,
  setNotifications,
  setPrivateRooms,
  setPrivateRoom,
  setPrivateChat,
  addPrivateChatMessage,
} = globalSlice.actions;
export default globalSlice.reducer;
