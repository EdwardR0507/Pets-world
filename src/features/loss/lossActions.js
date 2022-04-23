import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;

export const registerLoss = createAsyncThunk(
  "loss/register",
  async (newLoss, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/busquedas/registrar", newLoss);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.mensaje);
    }
  }
);

export const getAllLosses = createAsyncThunk(
  "loss/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/busquedas/obtener");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.mensaje);
    }
  }
);
