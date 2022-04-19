import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;

const initialState = {
  pets: [],
  loading: false,
  error: null,
};

export const registerPet = createAsyncThunk(
  "pet/register",
  async (pet, { getState, rejectWithValue }) => {
    const {
      owner: { id },
    } = getState().owner;
    const dataToSend = {
      ...pet,
      idDueno: id,
    };
    console.log("dataToSend:", dataToSend);
    try {
      const { data } = await axios.post("/mascotas/registrar", dataToSend);
      console.log("data pet response:", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.mensaje);
    }
  }
);

export const getPetsByOwnerId = createAsyncThunk(
  "pet/data",
  async (_, { getState, rejectWithValue }) => {
    console.log("get pet by owner id");
    const {
      owner: { id },
    } = getState().owner;
    try {
      const { data } = await axios.get("/mascotas/obtener");
      console.log("data pet response:", data);
      return data.find((pet) => pet.idDueno === id);
    } catch (error) {
      return rejectWithValue(error.response.data.mensaje);
    }
  }
);

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
    builder.addCase(registerPet.fulfilled, (state, { payload }) => {
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
