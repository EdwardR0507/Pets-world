import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;

export const verifyOwner = createAsyncThunk(
  "owner/isOwner",
  async (username, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/usuarios/isDueño", {
        data: username,
      });
      // Returns the data as string, so I have to parse it to boolean
      return data.data === "true";
    } catch (error) {
      return rejectWithValue(error.response.data.mensaje);
    }
  }
);

export const registerOwner = createAsyncThunk(
  "owner/registerOwner",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/dueños/registrar", user);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.mensaje);
    }
  }
);

export const getOwnerById = createAsyncThunk(
  "owner/data",
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        user: { id },
      } = getState().user;
      const { data } = await axios.get("/dueños/obtener");
      return data.find((owner) => owner.usuario_id === id);
    } catch (error) {
      return rejectWithValue(error.response.data.mensaje);
    }
  }
);
