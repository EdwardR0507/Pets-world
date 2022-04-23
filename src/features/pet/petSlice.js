import { createSlice } from "@reduxjs/toolkit";
import { getPetsByOwnerId, registerPet } from "./petActions";

const initialState = {
  pets: [],
  loading: false,
  error: null,
};

const petSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Register Pet
    builder.addCase(registerPet.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerPet.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(registerPet.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message;
    });

    // Get Pets By Owner Id
    builder.addCase(getPetsByOwnerId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPetsByOwnerId.fulfilled, (state, { payload }) => {
      state.pets = payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getPetsByOwnerId.rejected, (state, { error }) => {
      state.pets = [];
      state.loading = false;
      state.error = error.message;
    });
  },
});

export default petSlice.reducer;
