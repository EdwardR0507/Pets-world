import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import ownerReducer from "../features/owner/ownerSlice";
import lossReducer from "../features/loss/lossSlice";
import shelterReducer from "../features/shelter/shelterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    owner: ownerReducer,
    loss: lossReducer,
    shelter: shelterReducer,
  },
});
