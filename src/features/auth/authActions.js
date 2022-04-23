import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/nuevo", user);
      return data;
    } catch (error) {
      rejectWithValue(error.response.data.mensaje);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/login", user);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.mensaje);
    }
  }
);
