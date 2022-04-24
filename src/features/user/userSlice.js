import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../helpers/axiosConfig";

const initialState = {
  user: {},
  pets: [],
  loading: false,
  error: null,
};

// USER
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

// PETS
export const registerPet = createAsyncThunk(
  "user/pet/register",
  async (pet, { getState, rejectWithValue }) => {
    const {
      owner: { id },
    } = getState().owner;
    const dataToSend = {
      ...pet,
      idDueno: id,
    };
    try {
      const { data } = await axios.post("/mascotas/registrar", dataToSend);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.mensaje);
    }
  }
);

export const getPetsByOwnerId = createAsyncThunk(
  "user/pets",
  async (_, { getState, rejectWithValue }) => {
    const {
      owner: { id },
    } = getState().owner;
    try {
      const { data } = await axios.get("/mascotas/obtener");
      return data.filter((pet) => pet.idDueno === id);
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

export default userSlice.reducer;
