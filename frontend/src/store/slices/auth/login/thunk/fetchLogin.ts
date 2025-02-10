import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "@/app/authComponents/utils/loginUser";
import type { NewUserInterface } from "@/app/authComponents/interfaces/singupInterface";
import type { AuthProps } from "@/app/authComponents/data/singup";

export const fetchLoginUser = createAsyncThunk<
  NewUserInterface,
  AuthProps,
  { rejectValue: string }
>("fetchLoginUser/fetchLoginUser", async ({ email, password }, thunkAPI) => {
  try {
    const response = await loginUser({ email, password });
    if (!response) {
      return thunkAPI.rejectWithValue("Error iniciando sesión");
    }
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(
        error.message || "Error iniciando sesión"
      );
    }
    return thunkAPI.rejectWithValue("Error desconocido");
  }
});
