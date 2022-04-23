import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;
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
