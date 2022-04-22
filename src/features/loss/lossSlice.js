import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;

const initialState = {
  loss: {},
};

export const registerLoss = createAsyncThunk(
  "loss/register",
  async (loss, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/busquedas/registrar", loss);
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
  },
});

export default lossSlice.reducer;
