import { createSlice } from "@reduxjs/toolkit";
import { fetchCreateNewUser } from "@/store/slices/auth/singup/thunk/fetchCreateNewUser";
import type { NewUserInterface } from "@/app/authComponents/interfaces/singupInterface";
import { fetchLoginUser } from "./login/thunk/fetchLogin";

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  data: NewUserInterface | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  data: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      //Registro
      .addCase(fetchCreateNewUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCreateNewUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.data = action.payload;
      })
      .addCase(fetchCreateNewUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //Login
      .addCase(fetchLoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.data = action.payload;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
export const { logoutUser } = authSlice.actions;
