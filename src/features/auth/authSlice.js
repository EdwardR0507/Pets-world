import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authActions";

const initialState = {
  auth: {},
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // REGISTER
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // LOGIN
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.auth = payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.auth = {};
      state.loading = false;
      state.error = payload;
    });
  },
});

export default authSlice.reducer;
