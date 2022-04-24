import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../helpers/axiosConfig";

const initialState = {
  shelters: [],
  loading: false,
  error: null,
};

export const registerShelter = createAsyncThunk(
  "shelter/register",
  async (shelter, { getState, rejectWithValue }) => {
    const {
      user: { id },
    } = getState().user;
    const dataToSend = {
      ...shelter,
      idRepresentante: id,
    };
    try {
      const { data } = await axios.post("/refugios/registrar", dataToSend);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.mensaje);
    }
  }
);

export const getSheltersById = createAsyncThunk(
  "shelter/data",
  async (_, { getState, rejectWithValue }) => {
    const {
      user: { id },
    } = getState().user;
    try {
      const { data } = await axios.post("/refugios/obtener/usuario", {
        data: id,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.mensaje);
    }
  }
);

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
