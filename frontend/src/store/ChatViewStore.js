import { createSlice } from "@reduxjs/toolkit";

export const chatViewSlice = createSlice({
  name: "view",
  initialState: {
    view: "ChatList",
  },
  reducers: {
    switchView: (state, action) => {
      state.view = action.payload;
    },
  },
});

export const { switchView } = chatViewSlice.actions;

export default chatViewSlice.reducer;
