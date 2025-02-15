import { createAsyncThunk } from "@reduxjs/toolkit";
import { createNewUser } from "@/app/authComponents/utils/createNewUser";
import type { NewUserInterface } from "@/app/authComponents/interfaces/singupInterface";

export const fetchCreateNewUser = createAsyncThunk<
  NewUserInterface,
  string,
  { rejectValue: string }
>("fetchCreateNewUser/fetchCreateNewUser", async (token, thunkAPI) => {
  try {
    const response = await createNewUser(token);
    if (!response) {
      return thunkAPI.rejectWithValue("Error creando el usuario");
    }
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(
        error.message || "Error creando el usuario"
      );
    }
    return thunkAPI.rejectWithValue("Error desconocido");
  }
});
