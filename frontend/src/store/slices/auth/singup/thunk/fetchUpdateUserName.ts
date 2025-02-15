import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserName } from "../../../../../components/navbar/utils/updateUserName";
import { NewUserInterface } from "@/app/authComponents/interfaces/singupInterface";

interface Props {
  token: string;
  userName: string;
  id: number;
}

export const fetchUpdateUserName = createAsyncThunk<
  NewUserInterface,
  Props,
  { rejectValue: string }
>(
  "fetchUpdateUserName/fetchUpdateUserName",
  async ({ token, userName, id }, thunkAPI) => {
    try {
      const response = await updateUserName({ token, id, newName: userName });
      if (!response) {
        return thunkAPI.rejectWithValue("Error actualizando el nombre");
      }
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(
          error.message || "Error actualizando el nombre"
        );
      }
      return thunkAPI.rejectWithValue("Error desconocido");
    }
  }
);
