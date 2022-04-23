import { createSlice } from "@reduxjs/toolkit";
import { getSheltersById, registerShelter } from "./shelterActions";

const initialState = {
  shelters: [],
  loading: false,
  error: null,
};

const shelterSlice = createSlice({
  name: "shelter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Register Shelter
    builder.addCase(registerShelter.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerShelter.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(registerShelter.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message;
    });

    // Get Shelters By Id
    builder.addCase(getSheltersById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getSheltersById.fulfilled, (state, { payload }) => {
      state.shelters = payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getSheltersById.rejected, (state, { error }) => {
      state.shelters = [];
      state.loading = false;
      state.error = error.message;
    });
  },
});

export default shelterSlice.reducer;
