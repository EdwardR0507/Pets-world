import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../helpers/axiosConfig";

const initialState = {
  losses: [],
  loading: false,
  error: null,
};

export const registerLoss = createAsyncThunk(
  "loss/register",
  async (newLoss, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/busquedas/registrar", newLoss);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.mensaje);
    }
  }
);

export const getAllLosses = createAsyncThunk(
  "loss/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/busquedas/obtener");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.mensaje);
    }
  }
);

const lossSlice = createSlice({
  name: "loss",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Register Lost Pet
    builder.addCase(registerLoss.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerLoss.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(registerLoss.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // Get All Lost Pet
    builder.addCase(getAllLosses.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllLosses.fulfilled, (state, { payload }) => {
      state.losses = payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getAllLosses.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default lossSlice.reducer;
