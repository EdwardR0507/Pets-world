import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;

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
