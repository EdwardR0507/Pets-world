import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../helpers/axiosConfig";

const initialState = {
  shelters: [],
  loading: false,
  error: null,
};

export const getShelters = createAsyncThunk(
  "shelter/list",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/refugios/obtener");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.mensaje);
    }
  }
);

const shelterSlice = createSlice({
  name: "shelter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Shelters
    builder.addCase(getShelters.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getShelters.fulfilled, (state, { payload }) => {
      state.shelters = payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getShelters.rejected, (state, { error }) => {
      state.shelters = [];
      state.loading = false;
      state.error = error.message;
    });
  },
});

export default shelterSlice.reducer;
