import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;

const initialState = {
  user: {},
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk("user/register", async (user) => {
  const { data } = await axios.post("/auth/nuevo", user);
  return data;
});

export const loginUser = createAsyncThunk("user/login", async (user) => {
  const { data } = await axios.post("/auth/login", user);
  return data;
});

export const getUserByUsername = createAsyncThunk(
  "/user/data",
  async (username) => {
    const { data } = await axios.get("/usuarios/obtener");
    return data.find((user) => user.nombreUsuario === username);
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // REGISTER
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, { error }) => {
      state.user = {};
      state.loading = false;
      state.error = error.message;
    });
    // LOGIN
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, { error }) => {
      state.user = {};
      state.loading = false;
      state.error = error.message;
    });
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
    builder.addCase(getUserByUsername.rejected, (state, { error }) => {
      state.user = {};
      state.loading = false;
      state.error = error.message;
    });
  },
});

export default userSlice.reducer;
