import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;

const initialState = {
  isOwner: false,
  owner: {},
  loading: false,
  error: null,
};

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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Check if is Owner
    builder.addCase(verifyOwner.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(verifyOwner.fulfilled, (state, { payload }) => {
      state.isOwner = payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(verifyOwner.rejected, (state, { payload }) => {
      state.isOwner = false;
      state.loading = false;
      state.error = payload;
    });

    // Register Owner
    builder.addCase(registerOwner.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerOwner.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(registerOwner.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // Get Owner by Username
    builder.addCase(getOwnerById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOwnerById.fulfilled, (state, { payload }) => {
      state.owner = payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getOwnerById.rejected, (state, { payload }) => {
      state.owner = {};
      state.loading = false;
      state.error = payload;
    });
  },
});

export default userSlice.reducer;
