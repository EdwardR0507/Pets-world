import { createSlice } from "@reduxjs/toolkit";
import { getUserByUsername } from "./userActions";

const initialState = {
  user: {},
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET USER BY USERNAME
    builder.addCase(getUserByUsername.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserByUsername.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getUserByUsername.rejected, (state, { payload }) => {
      state.user = {};
      state.loading = false;
      state.error = payload;
    });
  },
});

export default userSlice.reducer;
