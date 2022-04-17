import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;

const initialState = {
  auth: {},
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk("auth/register", async (user) => {
  const { data } = await axios.post("/auth/nuevo", user);
  return data;
});

export const loginUser = createAsyncThunk("auth/login", async (user) => {
  const { data } = await axios.post("/auth/login", user);
  return data;
});

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
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.auth = payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, { error }) => {
      state.auth = {};
      state.loading = false;
      state.error = error.message;
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
    builder.addCase(loginUser.rejected, (state, { error }) => {
      state.auth = {};
      state.loading = false;
      state.error = error.message;
    });
  },
});

export default authSlice.reducer;
