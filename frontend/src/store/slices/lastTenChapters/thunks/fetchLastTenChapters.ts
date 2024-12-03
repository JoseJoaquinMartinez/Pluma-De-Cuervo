import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLastTenChapters } from "@/app/(un-auth-regular-user)/ultimos-capitulos/utils/getLastTenChapters";
import { LastTenChapterProp } from "@/app/(un-auth-regular-user)/ultimos-capitulos/interface/interface";

export const fetchLastTenChapters = createAsyncThunk<
  LastTenChapterProp[],
  void,
  { rejectValue: string }
>("LastTenChapters/fetchLastTenChapters", async (_, thunkAPI) => {
  try {
    return await getLastTenChapters();
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(
        error.message || "Error obteniendo los últimos capítulos",
      );
    }
    return thunkAPI.rejectWithValue("Error desconocido");
  }
});
