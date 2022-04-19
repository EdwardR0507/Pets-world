import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import petReducer from "../features/pet/petSlice";
import ownerReducer from "../features/owner/ownerSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    pet: petReducer,
    owner: ownerReducer,
  },
});
