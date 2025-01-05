import { createSlice } from "@reduxjs/toolkit";
import { fetchLoginUser } from "@/store/slices/auth/login/thunk/fetchLogin";
import type { NewUserInterface } from "@/app/authComponents/interfaces/singupInterface";

const initialState: {
  data: NewUserInterface | null;
  loading: boolean;
  error: string | null;
} = {
  data: null,
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default loginSlice.reducer;
