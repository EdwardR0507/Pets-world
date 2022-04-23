import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;
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
    try {
      const { data } = await axios.post("/mascotas/registrar", dataToSend);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.mensaje);
    }
  }
);

export const getPetsByOwnerId = createAsyncThunk(
  "pet/data",
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
