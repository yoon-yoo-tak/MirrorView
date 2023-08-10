import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getClient } from "./WebSocketStore";
import axios from "axios";

// 친구 신청 알람

const initialState = {



};

export const globalSubscribe = createAsyncThunk(
  "global/subscribe",
  async (_ , { dispatch, getState }) => {
    const client = getClient();
    await client.subscribe("/sub/global", (message) => {
      console.log("asd");
      const parsedMessage = JSON.parse(message.body);
      console.log(parsedMessage);
      switch (parsedMessage.type) {
        case "FRIEND_REQUEST":
          console.log(parsedMessage.data);

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
   


  },
});

export const {


} = globalSlice.actions;
export default globalSlice.reducer;
