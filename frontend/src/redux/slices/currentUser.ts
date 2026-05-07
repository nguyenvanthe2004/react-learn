import type { CurrentUserState, IUser } from "../../types/user";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: CurrentUserState = {
  currentUser: {
    id: "",
    userName: "",
    email: "",
    fullName: "",
    phone: "",
    avatar: "",
  },
};

export const currentUserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = {
        id: "",
        userName: "",
        email: "",
        fullName: "",
        phone: "",
        avatar: "",
      };
    },
  },
});

export const { setCurrentUser, logout } = currentUserSlice.actions;
export default currentUserSlice.reducer;
