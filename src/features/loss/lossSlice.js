import { createSlice } from "@reduxjs/toolkit";
import { getAllLosses, registerLoss } from "./lossActions";

const initialState = {
  losses: [],
  loading: false,
  error: null,
};

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
