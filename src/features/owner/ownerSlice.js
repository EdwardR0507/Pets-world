import { createSlice } from "@reduxjs/toolkit";
import { getOwnerById, registerOwner, verifyOwner } from "./ownerActions";

const initialState = {
  isOwner: false,
  owner: {},
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Check if is Owner
    builder.addCase(verifyOwner.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(verifyOwner.fulfilled, (state, { payload }) => {
      state.isOwner = payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(verifyOwner.rejected, (state, { payload }) => {
      state.isOwner = false;
      state.loading = false;
      state.error = payload;
    });

    // Register Owner
    builder.addCase(registerOwner.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerOwner.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(registerOwner.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // Get Owner by Username
    builder.addCase(getOwnerById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOwnerById.fulfilled, (state, { payload }) => {
      state.owner = payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getOwnerById.rejected, (state, { payload }) => {
      state.owner = {};
      state.loading = false;
      state.error = payload;
    });
  },
});

export default userSlice.reducer;
