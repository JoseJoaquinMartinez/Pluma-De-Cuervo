import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOtherWorks } from "@/homepage/other-works/utils/getOtherWorks";
import type { OtherWorkComponentProps } from "@/homepage/other-works/interface/other-works-interface";

export const fetchOtherWorks = createAsyncThunk<
  OtherWorkComponentProps[],
  void,
  { rejectValue: string }
>("otherWorks/fetchOtherWorks", async (_, thunkAPI) => {
  try {
    const otherWorks = await getOtherWorks();
    if (!otherWorks) {
      return thunkAPI.rejectWithValue("Error getting other works");
    }

    return otherWorks;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(
        error.message || "Error obteniendo los otros trabajos"
      );
    }
    return thunkAPI.rejectWithValue("Error desconocido");
  }
});
