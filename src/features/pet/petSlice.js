import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;

const initialState = {
  pet: {},
  loading: false,
  error: null,
};

export const registerPet = createAsyncThunk(
  "pet/register",
  async (pet, thunk) => {
    const { getState } = thunk;
    const {
      auth: { token },
    } = getState().auth;
    console.log(pet);
    console.log(token);
    try {
      const { data } = axios.post("/mascotas/registrar", pet, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerPet.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerPet.fulfilled, (state, { payload }) => {
      state.pet = payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(registerPet.rejected, (state, { error }) => {
      state.pet = {};
      state.loading = false;
      state.error = error.message;
    });
  },
});

export default userSlice.reducer;
