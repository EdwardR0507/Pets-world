import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axiosConfig";

const initialState = {
  auth: {},
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/nuevo", user);
      return data;
    } catch (error) {
      rejectWithValue(error.response.data.mensaje);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/login", user);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.mensaje);
    }
  }
);

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
