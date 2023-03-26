import { createSlice } from "@reduxjs/toolkit";

export const commune = createSlice({
  name: "commune",
  initialState: {
    currentCode: "",
    currentCompleteCode: "", 
    // currentCompleteCode: "36044", // for test
  },
  reducers: {
    updateCommuneCodes: (state, props) => {
        const payload = props.payload;
        state.currentCode = payload.currentCode;
        state.currentCompleteCode = payload.currentCompleteCode;
    }
  },
});

export const { updateCommuneCodes } = commune.actions;

export default commune.reducer;
