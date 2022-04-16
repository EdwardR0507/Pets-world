import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;

const initialState = {
  user: {},
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk("user/register", async (data) => {
  const response = await axios.post("/auth/nuevo", data);
  return response.data;
});

export const loginUser = createAsyncThunk("user/login", async (data) => {
  const response = await axios.post("/auth/login", data);
  return response.data;
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // REGISTER
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    // LOGIN
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default userSlice.reducer;
