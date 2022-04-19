import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;

const initialState = {
  user: {},
  loading: false,
  error: null,
};

export const getUserByUsername = createAsyncThunk(
  "user/data",
  async (username, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/usuarios/obtener");
      return data.find((user) => user.nombreUsuario === username);
    } catch (error) {
      return rejectWithValue(error.response.data.mensaje);
    }
  }
);

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
