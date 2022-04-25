import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../helpers/axiosConfig";

const initialState = {
  user: JSON.parse(window.localStorage.getItem("user")) || {},
  pets: [],
  shelters: [],
  loading: false,
  error: null,
};

// USER
export const getUserByUsername = createAsyncThunk(
  "user/data",
  async (username, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/usuarios/obtener");
      const user = data.find((user) => user.nombreUsuario === username);
      window.localStorage.setItem("user", JSON.stringify(user));
      return user;
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

// SHELTERS

export const registerShelter = createAsyncThunk(
  "shelter/register",
  async (shelter, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/refugios/registrar", shelter);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.mensaje);
    }
  }
);

export const getSheltersByDNI = createAsyncThunk(
  "shelter/data",
  async (_, { getState, rejectWithValue }) => {
    const {
      user: { dni },
    } = getState().user;
    try {
      const { data } = await axios.post("/refugios/obtener/usuario", {
        data: dni,
      });
      return data;
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

    // Get Shelters By DNI
    builder.addCase(getSheltersByDNI.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getSheltersByDNI.fulfilled, (state, { payload }) => {
      state.shelters = payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getSheltersByDNI.rejected, (state, { error }) => {
      state.shelters = [];
      state.loading = false;
      state.error = error.message;
    });
  },
});

export default userSlice.reducer;
