import { createSlice } from "@reduxjs/toolkit";
import { fetchLoginUser } from "@/store/slices/auth/login/thunk/fetchLogin";
import type { NewUserInterface } from "@/app/authComponents/interfaces/singupInterface";

const initialState: {
  data: NewUserInterface | null;
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
} = {
  data: null,
  loading: false,
  error: null,
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(fetchLoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isLoggedIn = false;
      });
  },
});

export default loginSlice.reducer;
export const { logout } = loginSlice.actions;
