import { createSlice } from "@reduxjs/toolkit";
import { fetchCreateNewUser } from "@/store/slices/auth/singup/thunk/fetchCreateNewUser";
import type { SingUpResponse } from "@/app/authComponents/interfaces/singupInterface";

const initialState: {
  data: SingUpResponse | null;
  loading: boolean;
  error: string | null;
} = {
  data: null,
  loading: false,
  error: null,
};

const createNewUserSlice = createSlice({
  name: "createNewUser",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateNewUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCreateNewUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCreateNewUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default createNewUserSlice.reducer;
